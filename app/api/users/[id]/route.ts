import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { headers } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const headersList = await headers();
    const token = headersList.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    if (decoded.userId !== params.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await User.findById(params.id).select('-password');
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const headersList = await headers();
    const token = headersList.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    if (decoded.userId !== params.id) {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await request.json();
    const allowedFields = ['firstName', 'lastName', 'phone', 'address', 'city', 'country', 'zipCode'];
    const updateData: Record<string, any> = {};

    allowedFields.forEach((field) => {
      if (field in data) {
        updateData[field] = data[field];
      }
    });

    updateData.updatedAt = new Date();

    const user = await User.findByIdAndUpdate(params.id, updateData, { new: true }).select('-password');
    return Response.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const headersList = await headers();
    const token = headersList.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string; role: string };
    
    // Only allow admins to delete users
    const admin = await User.findById(decoded.userId);
    if (admin?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const user = await User.findByIdAndDelete(params.id);
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    return Response.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
