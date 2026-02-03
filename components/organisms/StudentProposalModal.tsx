import React, { useState } from 'react';
import { ThesisType } from '../../types';
import { X } from 'lucide-react';

interface StudentProposalModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const StudentProposalModal: React.FC<StudentProposalModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: ThesisType.LICENSE,
        technologies: ''
    });

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', animation: 'fadeIn 0.2s ease-out' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Propune o Temă Proprie</h2>
                    <button onClick={onClose}><X size={24} color="#64748b" /></button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
                    <div className="space-y-4">
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Titlul Temei</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Ex: Sistem de management bazat pe Blockchain"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Descriere & Obiective</label>
                            <textarea
                                className="input-field"
                                rows={4}
                                placeholder="Descrie pe scurt ce îți propui să realizezi..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>

                        <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Tip Lucrare</label>
                                <select
                                    className="input-field"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value as ThesisType })}
                                >
                                    <option value={ThesisType.LICENSE}>Licență</option>
                                    <option value={ThesisType.MASTER}>Disertație</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem' }}>Tehnologii Preferate</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="React, Node.js, AI..."
                                    value={formData.technologies}
                                    onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                                />
                            </div>
                        </div>

                        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', color: '#0369a1' }}>
                            <p><strong>Notă:</strong> Propunerea ta va fi vizibilă doar în lista profesorilor. Dacă un profesor este interesat, te va contacta.</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button type="button" onClick={onClose} className="btn btn-secondary w-full" style={{ flex: 1 }}>Anulează</button>
                            <button type="submit" className="btn btn-primary w-full" style={{ flex: 1 }}>Trimite Propunerea</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
