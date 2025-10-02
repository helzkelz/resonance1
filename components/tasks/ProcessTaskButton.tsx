'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProcessTaskButtonProps {
  taskId: string;
  status: string;
}

export default function ProcessTaskButton({ taskId, status }: ProcessTaskButtonProps) {
  const [processing, setProcessing] = useState(false);

  const handleProcess = async () => {
    if (status !== 'pending') {
      toast.error('Only pending tasks can be processed');
      return;
    }

    setProcessing(true);
    const loadingToast = toast.loading('Processing task with AI...');

    try {
      const response = await fetch('/api/tasks/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Task processed successfully!', { id: loadingToast });
      } else {
        toast.error(data.error || 'Failed to process task', { id: loadingToast });
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to process task', { id: loadingToast });
    } finally {
      setProcessing(false);
    }
  };

  if (status !== 'pending') {
    return null;
  }

  return (
    <button
      onClick={handleProcess}
      disabled={processing}
      className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {processing ? 'Processing...' : '🤖 Process with AI'}
    </button>
  );
}
