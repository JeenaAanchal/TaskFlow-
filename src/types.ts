export interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityType {
  id: string;
  action: string;
  taskTitle: string;
  user: string;
  timestamp: Date;
  details: string;
}

export interface ConflictType {
  taskId: string;
  version1: TaskType;
  version2: TaskType;
  user1: string;
  user2: string;
}