import React, { useState, useEffect } from 'react';
import { User, Plus, Activity, Users, Brain, AlertTriangle } from 'lucide-react';
import AuthPage from './components/AuthPage';
import KanbanBoard from './components/KanbanBoard';
import ActivityPanel from './components/ActivityPanel';
import ConflictModal from './components/ConflictModal';
import { mockUsers, mockTasks, mockActivities } from './data/mockData';
import { TaskType, UserType, ActivityType, ConflictType } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [tasks, setTasks] = useState<TaskType[]>(mockTasks);
  const [activities, setActivities] = useState<ActivityType[]>(mockActivities);
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [conflict, setConflict] = useState<ConflictType | null>(null);

  // Mock real-time updates
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(() => {
      // Simulate random task updates from other users
      if (Math.random() < 0.1) {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        const randomUser = users.find(u => u.id !== currentUser.id);
        
        if (randomTask && randomUser) {
          const newActivity: ActivityType = {
            id: Date.now().toString(),
            action: 'updated',
            taskTitle: randomTask.title,
            user: randomUser.name,
            timestamp: new Date(),
            details: 'Changed task priority'
          };
          setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentUser, tasks, users]);

  const handleLogin = (email: string, password: string) => {
    const user = users.find(u => u.email === email);
    if (user && password === 'password') {
      setCurrentUser(user);
      const loginActivity: ActivityType = {
        id: Date.now().toString(),
        action: 'login',
        taskTitle: '',
        user: user.name,
        timestamp: new Date(),
        details: 'Joined the board'
      };
      setActivities(prev => [loginActivity, ...prev.slice(0, 19)]);
    }
  };

  const handleRegister = (name: string, email: string, password: string) => {
    const newUser: UserType = {
      id: Date.now().toString(),
      name,
      email,
      avatar: `https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400`
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    if (currentUser) {
      const logoutActivity: ActivityType = {
        id: Date.now().toString(),
        action: 'logout',
        taskTitle: '',
        user: currentUser.name,
        timestamp: new Date(),
        details: 'Left the board'
      };
      setActivities(prev => [logoutActivity, ...prev.slice(0, 19)]);
    }
    setCurrentUser(null);
  };

  const addActivity = (activity: Omit<ActivityType, 'id' | 'timestamp'>) => {
    const newActivity: ActivityType = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
  };

  const handleTaskUpdate = (updatedTask: TaskType) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskAdd = (newTask: TaskType) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskDelete = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleConflictResolve = (resolution: 'merge' | 'overwrite', finalTask: TaskType) => {
    if (resolution === 'overwrite') {
      setTasks(prev => prev.map(task => 
        task.id === finalTask.id ? finalTask : task
      ));
    } else {
      // Merge logic - combine descriptions, use latest other fields
      const existingTask = tasks.find(t => t.id === finalTask.id);
      if (existingTask) {
        const mergedTask: TaskType = {
          ...finalTask,
          description: `${existingTask.description}\n\n${finalTask.description}`
        };
        setTasks(prev => prev.map(task => 
          task.id === finalTask.id ? mergedTask : task
        ));
      }
    }
    setConflict(null);
  };

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="flex flex-between items-center py-4">
            <div className="flex items-center space-x-4 animate-slide-in-left">
              <div className="logo-container p-3 rounded-xl">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TaskFlow Pro</h1>
                <p className="text-sm text-gray-600">Collaborative Task Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 animate-slide-in">
              <button
                onClick={() => setShowActivityPanel(!showActivityPanel)}
                className="relative btn-icon animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                <Activity className="w-5 h-5" />
                <span className="notification-badge">
                  {activities.length > 99 ? '99+' : activities.length}
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="avatar animate-float"
                  style={{ animationDelay: '1s' }}
                />
                <div className="hidden-mobile">
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-600">{currentUser.email}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="secondary-button animate-fade-in"
                style={{ animationDelay: '1.5s' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex space-x-8">
          {/* Kanban Board */}
          <div className="flex-1 animate-fade-in">
            <KanbanBoard
              tasks={tasks}
              users={users}
              currentUser={currentUser}
              onTaskUpdate={handleTaskUpdate}
              onTaskAdd={handleTaskAdd}
              onTaskDelete={handleTaskDelete}
              onActivity={addActivity}
              onConflict={setConflict}
            />
          </div>

          {/* Activity Panel */}
          {showActivityPanel && (
            <div className="w-80 flex-shrink-0 animate-slide-in">
              <ActivityPanel
                activities={activities}
                onClose={() => setShowActivityPanel(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Conflict Resolution Modal */}
      {conflict && (
        <ConflictModal
          conflict={conflict}
          onResolve={handleConflictResolve}
          onClose={() => setConflict(null)}
        />
      )}
    </div>
  );
}

export default App;