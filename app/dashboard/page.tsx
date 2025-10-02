'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import CreateTaskForm from '@/components/tasks/CreateTaskForm';
import TaskQueue from '@/components/tasks/TaskQueue';
import ActivityLogComponent from '@/components/dashboard/ActivityLog';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Task Creation and Queue */}
          <div className="lg:col-span-2 space-y-6">
            <CreateTaskForm />
            <TaskQueue />
          </div>
          
          {/* Right column - Activity Log */}
          <div className="lg:col-span-1">
            <ActivityLogComponent />
          </div>
        </div>
      </main>
    </div>
  );
}
