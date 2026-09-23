import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const { data: userData } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const user = userData.users.find(u => u.email === email);
    // Garde-fous : cette route n'est pas authentifiée (appelée juste après l'inscription).
    // 1. Compte créé il y a moins de 15 minutes uniquement.
    // 2. Jamais d'écrasement d'un abonnement existant (payant, essai en cours ou déjà consommé).
    const isNewAccount = user && Date.now() - new Date(user.created_at).getTime() < 15 * 60 * 1000;
    const { data: existing } = user
      ? await supabase.from('subscriptions').select('user_id').eq('user_id', user.id).maybeSingle()
      : { data: null };
    if (user && isNewAccount && !existing) {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 3);
      await supabase.from('subscriptions').insert({
        user_id: user.id,
        status: 'trial',
        stripe_id: 'trial_3days',
        plan: 'Pro',
        trial_end: trialEnd.toISOString(),
        created_at: new Date().toISOString(),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}