import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const { data: users } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1);

    const userId = users?.[0]?.id;

    if (userId) {
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 3);

      await supabase.from('subscriptions').upsert({
        user_id: userId,
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