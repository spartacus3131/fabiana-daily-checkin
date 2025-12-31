import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const anthropic = new Anthropic({ apiKey });

    const { messages, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    // If no messages yet, add a starter message to kick off the conversation
    const apiMessages = messages.length === 0
      ? [{ role: 'user' as const, content: 'Hello, I\'m ready to begin.' }]
      : messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages: apiMessages,
    });

    const textContent = response.content.find(c => c.type === 'text');
    const text = textContent && 'text' in textContent ? textContent.text : '';

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to get response: ${errorMessage}` },
      { status: 500 }
    );
  }
}
