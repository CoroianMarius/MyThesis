import React, { useState, useEffect } from 'react';
import { User, UserRole, Task, ChatMessage } from '../types';
import { summarizeProject } from '../services/geminiService';
import { MockDb } from '../services/mockDb';
import { AddTaskModal } from '../components/organisms/AddTaskModal';
import {
  CheckCircle,
  MessageSquare,
  FileText,
  Send,
  Download,
  Plus,
  AlertCircle,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '../components/atoms/Button';
import { TaskItem } from '../components/molecules/TaskItem';
import { ChatMessage as ChatBubble } from '../components/molecules/ChatMessage';
import { Badge } from '../components/atoms/Badge';

interface WorkflowProps {
  user: User;
}

export const Workflow: React.FC<WorkflowProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'chat' | 'docs'>('overview');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'm1', senderId: 't1', text: 'Salut Andrei, te rog să încarci schița arhitecturii până vineri.', timestamp: new Date(Date.now() - 86400000) },
    { id: 'm2', senderId: 's1', text: 'Sigur, lucrez la diagrama UML acum.', timestamp: new Date(Date.now() - 3600000) }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    MockDb.getTasks().then(setTasks);
  }, []);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleAddTask = (title: string, deadline: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      deadline,
      completed: false
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    MockDb.updateTasks(updatedTasks);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    MockDb.updateTasks(updatedTasks);
  };

  const handleGradeTask = (id: string, grade: number) => {
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, grade } : t);
    setTasks(updatedTasks);
    MockDb.updateTasks(updatedTasks);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      text: newMessage,
      timestamp: new Date()
    };
    setChatMessages([...chatMessages, msg]);
    setNewMessage('');
  };

  const handleGenerateSummary = async () => {
    const activeTasks = tasks.filter(t => !t.completed).map(t => t.title);
    const res = await summarizeProject("Implementare sistem detecție anomalii", activeTasks);
    setSummary(res);
  };


  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex-stack-mobile" style={{ marginBottom: '1.5rem', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Utilizarea AI în detecția anomaliilor</h1>
            <p className="text-sm">Coordonator: Prof. Dr. Elena Ionescu • Student: Andrei Popescu</p>
          </div>
          <Badge variant="success">În Desfășurare</Badge>
        </div>

        {/* Tabs */}
        <div className="tab-container">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'tasks', label: 'Task-uri', icon: CheckCircle },
            { id: 'chat', label: 'Discuții', icon: MessageSquare },
            { id: 'docs', label: 'Documente', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ minHeight: '400px' }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="space-y-6">
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Progres General</h3>
                  <div className="progress-track" style={{ marginBottom: '0.5rem' }}>
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                  </div>
                  <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>45% Finalizat</p>
                </div>

              </div>

              <div className="space-y-4">
                <div className="flex-between">
                  <h3 style={{ fontSize: '1rem' }}>Notificări & AI Summary</h3>
                  <button onClick={handleGenerateSummary} className="badge badge-purple" style={{ border: 'none', cursor: 'pointer' }}>Generate Report</button>
                </div>
                {summary ? (
                  <div className="card" style={{ background: '#f3e8ff', border: '1px solid #d8b4fe' }}>
                    <p style={{ fontWeight: 'bold', color: '#6b21a8', marginBottom: '0.5rem' }}>Raport AI:</p>
                    <p style={{ fontSize: '0.875rem', color: '#581c87' }}>{summary}</p>
                  </div>
                ) : (
                  <div className="card" style={{ background: '#fefce8', border: '1px solid #fef08a', display: 'flex', gap: '1rem' }}>
                    <AlertCircle color="#ca8a04" size={24} />
                    <div>
                      <p style={{ fontWeight: 500, color: '#854d0e' }}>Deadline Apropiat</p>
                      <p style={{ fontSize: '0.875rem', color: '#a16207' }}>Task-ul "Definire arhitectură" expiră în 3 zile.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="space-y-4">
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Lista de Task-uri</h3>
                {user.role === UserRole.TEACHER && (
                  <Button variant="primary" icon={Plus} onClick={() => setIsTaskModalOpen(true)}>Adaugă Task</Button>
                )}
              </div>
              {tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  userRole={user.role}
                  onToggle={toggleTask}
                  onGrade={handleGradeTask}
                />
              ))}
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-messages">
                {chatMessages.map(msg => (
                  <ChatBubble key={msg.id} message={msg} isMe={msg.senderId === user.id} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Scrie un mesaj..."
                  className="input-field"
                />
                <Button onClick={handleSendMessage} icon={Send} variant="primary"></Button>
              </div>
            </div>
          )}

          {activeTab === 'docs' && (
            <div className="space-y-6">
              <div className="card" style={{ background: '#eff6ff', border: '1px dashed #bfdbfe', textAlign: 'center' }}>
                <FileText size={48} color="#60a5fa" style={{ margin: '0 auto 0.5rem' }} />
                <h3 style={{ color: '#1e3a8a' }}>Încarcă un nou draft</h3>
                <p style={{ fontSize: '0.875rem', color: '#1d4ed8', marginBottom: '1.5rem' }}>PDF sau DOCX, max 10MB</p>
                <label className="btn btn-primary" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                  <Download size={16} className="rotate-180" />
                  <span>Alege Fișier</span>
                  <input type="file" className="hidden" style={{ display: 'none' }} />
                </label>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Istoric Versiuni</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { name: 'Draft_Capitol_1_v2.pdf', date: '10 Oct 2023', size: '2.4 MB' },
                    { name: 'Plan_Lucrare_Final.pdf', date: '25 Sep 2023', size: '1.1 MB' },
                  ].map((file, idx) => (
                    <div key={idx} className="file-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ background: '#fee2e2', color: '#ef4444', padding: '0.5rem', borderRadius: '0.375rem' }}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{file.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{file.date} • {file.size}</p>
                        </div>
                      </div>
                      <button style={{ color: 'var(--text-light)' }} className="hover:text-primary">
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Administrative & Evaluare</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Button variant="secondary" icon={FileText}>Generare Cerere Înscriere</Button>
                  <Button variant="secondary" icon={CheckCircle}>Verificare Anti-Plagiat</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isTaskModalOpen && (
        <AddTaskModal
          onSave={handleAddTask}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
};