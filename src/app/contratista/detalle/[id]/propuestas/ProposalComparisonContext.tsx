'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Proposal {
  id: number
  percentage: number
  comment: string
  proposal: {
    subcontractor_id: number
    tecnical_proposal: string
    economic_proposal: string
    subcontractor: {
      enterprise_name: string
      // ... otros campos del subcontratista
    }
  }
}

interface ProposalComparisonContextType {
  selectedProposals: Proposal[]
  addProposal: (proposal: Proposal) => void
  removeProposal: (id: number) => void
}

const ProposalComparisonContext = createContext<ProposalComparisonContextType | undefined>(undefined)

export function ProposalComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProposals, setSelectedProposals] = useState<Proposal[]>([])

  const addProposal = (proposal: Proposal) => {
    if (selectedProposals.length < 3 && !selectedProposals.some(p => p.id === proposal.id)) {
      setSelectedProposals([...selectedProposals, proposal])
    }
  }

  const removeProposal = (id: number) => {
    setSelectedProposals(selectedProposals.filter(p => p.id !== id))
  }

  return (
    <ProposalComparisonContext.Provider value={{ selectedProposals, addProposal, removeProposal }}>
      {children}
    </ProposalComparisonContext.Provider>
  )
}

export function useProposalComparison() {
  const context = useContext(ProposalComparisonContext)
  if (context === undefined) {
    throw new Error('useProposalComparison must be used within a ProposalComparisonProvider')
  }
  return context
}