'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Notification } from '@/types';
import { format } from 'date-fns';

const typeColors = {
  info: 'bg-blue-500/20 border-blue-500/30 text-blue-400',
  success: 'bg-green-500/20 border-green-500/30 text-green-400',
  warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  error: 'bg-red-500/20 border-red-500/30 text-red-400',
};

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const dbInstance = db();
    const q = query(
      collection(dbInstance, 'notifications'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        } as Notification;
      });
      setNotifications(notificationsData);
    });

    return () => unsubscribe();
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (notificationId: string) => {
    try {
      const dbInstance = db();
      await updateDoc(doc(dbInstance, 'notifications', notificationId), {
        read: true,
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-20 max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications yet
              </div>
            ) : (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-gray-750' : ''
                    }`}
                  >
                    <div className={`inline-block px-2 py-1 text-xs font-medium rounded border mb-2 ${typeColors[notification.type]}`}>
                      {notification.type}
                    </div>
                    <p className="text-sm font-medium text-white">{notification.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {format(notification.createdAt, 'MMM d, HH:mm')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
