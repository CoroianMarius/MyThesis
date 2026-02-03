import React, { useState, useEffect } from 'react';
import { User, Thesis, ThesisStatus } from '../types';
import { MockDb } from '../services/mockDb';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { Check, X, User as UserIcon, BookOpen } from 'lucide-react';
import { TeacherProposalModal } from '../components/organisms/TeacherProposalModal';

interface TeacherManagementProps {
    user: User;
    theses: Thesis[];
    onAcceptStudent: (thesisId: string, studentId: string) => void;
    onRejectStudent: (thesisId: string, studentId: string) => void;
    onAddThesis: (thesis: Omit<Thesis, 'id' | 'professorId' | 'professorName'>) => void;
    onAcceptStudentProposal: (thesisId: string) => void;
}

export const TeacherManagement: React.FC<TeacherManagementProps> = ({
    user, theses, onAcceptStudent, onRejectStudent, onAddThesis, onAcceptStudentProposal
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Filter theses belonging to this professor
    const myTheses = theses.filter(t => t.professorId === user.id);

    // Filter student proposals
    const studentProposals = theses.filter(t => t.status === ThesisStatus.PENDING_APPROVAL);

    // Need to allow async here or pass users as props.
    // For simplicity update signature to accept users map or just use async effect in parent.
    // Actually easiest is to fetch list of users in App.tsx and pass it down, OR assume we only need IDs if we don't refactor everything.
    // But let's stick to the pattern:
    // We will assume "getStudentDetails" needs to look up in a list.
    // Let's change the props to accept 'allUsers' or we make this component fetch them.
    // Let's make App.tsx pass allUsers for now or just fetch them here on mount.

    const [allUsers, setAllUsers] = useState<User[]>([]);

    useEffect(() => {
        MockDb.getUsers().then(setAllUsers);
    }, []);

    const getStudentDetails = (studentId: string) => {
        return allUsers.find(u => u.id === studentId);
    };

    return (
        <div className="space-y-6">
            <TeacherProposalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={onAddThesis}
            />

            {studentProposals.length > 0 && (
                <div className="space-y-4">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#7c3aed' }}>Propuneri de la Studenți ({studentProposals.length})</h2>
                    <div className="grid-responsive">
                        {studentProposals.map(proposal => {
                            const student = proposal.applicants && proposal.applicants.length > 0 ? getStudentDetails(proposal.applicants[0]) : null;
                            return (
                                <div key={proposal.id} className="card" style={{ borderLeft: '4px solid #a855f7' }}>
                                    <div className="flex-between">
                                        <Badge variant="warning">{proposal.type}</Badge>
                                        <span className="text-sm text-secondary">Student Proposal</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.125rem', margin: '0.5rem 0' }}>{proposal.title}</h3>
                                    <p className="text-secondary text-sm" style={{ marginBottom: '1rem' }}>{proposal.description}</p>

                                    {student && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.5rem', background: '#f5f3ff', borderRadius: '0.5rem' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ddd' }}></div>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Propus de: {student.name}</span>
                                        </div>
                                    )}

                                    <Button
                                        variant="primary"
                                        onClick={() => onAcceptStudentProposal(proposal.id)}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        Acceptă și Coordonează
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex-between">
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Management Teme Propuse Proprii</h1>
                    <p className="text-secondary">Gestionează aplicațiile studenților și temele tale.</p>
                </div>
                <Button variant="primary" icon={BookOpen} onClick={() => setIsModalOpen(true)}>Propune Temă Nouă</Button>
            </div>

            <div className="grid-responsive">
                {myTheses.map(thesis => (
                    <div key={thesis.id} className="card">
                        <div className="flex-between" style={{ marginBottom: '1rem' }}>
                            <Badge variant={thesis.status === ThesisStatus.AVAILABLE ? 'success' : 'warning'}>
                                {thesis.status}
                            </Badge>
                            <span className="text-sm text-light">{thesis.type}</span>
                        </div>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{thesis.title}</h3>
                        <p className="text-secondary text-sm line-clamp-2" style={{ marginBottom: '1.5rem' }}>{thesis.description}</p>

                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '0.5rem' }}>
                            <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#475569' }}>
                                Studenți Aplicanți ({thesis.applicants?.length || 0})
                            </h4>

                            {thesis.applicants && thesis.applicants.length > 0 ? (
                                <div className="space-y-4">
                                    {thesis.applicants.map(studentId => {
                                        const student = getStudentDetails(studentId);
                                        if (!student) return null;
                                        return (
                                            <div key={studentId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                    <div style={{ width: '2rem', height: '2rem', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1' }}>
                                                        <UserIcon size={14} />
                                                    </div>
                                                    <div>
                                                        <p style={{ fontSize: '0.875rem', fontWeight: '500' }}>{student.name}</p>
                                                        <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Medie: 9.50</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                    {thesis.status === ThesisStatus.AVAILABLE && (
                                                        <>
                                                            <button
                                                                onClick={() => onAcceptStudent(thesis.id, student.id)}
                                                                title="Acceptă"
                                                                style={{ width: '2rem', height: '2rem', borderRadius: '0.375rem', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                            >
                                                                <Check size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => onRejectStudent(thesis.id, student.id)}
                                                                title="Refuză"
                                                                style={{ width: '2rem', height: '2rem', borderRadius: '0.375rem', background: '#fee2e2', color: '#b91c1c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p style={{ fontSize: '0.875rem', color: '#94a3b8', fontStyle: 'italic' }}>Momentan nu există cereri.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
