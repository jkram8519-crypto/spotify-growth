import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ response: 'Cle API manquante dans les variables Vercel.' }, { status: 500 });
    }
    const client = new Anthropic({ apiKey });
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Tu es un expert en music marketing specialise dans la croissance sur Spotify. Reponds en francais de facon concrete. Maximum 300 mots. Question : ${question}`
        }
      ]
    });
    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ response });
  } catch (error: any) {
    return NextResponse.json({ response: 'Erreur : ' + error.message }, { status: 500 });
  }
}
