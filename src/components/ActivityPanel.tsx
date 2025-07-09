import React from 'react';
import { X, Activity, Clock, User } from 'lucide-react';
import { ActivityType } from '../types';

interface ActivityPanelProps {
  activities: ActivityType[];
  onClose: () => void;
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ activities, onClose }) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'created': return '✨';
      case 'updated': return '📝';
      case 'moved': return '🔄';
      case 'assigned': return '👤';
      case 'completed': return '✅';
      case 'deleted': return '🗑️';
      case 'login': return '🔑';
      case 'logout': return '👋';
      default: return '📋';
    }
  };

  const getActivityColor = (action: string) => {
    switch (action) {
      case 'created': return 'bg-green-100 text-green-800 border-green-200';
      case 'updated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'moved': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'assigned': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'deleted': return 'bg-red-100 text-red-800 border-red-200';
      case 'login': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'logout': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="card rounded-xl shadow-lg h-full">
      {/* Header */}
      <div className="flex flex-between items-center p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Activity Feed</h3>
        </div>
        <button
          onClick={onClose}
          className="btn-icon"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Activities */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No activities yet</p>
            <p className="text-sm">Activities will appear here as you work</p>
          </div>
        ) : (
          activities.map(activity => (
            <div
              key={activity.id}
              className="activity-item"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-lg">{getActivityIcon(activity.action)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">{activity.user}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getActivityColor(activity.action)}`}>
                      {activity.action}
                    </span>
                  </div>
                  {activity.taskTitle && (
                    <p className="text-sm text-gray-700 font-medium mb-1">{activity.taskTitle}</p>
                  )}
                  <p className="text-xs text-gray-500 mb-1">{activity.details}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex flex-between text-sm text-gray-500">
          <span>Last 20 activities</span>
          <div className="flex items-center space-x-1">
            <div className="status-indicator" />
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPanel;