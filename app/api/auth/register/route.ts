import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  console.log('[auth/register] POST handler invoked');
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, role: requestedRole } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    // ── Determine role ──────────────────────────────────────────
    let role = 'customer';

    if (requestedRole === 'manager') {
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        const tokenStr = authHeader.replace('Bearer ', '');
        try {
          const decoded = jwt.verify(
            tokenStr,
            process.env.JWT_SECRET || 'secret'
          ) as any;

          if (decoded.role === 'admin') {
            role = 'manager';
            console.log('[auth/register] ✅ Manager role granted');
          }
        } catch (err: any) {
          console.error('[auth/register] JWT verify failed:', err.message);
        }
      }
    }
    // ───────────────────────────────────────────────────────────

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // ✅ Sirf ek baar hash — User model pre-save hook nahi hai ab
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

    await newUser.save();
    console.log('[auth/register] ✅ Saved to DB:', email, 'role:', role);

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
      token,
      message: 'Registration successful.',
    });

  } catch (error) {
    console.error('[auth/register] Fatal error:', error);
    return NextResponse.json(
      { error: 'Registration failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}