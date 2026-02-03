import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../atoms/Button';

interface AddTaskModalProps {
    onSave: (title: string, deadline: string) => void;
    onClose: () => void;
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSave = () => {
        if (title && deadline) {
            onSave(title, deadline);
            onClose();
        } else {
            alert('Te rog completează toate câmpurile.');
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90%' }}>
                <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: 0 }}>Adaugă Task Nou</h2>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Titlu Task</label>
                        <input
                            className="input-field"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Ex: Redactare Capitol 1"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Deadline</label>
                        <input
                            type="date"
                            className="input-field"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                        <Button variant="secondary" onClick={onClose}>Anulează</Button>
                        <Button variant="primary" onClick={handleSave}>Salvează Task</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
