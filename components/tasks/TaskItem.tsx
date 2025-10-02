'use client';

import { Task } from '@/types';
import { format } from 'date-fns';
import ProcessTaskButton from './ProcessTaskButton';

interface TaskItemProps {
  task: Task;
}

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  failed: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const priorityColors = {
  low: 'text-gray-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
};

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-white">{task.title}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-3">{task.description}</p>
          {task.result && (
            <div className="mt-3 p-3 bg-gray-900 rounded border border-gray-700">
              <p className="text-sm text-gray-300 whitespace-pre-wrap">{task.result}</p>
            </div>
          )}
          <ProcessTaskButton taskId={task.id} status={task.status} />
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <span>Created: {format(task.createdAt, 'MMM d, yyyy HH:mm')}</span>
        <span>Updated: {format(task.updatedAt, 'MMM d, yyyy HH:mm')}</span>
      </div>
    </div>
  );
}
