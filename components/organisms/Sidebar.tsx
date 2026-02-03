import React from 'react';
import { User, UserRole } from '../../types';
import { LogOut, LayoutDashboard, UserCircle, Search, Users } from 'lucide-react';
import { Avatar } from '../atoms/Avatar';

interface SidebarProps {
  user: User;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, currentPage, onNavigate }) => {
  const navItems = [
    { id: 'marketplace', label: 'Marketplace Teme', icon: Search },
    // Conditionally add Management for Teachers
    ...(user.role === UserRole.TEACHER ? [{ id: 'management', label: 'Management Teme', icon: Users }] : []),
    { id: 'dashboard', label: 'Dashboard Lucrare', icon: LayoutDashboard },
    { id: 'profile', label: 'Profilul Meu', icon: UserCircle },
  ];

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <div style={{ width: '2rem', height: '2rem', background: '#3b82f6', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>U</div>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '-0.025em' }}>UniThesis</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <Avatar src={user.avatar} alt={user.name} size="md" style={{ borderColor: '#475569' }} />
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</p>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.role}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', width: '100%', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'white'}
          onMouseOut={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <LogOut size={18} />
          <span>Deconectare</span>
        </button>
      </div>
    </aside>
  );
};