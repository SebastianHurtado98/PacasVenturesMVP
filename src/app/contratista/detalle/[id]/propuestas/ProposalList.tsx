'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useInView } from 'react-intersection-observer'
import { useProposalComparison } from './ProposalComparisonContext'
import PercentageCircle from './PercentageCircle'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"

interface Proposal {
  id: number,
  percentage: number,
  comment: string,
  proposal: {
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
      partida_registral: boolean
      examen_medico: boolean
      antecedentes_penales: boolean
      antecedentes_policiales: boolean
      carnet_de_construccion: boolean
      sistema_de_gestion_de_seguridad: boolean
      sistema_de_gestion_de_calidad: boolean
      created_at: string
    }
  }
}

interface ProposalListProps {
  bidId: string;
  initialProposals: Proposal[];
}

function StatusItem({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>
      {status ? (
        <Badge variant="default" className="bg-green-500">
          <CheckCircleIcon className="w-4 h-4 mr-1" /> Sí
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-red-500 text-white">
          <XCircleIcon className="w-4 h-4 mr-1" /> No
        </Badge>
      )}
    </div>
  )
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
    const newProposals = await fetchMoreProposals(bidId, page)
    setProposals([...proposals, ...newProposals])
    setPage(page + 1)
  }

  const handleAddToComparison = (proposal: Proposal) => {
    addProposal(proposal)
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-4 scrollbar-hide">
      {proposals.map((match) => (
        <Card key={match.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={match.proposal.subcontractor.profile_pic} alt={match.proposal.subcontractor.username} />
                  <AvatarFallback>{match.proposal.subcontractor.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-sm font-medium">
                  {match.proposal.subcontractor.enterprise_name}
                </CardTitle>
              </div>
              <PercentageCircle percentage={match.percentage} />
            </div>
            <p className="text-sm mt-2">{match.comment}</p>
          </CardHeader>
          <CardContent className="p-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Ver detalles</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>ID de Subcontratista</Label>
                        <p className="text-lg font-medium">{match.proposal.subcontractor.id}</p>
                      </div>
                      <div>
                        <Label>Años de Experiencia</Label>
                        <p className="text-lg font-medium">{match.proposal.subcontractor.year}</p>
                      </div>
                    </div>

                    <div>
                      <Label>Experiencia</Label>
                      <p className="text-lg font-medium mt-1">{match.proposal.subcontractor.experience}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <StatusItem label="Sin deudas" status={match.proposal.subcontractor.no_debt} />
                      <StatusItem label="SCTR" status={match.proposal.subcontractor.sctr} />
                      <StatusItem label="Vida Ley" status={match.proposal.subcontractor.vida_ley} />
                      <StatusItem label="TDR" status={match.proposal.subcontractor.tdr} />
                      <StatusItem label="Examen Médico" status={match.proposal.subcontractor.examen_medico} />
                      <StatusItem label="Antecedentes Penales" status={match.proposal.subcontractor.antecedentes_penales} />
                      <StatusItem label="Antecedentes Policiales" status={match.proposal.subcontractor.antecedentes_policiales} />
                      <StatusItem label="Carnet de Construcción" status={match.proposal.subcontractor.carnet_de_construccion} />
                      <StatusItem label="Partida Registral" status={match.proposal.subcontractor.partida_registral} />
                      <StatusItem label="Sistema de Gestión de Seguridad" status={match.proposal.subcontractor.sistema_de_gestion_de_seguridad} />
                      <StatusItem label="Sistema de Gestión de Calidad" status={match.proposal.subcontractor.sistema_de_gestion_de_calidad} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="mt-4">
              <Button 
                onClick={() => handleAddToComparison(match)} 
                className="w-full"
                disabled={selectedProposals.some(p => p.id === match.id) || selectedProposals.length >= 3}
              >
                {selectedProposals.some(p => p.id === match.id) ? 'Agregado' : 'Agregar a comparación'}
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
    percentage: Math.floor(Math.random() * 100),
    comment: `Comentario de la propuesta ${page * 10 + index}`,
    proposal: {
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
        partida_registral: Math.random() > 0.5,
        examen_medico: Math.random() > 0.5,
        antecedentes_penales: Math.random() > 0.5,
        antecedentes_policiales: Math.random() > 0.5,
        carnet_de_construccion: Math.random() > 0.5,
        sistema_de_gestion_de_seguridad: Math.random() > 0.5,
        sistema_de_gestion_de_calidad: Math.random() > 0.5,
        created_at: new Date().toISOString(),
      }
    }
  }))
}