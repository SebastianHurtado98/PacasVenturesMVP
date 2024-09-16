'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useInView } from 'react-intersection-observer'
import { useProposalComparison } from './ProposalComparisonContext'

interface Proposal {
  id: number
  subcontractor_id: number
  tecnical_proposal: string
  economic_proposal: string
  subcontractor: {
    id: number
    username: string
    enterprise_name: string
    profile_pic: string
    year: number
    no_debt: boolean
    experience: string
    sctr: boolean
    vida_ley: boolean
    tdr: boolean
    partida_registral: string
    examen_medico: boolean
    antecedentes_penales: boolean
    antecedentes_policiales: boolean
    carnet_de_construccion: boolean
    sistema_de_gestion_de_seguridad: string
    sistema_de_gestion_de_calidad: string
    created_at: string
  }
}

interface ProposalListProps {
  bidId: string;
  initialProposals: Proposal[];
}

export default function ProposalList({ bidId, initialProposals }: ProposalListProps) {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals)
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const { addProposal, selectedProposals } = useProposalComparison()

  useEffect(() => {
    if (inView) {
      loadMoreProposals()
    }
  }, [inView])

  const loadMoreProposals = async () => {
    // Simular la carga de más propuestas
    const newProposals = await fetchMoreProposals(bidId, page)
    setProposals([...proposals, ...newProposals])
    setPage(page + 1)
  }

  const handleAddToComparison = (proposal: Proposal) => {
    addProposal(proposal)
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-4 scrollbar-hide">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {proposal.subcontractor.enterprise_name}
            </CardTitle>
            <Avatar className="bg-black">
              <AvatarImage src={proposal.subcontractor.profile_pic} alt={proposal.subcontractor.username} />
              <AvatarFallback>{proposal.subcontractor.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Ver detalles</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p><strong>Años de experiencia:</strong> {proposal.subcontractor.year}</p>
                    <p><strong>Sin deudas:</strong> {proposal.subcontractor.no_debt ? 'Sí' : 'No'}</p>
                    <p><strong>Experiencia:</strong> {proposal.subcontractor.experience}</p>
                    <p><strong>SCTR:</strong> {proposal.subcontractor.sctr ? 'Sí' : 'No'}</p>
                    <p><strong>Vida Ley:</strong> {proposal.subcontractor.vida_ley ? 'Sí' : 'No'}</p>
                    <p><strong>TDR:</strong> {proposal.subcontractor.tdr ? 'Sí' : 'No'}</p>
                    <p><strong>Partida Registral:</strong> {proposal.subcontractor.partida_registral}</p>
                    <p><strong>Examen Médico:</strong> {proposal.subcontractor.examen_medico ? 'Sí' : 'No'}</p>
                    <p><strong>Antecedentes Penales:</strong> {proposal.subcontractor.antecedentes_penales ? 'Sí' : 'No'}</p>
                    <p><strong>Antecedentes Policiales:</strong> {proposal.subcontractor.antecedentes_policiales ? 'Sí' : 'No'}</p>
                    <p><strong>Carnet de Construcción:</strong> {proposal.subcontractor.carnet_de_construccion ? 'Sí' : 'No'}</p>
                    <p><strong>Sistema de Gestión de Seguridad:</strong> {proposal.subcontractor.sistema_de_gestion_de_seguridad}</p>
                    <p><strong>Sistema de Gestión de Calidad:</strong> {proposal.subcontractor.sistema_de_gestion_de_calidad}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4">
              <Button 
                onClick={() => handleAddToComparison(proposal)} 
                className="w-full"
                disabled={selectedProposals.some(p => p.id === proposal.id) || selectedProposals.length >= 3}
              >
                {selectedProposals.some(p => p.id === proposal.id) ? 'Agregado' : 'Agregar a comparación'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <div ref={ref}>Cargando más propuestas...</div>
    </div>
  )
}

// Función simulada para obtener más propuestas
async function fetchMoreProposals(bidId: string, page: number): Promise<Proposal[]> {
  // Simular una llamada a la API
  await new Promise(resolve => setTimeout(resolve, 1000))
  return Array(10).fill(null).map((_, index) => ({
    id: page * 10 + index,
    subcontractor_id: page * 10 + index,
    tecnical_proposal: `Propuesta técnica ${page * 10 + index}`,
    economic_proposal: `Propuesta económica ${page * 10 + index}`,
    subcontractor: {
      id: page * 10 + index,
      username: `usuario${page * 10 + index}`,
      enterprise_name: `Empresa ${page * 10 + index}`,
      profile_pic: `https://api.dicebear.com/6.x/initials/svg?seed=Empresa${page * 10 + index}`,
      year: Math.floor(Math.random() * 20) + 1,
      no_debt: Math.random() > 0.5,
      experience: `Experiencia de la empresa ${page * 10 + index}`,
      sctr: Math.random() > 0.5,
      vida_ley: Math.random() > 0.5,
      tdr: Math.random() > 0.5,
      partida_registral: `PR-${page * 10 + index}`,
      examen_medico: Math.random() > 0.5,
      antecedentes_penales: Math.random() > 0.5,
      antecedentes_policiales: Math.random() > 0.5,
      carnet_de_construccion: Math.random() > 0.5,
      sistema_de_gestion_de_seguridad: `SGS-${page * 10 + index}`,
      sistema_de_gestion_de_calidad: `SGC-${page * 10 + index}`,
      created_at: new Date().toISOString(),
    }
  }))
}