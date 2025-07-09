import React, { useState } from 'react';
import { X, AlertTriangle, Users, Calendar } from 'lucide-react';
import { ConflictType, TaskType } from '../types';

interface ConflictModalProps {
  conflict: ConflictType;
  onResolve: (resolution: 'merge' | 'overwrite', finalTask: TaskType) => void;
  onClose: () => void;
}

const ConflictModal: React.FC<ConflictModalProps> = ({ conflict, onResolve, onClose }) => {
  const [selectedVersion, setSelectedVersion] = useState<'version1' | 'version2' | null>(null);
  const [resolution, setResolution] = useState<'merge' | 'overwrite' | null>(null);

  const handleResolve = () => {
    if (!resolution) return;
    
    const finalTask = selectedVersion === 'version1' ? conflict.version1 : conflict.version2;
    onResolve(resolution, finalTask);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        {/* Header */}
        <div className="flex flex-between items-center p-6 border-b border-gray-200 bg-red-50">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-2 rounded-lg border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Conflict Detected</h2>
              <p className="text-sm text-gray-600">
                Two users edited the same task simultaneously
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-icon"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conflict Details */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Choose a version to keep:</h3>
            <p className="text-sm text-gray-600">
              {conflict.user1} and {conflict.user2} edited "{conflict.version1.title}" at the same time.
            </p>
          </div>

          {/* Version Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '24px', marginBottom: '24px' }}>
            {/* Version 1 */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedVersion === 'version1'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover-bg-gray-50'
              }`}
              onClick={() => setSelectedVersion('version1')}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">{conflict.user1}'s Version</h4>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title:</label>
                  <p className="text-sm text-gray-900">{conflict.version1.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description:</label>
                  <p className="text-sm text-gray-900">{conflict.version1.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority:</label>
                  <span className={`priority-badge priority-${conflict.version1.priority}`}>
                    {conflict.version1.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(conflict.version1.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Version 2 */}
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedVersion === 'version2'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover-bg-gray-50'
              }`}
              onClick={() => setSelectedVersion('version2')}
            >
              <div className="flex items-center space-x-2 mb-3">
                <Users className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-gray-900">{conflict.user2}'s Version</h4>
              </div>
              
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">Title:</label>
                  <p className="text-sm text-gray-900">{conflict.version2.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Description:</label>
                  <p className="text-sm text-gray-900">{conflict.version2.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Priority:</label>
                  <span className={`priority-badge priority-${conflict.version2.priority}`}>
                    {conflict.version2.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(conflict.version2.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resolution Options */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Resolution Strategy:</h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover-bg-gray-50">
                <input
                  type="radio"
                  name="resolution"
                  value="overwrite"
                  checked={resolution === 'overwrite'}
                  onChange={() => setResolution('overwrite')}
                  className="text-blue-600"
                />
                <div>
                  <span className="font-medium">Overwrite</span>
                  <p className="text-sm text-gray-600">Keep only the selected version</p>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover-bg-gray-50">
                <input
                  type="radio"
                  name="resolution"
                  value="merge"
                  checked={resolution === 'merge'}
                  onChange={() => setResolution('merge')}
                  className="text-blue-600"
                />
                <div>
                  <span className="font-medium">Merge</span>
                  <p className="text-sm text-gray-600">Combine descriptions from both versions</p>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 btn"
            >
              Cancel
            </button>
            <button
              onClick={handleResolve}
              disabled={!selectedVersion || !resolution}
              className="primary-button flex-1 disabled-opacity-50 disabled-cursor-not-allowed"
            >
              Resolve Conflict
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConflictModal;