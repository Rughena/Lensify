import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    // Build messages array with history
    const messages = [
      {
        role: 'system',
        content: `You are Lensify's friendly AI assistant. Lensify is a premium Pakistani eyewear e-commerce store based in Lahore, Pakistan.

Your job is to help customers with:
- Product recommendations (glasses, frames, sunglasses)
- Frame shapes: oval, round, square, rectangle, cat-eye, hexagon
- Categories: Men's, Women's, Unisex
- Price range: Rs 5,000 to Rs 15,000 PKR
- Brands: Lensify Pro, Lensify Luxe, Lensify Classic, Lensify Executive, Lensify Vintage, Lensify Sport
- Virtual Try-On feature (available on the website)
- Shipping info: 3-5 business days within Pakistan
- Returns: 30-day return policy
- Payment methods: JazzCash, EasyPaisa, Credit/Debit Card
- Order tracking: customers can track using their LNF order number

Face shape recommendations:
- Round face: rectangular or square frames
- Square face: round or oval frames
- Oval face: any shape works
- Heart face: bottom-heavy frames, round or oval
- Oblong face: oversized or wide frames

Keep responses friendly, concise and helpful. Always respond in English. If asked about something unrelated to eyewear or Lensify, politely redirect to eyewear topics.`
      },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ];

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Ollama');
    }

    const data = await response.json();
    const aiMessage = data.message?.content || "I'm sorry, I couldn't process that. Please try again!";

    return NextResponse.json({
      message: aiMessage,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({
      message: "I'm having trouble connecting right now. Please make sure Ollama is running and try again!",
      timestamp: new Date().toISOString(),
    });
  }
}