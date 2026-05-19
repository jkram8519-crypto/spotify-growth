import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Tu es un expert en music marketing et manager musical specialise dans la croissance sur Spotify pour artistes independants. Reponds en francais de facon concrete, actionnable et professionnelle. Maximum 300 mots. Question : ${question}`
        }
      ]
    });
    const response = message.content[0].type === 'text' ? message.content[0].text : '';
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ response: 'Erreur API — verifie ta cle Anthropic dans Vercel.' }, { status: 500 });
  }
}
