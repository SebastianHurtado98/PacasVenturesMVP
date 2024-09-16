import ProposalComparison from './ProposalComparison'
import ProposalList from './ProposalList'
import { fetchProposals } from '@/lib/api'
import { notFound } from 'next/navigation'

export default async function ProposalsPage({ params }: { params: { id: string } }) {
  const initialProposals = await fetchProposals()
  if (!initialProposals) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Propuestas para Licitación {params.id}</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2">
          <ProposalList bidId={params.id} initialProposals={initialProposals} />
        </div>
        <div className="w-full lg:w-1/2">
          <ProposalComparison />
        </div>
      </div>
    </div>
  )
}