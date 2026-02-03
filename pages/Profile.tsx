import React, { useState } from 'react';
import { User } from '../types';
import { Avatar } from '../components/atoms/Avatar';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { Save, X } from 'lucide-react';

interface ProfileProps {
    user: User;
    onUpdateProfile: (updatedUser: User) => void;
    onResetData?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile, onResetData }) => {
    // ... existing hooks
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        bio: user.bio || '',
        interests: user.interests?.join(', ') || ''
    });

    const handleSave = () => {
        onUpdateProfile({
            ...user,
            name: formData.name,
            bio: formData.bio,
            interests: formData.interests.split(',').map(i => i.trim()).filter(i => i.length > 0)
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            bio: user.bio || '',
            interests: user.interests?.join(', ') || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* ... Top Card Details ... */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '8rem', background: 'linear-gradient(to right, var(--color-primary), #6366f1)' }}></div>
                <div style={{ padding: '0 2rem 2rem 2rem' }}>
                    <div style={{ position: 'relative', marginTop: '-4rem', marginBottom: '1rem' }}>
                        <Avatar src={user.avatar} alt={user.name} size="xl" className="border-4 border-white shadow-lg" style={{ border: '4px solid white' }} />
                    </div>
                    <div className="flex-stack-mobile" style={{ alignItems: 'flex-start' }}>
                        <div style={{ flex: 1, marginRight: '1rem', width: '100%' }}>
                            {isEditing ? (
                                <input
                                    className="input-field"
                                    style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            ) : (
                                <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h1>
                            )}
                            <p style={{ fontWeight: 500 }}>{user.role} • {user.department}</p>
                        </div>

                        {isEditing ? (
                            <div className="flex gap-2">
                                <Button variant="secondary" onClick={handleCancel} icon={X}>Anulează</Button>
                                <Button variant="primary" onClick={handleSave} icon={Save}>Salvează</Button>
                            </div>
                        ) : (
                            <Button variant="secondary" onClick={() => setIsEditing(true)}>Editare Profil</Button>
                        )}
                    </div>

                    <div className="grid-cols-2-responsive" style={{ marginTop: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Despre</h3>
                            {isEditing ? (
                                <textarea
                                    className="input-field"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                />
                            ) : (
                                <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>{user.bio}</p>
                            )}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.5rem' }}>Domenii de Interes</h3>
                            {isEditing ? (
                                <input
                                    className="input-field"
                                    placeholder="Ex: React, AI, Cloud..."
                                    value={formData.interests}
                                    onChange={e => setFormData({ ...formData, interests: e.target.value })}
                                />
                            ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {user.interests?.map(i => (
                                        <Badge key={i} variant="default">{i}</Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h2 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Setări Cont</h2>
                <div className="space-y-4">
                    <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Notificări Email</span>
                        <div style={{ width: '2.5rem', height: '1.5rem', background: 'var(--color-primary)', borderRadius: '99px', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ position: 'absolute', right: '0.25rem', top: '0.25rem', width: '1rem', height: '1rem', background: 'white', borderRadius: '50%' }}></div>
                        </div>
                    </div>
                    <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Vizibilitate Profil</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Public pentru profesori</span>
                    </div>
                    <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Date Demo</span>
                        <Button variant="secondary" onClick={onResetData} style={{ fontSize: '0.875rem' }}>Resetează la Default</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};