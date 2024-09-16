'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useProposalComparison } from './ProposalComparisonContext'

export default function ProposalComparison() {
  const { selectedProposals, removeProposal } = useProposalComparison()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comparación de Propuestas</h2>
      {selectedProposals.length === 0 ? (
        <p>Selecciona hasta 3 propuestas para comparar</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedProposals.map((proposal) => (
            <Card key={proposal.id}>
              <CardHeader>
                <CardTitle>{proposal.subcontractor.enterprise_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Propuesta Técnica:</strong> {proposal.tecnical_proposal}</p>
                <p><strong>Propuesta Económica:</strong> {proposal.economic_proposal}</p>
                <Button onClick={() => removeProposal(proposal.id)} className="mt-4 w-full">
                  Quitar de la comparación
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}