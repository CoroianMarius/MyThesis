import React, { useState } from 'react';
import { Task, UserRole } from '../../types';
import { CheckCircle, Clock, Award } from 'lucide-react';
import { Button } from '../atoms/Button';

interface TaskItemProps {
  task: Task;
  userRole?: UserRole;
  onToggle: (id: string) => void;
  onGrade?: (id: string, grade: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, userRole, onToggle, onGrade }) => {
  const [gradeInput, setGradeInput] = useState<string>('');

  const handleGradeSubmit = () => {
    const g = parseFloat(gradeInput);
    if (!isNaN(g) && g >= 1 && g <= 10 && onGrade) {
      onGrade(task.id, g);
      setGradeInput('');
    } else {
      alert("Introduceți o notă validă (1-10).");
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', padding: '1rem',
      background: '#f8fafc', borderRadius: '0.5rem',
      border: '1px solid #e2e8f0', marginBottom: '0.75rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <button
          onClick={() => onToggle(task.id)}
          disabled={userRole === UserRole.TEACHER} // Teachers can't toggle completion, only grade
          title={userRole === UserRole.TEACHER ? "Doar studentul poate marca finalizarea" : "Marchează ca finalizat"}
          style={{
            width: '1.5rem', height: '1.5rem', borderRadius: '50%',
            border: task.completed ? 'none' : '2px solid #cbd5e1',
            background: task.completed ? '#22c55e' : 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginRight: '1rem', cursor: userRole === UserRole.TEACHER ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            opacity: userRole === UserRole.TEACHER && !task.completed ? 0.5 : 1
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

        {/* Display Grade if exists */}
        {task.grade && (
          <div className="flex-center" style={{
            background: '#fef3c7', padding: '0.25rem 0.75rem', borderRadius: '1rem',
            color: '#b45309', fontWeight: 'bold', fontSize: '0.875rem', gap: '0.25rem'
          }}>
            <Award size={14} />
            <span>Nota: {task.grade}</span>
          </div>
        )}
      </div>

      {/* Grading Input for Teacher */}
      {userRole === UserRole.TEACHER && task.completed && !task.grade && (
        <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f0f9ff', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.875rem', color: '#0369a1', fontWeight: 500 }}>Acordă notă:</span>
          <input
            type="number"
            min="1" max="10"
            step="0.1"
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            className="input-field"
            style={{ width: '80px', padding: '0.25rem 0.5rem' }}
            placeholder="1-10"
          />
          <Button variant="primary" onClick={handleGradeSubmit} style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>Salvează</Button>
        </div>
      )}
    </div>
  );
};