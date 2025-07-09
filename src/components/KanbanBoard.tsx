import React, { useState } from 'react';
import { Plus, Brain, Users, Zap, Target, CheckCircle } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { TaskType, UserType, ActivityType, ConflictType } from '../types';

interface KanbanBoardProps {
  tasks: TaskType[];
  users: UserType[];
  currentUser: UserType;
  onTaskUpdate: (task: TaskType) => void;
  onTaskAdd: (task: TaskType) => void;
  onTaskDelete: (taskId: string) => void;
  onActivity: (activity: Omit<ActivityType, 'id' | 'timestamp'>) => void;
  onConflict: (conflict: ConflictType) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  users,
  currentUser,
  onTaskUpdate,
  onTaskAdd,
  onTaskDelete,
  onActivity,
  onConflict
}) => {
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const columns = [
    { 
      id: 'todo', 
      title: 'To Do', 
      color: '#3182ce',
      icon: Target,
      description: 'Tasks ready to start'
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      color: '#d69e2e',
      icon: Zap,
      description: 'Currently working on'
    },
    { 
      id: 'done', 
      title: 'Done', 
      color: '#38a169',
      icon: CheckCircle,
      description: 'Completed tasks'
    }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, task: TaskType) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask.status !== newStatus) {
      const updatedTask = { ...draggedTask, status: newStatus as 'todo' | 'in-progress' | 'done', updatedAt: new Date() };
      onTaskUpdate(updatedTask);
      
      onActivity({
        action: 'moved',
        taskTitle: draggedTask.title,
        user: currentUser.name,
        details: `Moved from ${draggedTask.status} to ${newStatus}`
      });
    }
    setDraggedTask(null);
  };

  const handleTaskCreate = (taskData: Omit<TaskType, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Validate unique title
    if (tasks.some(task => task.title.toLowerCase() === taskData.title.toLowerCase())) {
      alert('Task title must be unique');
      return;
    }

    // Validate title doesn't match column names
    if (columns.some(col => col.title.toLowerCase() === taskData.title.toLowerCase())) {
      alert('Task title cannot match column names');
      return;
    }

    const newTask: TaskType = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onTaskAdd(newTask);
    onActivity({
      action: 'created',
      taskTitle: newTask.title,
      user: currentUser.name,
      details: `Created new task with ${newTask.priority} priority`
    });
  };

  const handleTaskEdit = (taskData: Partial<TaskType>) => {
    if (!editingTask) return;

    // Simulate conflict detection (random chance for demo)
    if (Math.random() < 0.3) {
      const conflictingTask = { ...editingTask, title: 'Conflicting Version', updatedAt: new Date() };
      onConflict({
        taskId: editingTask.id,
        version1: editingTask,
        version2: conflictingTask,
        user1: currentUser.name,
        user2: users.find(u => u.id !== currentUser.id)?.name || 'Unknown'
      });
      return;
    }

    const updatedTask = { ...editingTask, ...taskData, updatedAt: new Date() };
    onTaskUpdate(updatedTask);
    
    onActivity({
      action: 'updated',
      taskTitle: updatedTask.title,
      user: currentUser.name,
      details: 'Updated task details'
    });
  };

  const handleSmartAssign = (task: TaskType) => {
    // Smart assign logic - assign to user with fewest active tasks
    const userTaskCounts = users.map(user => ({
      user,
      taskCount: tasks.filter(t => t.assignedTo === user.id && t.status !== 'done').length
    }));

    const userWithFewestTasks = userTaskCounts.reduce((prev, current) => 
      prev.taskCount <= current.taskCount ? prev : current
    );

    const updatedTask = { ...task, assignedTo: userWithFewestTasks.user.id, updatedAt: new Date() };
    onTaskUpdate(updatedTask);
    
    onActivity({
      action: 'assigned',
      taskTitle: task.title,
      user: currentUser.name,
      details: `Smart assigned to ${userWithFewestTasks.user.name}`
    });
  };

  const handleTaskDelete = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      onTaskDelete(taskId);
      onActivity({
        action: 'deleted',
        taskTitle: task.title,
        user: currentUser.name,
        details: 'Deleted task'
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-between items-center animate-fade-in">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Project Board</h2>
          <p className="text-gray-600 text-lg">
            Drag and drop tasks between columns to update their status
          </p>
        </div>
        <button
          onClick={() => setShowTaskModal(true)}
          className="primary-button flex items-center space-x-3 animate-bounce"
          style={{ animationDelay: '0.5s' }}
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Create Task</span>
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {columns.map((column, index) => {
          const Icon = column.icon;
          const columnTasks = getTasksByStatus(column.id);
          
          return (
            <div
              key={column.id}
              className={`kanban-column ${dragOverColumn === column.id ? 'drag-over' : ''} animate-fade-in`}
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className="column-header">
                <div className="flex flex-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="column-indicator" 
                      style={{ backgroundColor: column.color }}
                    />
                    <Icon className="w-5 h-5" style={{ color: column.color }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{column.title}</h3>
                      <p className="text-xs text-gray-600">{column.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300"
                    >
                      {columnTasks.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                {columnTasks.map((task, taskIndex) => (
                  <div
                    key={task.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.7 + taskIndex * 0.1}s` }}
                  >
                    <TaskCard
                      task={task}
                      users={users}
                      onDragStart={(e) => handleDragStart(e, task)}
                      onEdit={() => {
                        setEditingTask(task);
                        setShowTaskModal(true);
                      }}
                      onDelete={() => handleTaskDelete(task.id)}
                      onSmartAssign={() => handleSmartAssign(task)}
                    />
                  </div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-12">
                    <Icon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500 text-sm">No tasks yet</p>
                    <p className="text-gray-400 text-xs">Drag tasks here or create new ones</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <TaskModal
          task={editingTask}
          users={users}
          currentUser={currentUser}
          onSave={editingTask ? handleTaskEdit : handleTaskCreate}
          onClose={() => {
            setShowTaskModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default KanbanBoard;