import React from 'react';
import { UserRole } from '../types';
import { Briefcase } from 'lucide-react';
import { Button } from '../components/atoms/Button';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => (
  <div className="login-page">
    <div className="login-card">
      <div className="login-icon-circle">
        <Briefcase size={32} />
      </div>
      <h1 style={{ marginBottom: '0.5rem' }}>MyThesis</h1>
      <p style={{ marginBottom: '2rem' }}>Platforma premium de management al lucrărilor de licență și disertație.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button
          fullWidth
          variant="primary"
          onClick={() => onLogin(UserRole.STUDENT)}
        >
          Autentificare Student (@e-uvt.ro)
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => onLogin(UserRole.TEACHER)}
        >
          Autentificare Profesor
        </Button>
      </div>
      <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
        Acces securizat prin Single Sign-On instituțional.
      </p>
    </div>
  </div>
);