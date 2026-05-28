import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Logout is handled on client side (remove token from localStorage)
    // This endpoint can be used to invalidate tokens on server side in production

    return NextResponse.json({
      message: 'Logged out successfully',
      success: true,
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
