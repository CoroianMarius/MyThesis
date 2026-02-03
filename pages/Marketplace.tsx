import React, { useState } from 'react';
import { User, Thesis, ThesisType, UserRole } from '../types';
import { Filter, PlusCircle } from 'lucide-react';
import { ThesisCard } from '../components/molecules/ThesisCard';
import { StudentProposalModal } from '../components/organisms/StudentProposalModal';

interface MarketplaceProps {
  user: User;
  theses: Thesis[];
  onApply: (id: string) => void;
  onProposal?: (data: any) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({ user, theses, onApply, onProposal }) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

  const filteredTheses = theses.filter(t => filterType === 'ALL' || t.type === filterType);

  const handleProposalSubmit = (data: any) => {
    setIsProposalModalOpen(false);
    if (onProposal) {
      onProposal(data);
    }
  };

  return (
    <div className="space-y-6">
      <StudentProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        onSubmit={handleProposalSubmit}
        user={user}
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
          </div>
        )}
      </div>

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