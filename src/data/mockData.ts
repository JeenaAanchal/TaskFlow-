import { UserType, TaskType, ActivityType } from '../types';

export const mockUsers: UserType[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Carol Williams',
    email: 'carol@example.com',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

export const mockTasks: TaskType[] = [
  {
    id: '1',
    title: 'Design Homepage Layout',
    description: 'Create wireframes and mockups for the new homepage design',
    status: 'todo',
    priority: 'high',
    assignedTo: '1',
    createdBy: '1',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up JWT-based authentication system with login/register functionality',
    status: 'in-progress',
    priority: 'high',
    assignedTo: '2',
    createdBy: '1',
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-02')
  },
  {
    id: '3',
    title: 'Write API Documentation',
    description: 'Document all REST API endpoints with examples and response formats',
    status: 'todo',
    priority: 'medium',
    assignedTo: '3',
    createdBy: '2',
    createdAt: new Date('2025-01-03'),
    updatedAt: new Date('2025-01-03')
  },
  {
    id: '4',
    title: 'Set up Database Schema',
    description: 'Design and implement the database schema for users and tasks',
    status: 'done',
    priority: 'high',
    assignedTo: '4',
    createdBy: '1',
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-04')
  },
  {
    id: '5',
    title: 'Create Mobile Responsive Design',
    description: 'Ensure the application works well on mobile devices',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: '1',
    createdBy: '3',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-05')
  },
  {
    id: '6',
    title: 'Implement Real-time Features',
    description: 'Add WebSocket support for real-time updates',
    status: 'todo',
    priority: 'low',
    assignedTo: '2',
    createdBy: '4',
    createdAt: new Date('2025-01-06'),
    updatedAt: new Date('2025-01-06')
  }
];

export const mockActivities: ActivityType[] = [
  {
    id: '1',
    action: 'created',
    taskTitle: 'Design Homepage Layout',
    user: 'Alice Johnson',
    timestamp: new Date(Date.now() - 300000),
    details: 'Created new task with high priority'
  },
  {
    id: '2',
    action: 'updated',
    taskTitle: 'Implement User Authentication',
    user: 'Bob Smith',
    timestamp: new Date(Date.now() - 600000),
    details: 'Changed status to In Progress'
  },
  {
    id: '3',
    action: 'assigned',
    taskTitle: 'Write API Documentation',
    user: 'Carol Williams',
    timestamp: new Date(Date.now() - 900000),
    details: 'Assigned to Carol Williams'
  },
  {
    id: '4',
    action: 'completed',
    taskTitle: 'Set up Database Schema',
    user: 'David Brown',
    timestamp: new Date(Date.now() - 1200000),
    details: 'Marked as completed'
  },
  {
    id: '5',
    action: 'updated',
    taskTitle: 'Create Mobile Responsive Design',
    user: 'Alice Johnson',
    timestamp: new Date(Date.now() - 1800000),
    details: 'Updated description and priority'
  }
];