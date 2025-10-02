import { NextRequest, NextResponse } from 'next/server';
import { doc, updateDoc, serverTimestamp, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { defaultAgent } from '@/lib/bot/agent';
import { Task } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId } = body;

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      );
    }

    const dbInstance = db();

    // Get task from Firestore
    const taskDoc = await getDoc(doc(dbInstance, 'tasks', taskId));
    
    if (!taskDoc.exists()) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    const taskData = taskDoc.data();
    const task: Task = {
      id: taskDoc.id,
      ...taskData,
      createdAt: taskData.createdAt?.toDate() || new Date(),
      updatedAt: taskData.updatedAt?.toDate() || new Date(),
    } as Task;

    // Update task status to processing
    await updateDoc(doc(dbInstance, 'tasks', taskId), {
      status: 'processing',
      updatedAt: serverTimestamp(),
    });

    // Log activity
    await addDoc(collection(dbInstance, 'activityLogs'), {
      userId: task.userId,
      action: 'Task Processing Started',
      details: `Processing task: ${task.title}`,
      type: 'info',
      timestamp: serverTimestamp(),
    });

    // Process task with AI agent
    const result = await defaultAgent.processTask(task);

    if (result.success) {
      // Update task with result
      await updateDoc(doc(dbInstance, 'tasks', taskId), {
        status: 'completed',
        result: result.result,
        updatedAt: serverTimestamp(),
      });

      // Log success
      await addDoc(collection(dbInstance, 'activityLogs'), {
        userId: task.userId,
        action: 'Task Completed',
        details: `Successfully completed task: ${task.title}`,
        type: 'success',
        timestamp: serverTimestamp(),
      });

      // Create notification
      await addDoc(collection(dbInstance, 'notifications'), {
        userId: task.userId,
        title: 'Task Completed',
        message: `Task "${task.title}" has been completed successfully`,
        type: 'success',
        read: false,
        createdAt: serverTimestamp(),
      });

      return NextResponse.json({
        success: true,
        result: result.result,
      });
    } else {
      // Update task as failed
      await updateDoc(doc(dbInstance, 'tasks', taskId), {
        status: 'failed',
        result: result.error,
        updatedAt: serverTimestamp(),
      });

      // Log failure
      await addDoc(collection(dbInstance, 'activityLogs'), {
        userId: task.userId,
        action: 'Task Failed',
        details: `Task failed: ${task.title}. Error: ${result.error}`,
        type: 'error',
        timestamp: serverTimestamp(),
      });

      // Create notification
      await addDoc(collection(dbInstance, 'notifications'), {
        userId: task.userId,
        title: 'Task Failed',
        message: `Task "${task.title}" failed to process`,
        type: 'error',
        read: false,
        createdAt: serverTimestamp(),
      });

      return NextResponse.json({
        success: false,
        error: result.error,
      });
    }
  } catch (error: any) {
    console.error('Error processing task:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process task' },
      { status: 500 }
    );
  }
}
