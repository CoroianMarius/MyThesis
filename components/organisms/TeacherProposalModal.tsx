import React, { useState } from 'react';
import { ThesisType, ThesisStatus, Thesis } from '../../types';
import { X, Check } from 'lucide-react';
import { Button } from '../atoms/Button';

interface TeacherProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (thesis: Omit<Thesis, 'id' | 'professorId' | 'professorName'>) => void;
}

export const TeacherProposalModal: React.FC<TeacherProposalModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: ThesisType.LICENSE,
        department: 'Informatică',
        tags: '',
    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0);

        onSubmit({
            title: formData.title,
            description: formData.description,
            type: formData.type as ThesisType,
            department: formData.department,
            tags: tagsArray,
            status: ThesisStatus.AVAILABLE,
            applicants: []
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', animation: 'fadeIn 0.2s ease-out', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Adaugă Temă Nouă</h2>
                    <button onClick={onClose}><X size={24} color="#64748b" /></button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Titlul Temei</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Ex: Utilizarea AI în..."
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Descriere Detaliată</label>
                            <textarea
                                className="input-field"
                                rows={5}
                                placeholder="Descrie obiectivele și cerințele temei..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid-cols-2" style={{ gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Tip Lucrare</label>
                                <select
                                    className="input-field"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value as ThesisType })}
                                >
                                    <option value={ThesisType.LICENSE}>Licență</option>
                                    <option value={ThesisType.MASTER}>Disertație</option>
                                    <option value={ThesisType.PHD}>Doctorat</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Departament</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.department}
                                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Tag-uri (separate prin virgulă)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="AI, Python, Security..."
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button type="button" onClick={onClose} className="btn btn-secondary w-full" style={{ flex: 1 }}>Anulează</button>
                            <Button type="submit" variant="primary" fullWidth icon={Check} style={{ flex: 1 }}>Publică Tema</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
