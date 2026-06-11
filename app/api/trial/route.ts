// Donner 3 jours Pro gratuits
const trialEnd = new Date();
trialEnd.setDate(trialEnd.getDate() + 3);

const userEmail = email;
await fetch('/api/trial', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: userEmail })
});

window.location.href = '/dashboard';

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const { data: authUser } = await supabase.auth.admin.getUserByEmail(email);

    if (authUser?.user?.id) {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 3);

      await supabase.from('subscriptions').upsert({
        user_id: authUser.user.id,
        status: 'trial',
        stripe_id: 'trial_3days',
        plan: 'Pro',
        trial_end: trialEnd.toISOString(),
        created_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}