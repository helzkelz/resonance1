'use client';

import { useAuth } from '@/lib/contexts/AuthContext';
import { logOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import NotificationCenter from '@/components/notifications/NotificationCenter';

export default function DashboardHeader() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await logOut();
    if (error) {
      toast.error(error);
    } else {
      toast.success('Logged out successfully');
      router.push('/auth/login');
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white">
              🤖 Autonomous AI Dashboard
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <NotificationCenter />
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
