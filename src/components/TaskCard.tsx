import React from 'react';
import { User, Calendar, Flag, Brain, Edit3, Trash2, Clock } from 'lucide-react';
import { TaskType, UserType } from '../types';

interface TaskCardProps {
  task: TaskType;
  users: UserType[];
  onDragStart: (e: React.DragEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSmartAssign: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  users,
  onDragStart,
  onEdit,
  onDelete,
  onSmartAssign
}) => {
  const assignedUser = users.find(u => u.id === task.assignedTo);
  const createdUser = users.find(u => u.id === task.createdBy);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className={`task-card priority-${task.priority} group cursor-move`}
    >
      {/* Header */}
      <div className="flex flex-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className={`priority-badge priority-${task.priority}`}>
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </span>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover-opacity-100 transition-opacity">
          <button
            onClick={onSmartAssign}
            className="btn-icon text-blue-600"
            title="Smart Assign"
          >
            <Brain className="w-4 h-4" />
          </button>
          <button
            onClick={onEdit}
            className="btn-icon"
            title="Edit Task"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="btn-icon text-red-600"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-lg">
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Assignee */}
      {assignedUser && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <img
            src={assignedUser.avatar}
            alt={assignedUser.name}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{assignedUser.name}</p>
            <p className="text-xs text-gray-500">Assigned</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex flex-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(task.createdAt)}</span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{formatTimeAgo(task.updatedAt)}</span>
        </div>
      </div>

      {/* Created by */}
      {createdUser && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <img
              src={createdUser.avatar}
              alt={createdUser.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-gray-400">
              Created by {createdUser.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;