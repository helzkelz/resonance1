'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/contexts/AuthContext';
import { ActivityLog } from '@/types';
import { format } from 'date-fns';

const typeColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

const typeIcons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

export default function ActivityLogComponent() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const dbInstance = db();
    const q = query(
      collection(dbInstance, 'activityLogs'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activitiesData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate() || new Date(),
        } as ActivityLog;
      });
      setActivities(activitiesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-bold text-white mb-4">Activity Log</h2>
      
      {activities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No activity yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-900 rounded border border-gray-700">
              <span className="text-xl">{typeIcons[activity.type]}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${typeColors[activity.type]}`}>
                  {activity.action}
                </p>
                <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {format(activity.timestamp, 'MMM d, yyyy HH:mm:ss')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
