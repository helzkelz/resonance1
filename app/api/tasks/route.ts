import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, priority, userId } = body;

    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const dbInstance = db();

    // Create task in Firestore
    const taskRef = await addDoc(collection(dbInstance, 'tasks'), {
      title,
      description,
      priority: priority || 'medium',
      status: 'pending',
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Log activity
    await addDoc(collection(dbInstance, 'activityLogs'), {
      userId,
      action: 'Task Created',
      details: `Created task: ${title}`,
      type: 'info',
      timestamp: serverTimestamp(),
    });

    // Create notification
    await addDoc(collection(dbInstance, 'notifications'), {
      userId,
      title: 'New Task Created',
      message: `Task "${title}" has been added to the queue`,
      type: 'success',
      read: false,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      taskId: taskRef.id,
    });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}
