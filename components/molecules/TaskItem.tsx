import React from 'react';
import { Task } from '../../types';
import { CheckCircle, Clock } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle }) => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', padding: '1rem',
      background: '#f8fafc', borderRadius: '0.5rem',
      border: '1px solid #e2e8f0', marginBottom: '0.75rem'
    }}>
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: '1.5rem', height: '1.5rem', borderRadius: '50%',
          border: task.completed ? 'none' : '2px solid #cbd5e1',
          background: task.completed ? '#22c55e' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: '1rem', cursor: 'pointer', transition: 'all 0.2s'
        }}
      >
        {task.completed && <CheckCircle size={16} color="white" />}
      </button>
      <div style={{ flex: 1 }}>
        <p style={{
          fontWeight: 500,
          color: task.completed ? '#94a3b8' : '#1e293b',
          textDecoration: task.completed ? 'line-through' : 'none',
          marginBottom: '0.25rem'
        }}>
          {task.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b' }}>
          <Clock size={12} />
          <span>Deadline: {task.deadline}</span>
        </div>
      </div>
    </div>
  );
};