import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
export async function POST(req: NextRequest) {
  try {
    const { userId, toolName } = await req.json();
    if (!userId || !toolName) {
      return NextResponse.json({ error: 'userId et toolName requis' }, { status: 400 });
    }
    await supabase.from('tool_usage').insert({ user_id: userId, tool_name: toolName });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
