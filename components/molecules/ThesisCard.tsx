import React from 'react';
import { Thesis, ThesisStatus, ThesisType, UserRole } from '../../types';
import { Heart } from 'lucide-react';
import { Badge } from '../atoms/Badge';

interface ThesisCardProps {
  thesis: Thesis;
  userRole: UserRole;
  userId: string;
  onApply: (id: string) => void;
}

export const ThesisCard: React.FC<ThesisCardProps> = ({ thesis, userRole, userId, onApply }) => {
  const isApplied = thesis.applicants?.includes(userId);

  return (
    <div className="thesis-card">
      <div className="thesis-card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <Badge variant={thesis.type === ThesisType.LICENSE ? 'success' : 'purple'}>
            {thesis.type}
          </Badge>
          {thesis.status === ThesisStatus.TAKEN && (
            <Badge variant="error" className="ml-2">OCUPAT</Badge>
          )}
        </div>

        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{thesis.title}</h3>
        <p style={{ marginBottom: '1rem', height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {thesis.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {thesis.tags.map(tag => (
            <span key={tag} className="tag-chip">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="thesis-card-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '2rem', height: '2rem', borderRadius: '50%', background: '#e0f2fe',
            color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
          }}>
            {thesis.professorName.charAt(0)}
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{thesis.professorName}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Profesor</p>
          </div>
        </div>

        {userRole === UserRole.STUDENT && thesis.status === ThesisStatus.AVAILABLE && (
          !isApplied ? (
            <button
              onClick={() => onApply(thesis.id)}
              style={{
                padding: '0.5rem', borderRadius: '50%', border: '1px solid #e2e8f0',
                transition: 'all 0.2s', color: '#64748b'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.borderColor = '#fee2e2';
                e.currentTarget.style.background = '#fef2f2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#64748b';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = 'transparent';
              }}
              title="Sunt interesat / Aplică"
            >
              <Heart size={20} />
            </button>
          ) : (
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>Aplicat</span>
          )
        )}
      </div>
    </div>
  );
};