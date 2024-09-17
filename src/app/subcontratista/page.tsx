'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProposalTable from './components/ProposalTable'
import { fetchProposals } from '@/lib/api'

interface Proposal {
  id: number
  subcontractor_id: number
  tecnical_proposal: string
  economic_proposal: string
  status: string
  fast_pay_status: string | null
  subcontractor: {
    username: string
    enterprise_name: string
    profile_pic: string
  }
}

export default function SubcontractorPage() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [activeTab, setActiveTab] = useState<'licitaciones' | 'fastpays' | 'propuestas'>('licitaciones')

  useEffect(() => {
    const loadProposals = async () => {
      const fetchedProposals = await fetchProposals()
      setProposals(fetchedProposals)
    }
    loadProposals()
  }, [])

  const filteredProposals = activeTab === 'fastpays'
  ? proposals.filter(p => p.status === 'accepted' && p.fast_pay_status !== null)
  : activeTab === 'licitaciones'
  ? proposals.filter(p => p.status === null)
  : activeTab === 'propuestas'
  ? proposals.filter(p => p.status !== null)
  : []
  return (
    <div className="container mx-auto p-4">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <ProposalTable proposals={filteredProposals} activeTab={activeTab} />
    </div>
  )
}