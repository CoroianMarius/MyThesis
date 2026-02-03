import React from 'react';
import { User, UserRole } from '../types';
import { LogOut, BookOpen, LayoutDashboard, UserCircle, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, currentPage, onNavigate }) => {
  if (!user) {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar / Mobile Nav */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 md:h-screen sticky top-0 md:fixed z-50">
        <div className="p-4 flex items-center justify-between md:block">
            <div className="flex items-center space-x-2 mb-0 md:mb-8">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">U</div>
                <span className="text-xl font-bold tracking-tight">UniThesis</span>
            </div>
            {/* Mobile Menu Button - simplified for this demo, usually hidden on desktop */}
        </div>

        <nav className="px-2 md:px-4 space-y-2 flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <button
            onClick={() => onNavigate('marketplace')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
              currentPage === 'marketplace' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Search size={20} />
            <span>Marketplace Teme</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
              currentPage === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard Lucrare</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors whitespace-nowrap ${
              currentPage === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <UserCircle size={20} />
            <span>Profilul Meu</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700 bg-slate-900 hidden md:block">
          <div className="flex items-center space-x-3 mb-4">
            <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-slate-600" />
            <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.role}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-slate-400 hover:text-white w-full transition-colors"
          >
            <LogOut size={18} />
            <span>Deconectare</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
