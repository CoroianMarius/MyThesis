import React, { useState, useEffect } from 'react';
import { User, UserRole, Thesis } from './types';
import { DashboardLayout } from './components/templates/DashboardLayout';
import { Login } from './pages/Login';
import { Marketplace } from './pages/Marketplace';
import { Workflow } from './pages/Workflow';
import { Profile } from './pages/Profile';
import { TeacherManagement } from './pages/TeacherManagement';
import { MockDb } from './services/mockDb';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState('marketplace'); // marketplace, dashboard, profile, management
  const [theses, setTheses] = useState<Thesis[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize DB on first load
  useEffect(() => {
    const init = async () => {
      await MockDb.initialize();
      const loadedTheses = await MockDb.getTheses();
      setTheses(loadedTheses);
      setLoading(false);
    };
    init();
  }, []);

  const handleLogin = async (role: UserRole) => {
    setLoading(true);
    const users = await MockDb.getUsers();
    const mockUser = users.find(u => u.role === role);
    if (mockUser) {
      setUser(mockUser);
      setPage('marketplace');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setPage('marketplace');
  };

  const handleApply = async (thesisId: string) => {
    if (!user) return;
    // Optimistic update
    const updatedTheses = await MockDb.applyToThesis(thesisId, user.id);
    setTheses(updatedTheses); // Update local state with latest from "DB"
    alert("Ai aplicat cu succes! Profesorul a fost notificat.");
  };

  const handleAcceptStudent = async (thesisId: string, studentId: string) => {
    const updatedTheses = await MockDb.acceptStudent(thesisId, studentId);
    setTheses(updatedTheses);
    alert("Student acceptat! Tema a fost marcată ca OCUPAT și s-a creat un spațiu de lucru comun.");
  };

  const handleRejectStudent = async (thesisId: string, studentId: string) => {
    const updatedTheses = await MockDb.rejectStudent(thesisId, studentId);
    setTheses(updatedTheses);
    alert("Cererea a fost respinsă.");
  };

  /* New handler for adding thesis */
  const handleAddThesis = async (thesisData: Omit<Thesis, 'id' | 'professorId' | 'professorName'>) => {
    if (!user) return;
    const newThesis: Thesis = {
      id: `th${Date.now()}`,
      professorId: user.id,
      professorName: user.name,
      ...thesisData
    };

    // Updates DB and returns the fresh list
    const updatedTheses = await MockDb.addThesis(newThesis);
    setTheses(updatedTheses);
    alert("Tema a fost publicată cu succes!");
  };

  const handleUpdateProfile = async (updatedUser: User) => {
    await MockDb.updateUser(updatedUser);
    setUser(updatedUser);
    alert("Profilul a fost actualizat cu succes!");
  };

  const handleResetData = async () => {
    if (confirm("Sigur dorești să resetezi datele la valorile implicite? Această acțiune nu poate fi anulată.")) {
      setLoading(true);
      await MockDb.resetData();
      const loadedTheses = await MockDb.getTheses();
      setTheses(loadedTheses);
      // Need to re-login or reload user to avoid stale state
      alert("Datele au fost resetate. Te rugăm să te autentifici din nou.");
      setUser(null);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Se încarcă datele...</div>;
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  /* New handler for student proposals */
  const handleStudentProposal = async (proposalData: any) => {
    if (!user) return;
    const newThesis: Thesis = {
      id: `th-prop-${Date.now()}`,
      title: proposalData.title,
      description: proposalData.description,
      type: proposalData.type,
      professorId: 'PENDING', // Special flag or leave empty
      professorName: 'Propunere Student', // Or "Căutare Coordonator"
      department: user.department || 'Informatica',
      tags: proposalData.technologies ? proposalData.technologies.split(',').map((s: string) => s.trim()) : [],
      status: 'PENDING_APPROVAL' as any, // We might need to add this status to Enum or map to AVAILABLE with a flag
      applicants: [user.id], // The student is the applicant
      assignedStudentId: undefined // Not assigned yet
    };

    // We need to support PENDING_APPROVAL status or reuse AVAILABLE with a flag.
    // For simplicity, let's use AVAILABLE but with a special professorId.
    // Actually, better to add to MockDb.
    await MockDb.addThesis(newThesis);
    const loaded = await MockDb.getTheses();
    setTheses(loaded);
    alert("Propunerea a fost trimisă cu succes! Profesorii o pot vedea acum.");
  };


  return (
    <DashboardLayout user={user} onLogout={handleLogout} currentPage={page} onNavigate={setPage}>
      {page === 'marketplace' && <Marketplace user={user} theses={theses} onApply={handleApply} onProposal={handleStudentProposal} />}
      {page === 'dashboard' && <Workflow user={user} />}
      {page === 'profile' && <Profile user={user} onUpdateProfile={handleUpdateProfile} onResetData={handleResetData} />}
      {page === 'management' && <TeacherManagement
        user={user}
        theses={theses}
        onAcceptStudent={handleAcceptStudent}
        onRejectStudent={handleRejectStudent}
        onAddThesis={handleAddThesis}
        onAcceptStudentProposal={async (thesisId) => {
          const updated = await MockDb.acceptStudentProposal(thesisId, user.id, user.name);
          setTheses(updated);
          alert("Ai acceptat propunerea studentului! Acum ești coordonatorul acestei teme.");
        }}
      />}
    </DashboardLayout>
  );
}