import React, { useState } from 'react';
import { User, Thesis, ThesisType, UserRole } from '../types';
import { generateThesisIdeas } from '../services/geminiService';
import { Sparkles, XCircle, Filter, PlusCircle } from 'lucide-react';
import { ThesisCard } from '../components/molecules/ThesisCard';
import { StudentProposalModal } from '../components/organisms/StudentProposalModal';

interface MarketplaceProps {
  user: User;
  theses: Thesis[];
  onApply: (id: string) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ user, theses, onApply }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const filteredTheses = theses.filter(t => filterType === 'ALL' || t.type === filterType);

  const handleGenerateIdeas = async () => {
    if (!user.interests) return;
    setLoadingAi(true);
    // Mock latency if service fails or just for effect
    try {
      const result = await generateThesisIdeas(user.interests);
      setAiSuggestions(result);
    } catch (e) {
      setAiSuggestions("Eroare la generarea ideilor. Vă rugăm încercați din nou.");
    }
    setLoadingAi(false);
  };

  const handleProposalSubmit = (data: any) => {
    setIsProposalModalOpen(false);
    alert("Propunerea a fost trimisă cu succes către profesori! Vei fi contactat dacă un profesor este interesat.");
    // In a real app, this would make an API call to save the proposal
  };

  return (
    <div className="space-y-6">
      <StudentProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleProposalSubmit}
      />

      <div className="flex-between">
        <div>
          <h2 style={{ marginBottom: '0.25rem' }}>Marketplace Teme</h2>
          <p>Explorează temele disponibile sau generează idei noi.</p>
        </div>

        {user.role === UserRole.STUDENT && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsProposalModalOpen(true)}
              className="btn btn-secondary"
            >
              <PlusCircle size={18} />
              <span>Propune Temă</span>
            </button>
            <button
              onClick={handleGenerateIdeas}
              className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', border: 'none' }}
            >
              <Sparkles size={18} />
              <span>AI Matchmaking</span>
            </button>
          </div>
        )}
      </div>

      {/* AI Section */}
      {aiSuggestions && (
        <div className="card" style={{ background: '#eef2ff', borderColor: '#c7d2fe' }}>
          <button onClick={() => setAiSuggestions('')} style={{ float: 'right', color: '#6366f1' }}><XCircle size={20} /></button>
          <h3 style={{ color: '#312e81', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Sparkles size={18} /> Sugestii AI Personalizate
          </h3>
          <div style={{ lineHeight: 1.6, color: '#3730a3' }} dangerouslySetInnerHTML={{ __html: aiSuggestions.replace(/\n/g, '<br/>') }}></div>
        </div>
      )}

      {loadingAi && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', background: '#eef2ff', color: '#6366f1' }}>
          <Sparkles className="animate-spin" size={32} style={{ margin: '0 auto 1rem' }} />
          <p>Se analizează profilul tău academic...</p>
        </div>
      )}

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <button
          onClick={() => setFilterType('ALL')}
          className={`btn ${filterType === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ borderRadius: '2rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          Toate Temele
        </button>
        {[ThesisType.LICENSE, ThesisType.MASTER, ThesisType.PHD].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`btn ${filterType === type ? 'btn-primary' : 'btn-secondary'}`}
            style={{ borderRadius: '2rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid-responsive">
        {filteredTheses.map(thesis => (
          <ThesisCard
            key={thesis.id}
            thesis={thesis}
            userRole={user.role}
            userId={user.id}
            onApply={onApply}
          />
        ))}
      </div>

      {filteredTheses.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-light)' }}>
          <Filter size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
          <p>Nu am găsit teme care să corespundă filtrelor.</p>
        </div>
      )}
    </div>
  );
};