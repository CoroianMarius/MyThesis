import React from 'react';
import { User } from '../../types';
import { Sidebar } from '../organisms/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children, user, onLogout, currentPage, onNavigate
}) => {
  if (!user) return null;

  return (
    <div className="layout-container">
      <Sidebar
        user={user}
        onLogout={onLogout}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};