'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchProposalById, updateProposalStatusById, updateProposalFastPayStatusById } from '@/lib/api'

interface Subcontractor {
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
}

interface Proposal {
  id: number
  subcontractor_id: number
  tecnical_proposal: string
  economic_proposal: string
  status: string
  fast_pay_status: string | null
  subcontractor: Subcontractor
}

export default function ProposalDetail() {
  const params = useParams()
  const router = useRouter()
  const [proposal, setProposal] = useState<Proposal | null>(null)

  useEffect(() => {
    const loadProposal = async () => {
      if (params.id) {
        const fetchedProposal = await fetchProposalById(params.id as string)
        setProposal(fetchedProposal)
      }
    }
    loadProposal()
  }, [params.id])

  const handleFastPayRequest = async () => {
    await updateProposalFastPayStatusById(params.id as string, 'pending')
    setProposal(prev => prev ? {...prev, fast_pay_status: 'pending'} : null)
  }

  const handleProposalRequest = async () => {
    await updateProposalStatusById(params.id as string, 'pending')
    setProposal(prev => prev ? {...prev, status: 'pending'} : null)
  }

  if (!proposal) return <div>Cargando...</div>

  return (
    <div className="container mx-auto p-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16">
              <AvatarImage src={proposal.subcontractor.profile_pic} alt={proposal.subcontractor.enterprise_name} />
              <AvatarFallback>{proposal.subcontractor.enterprise_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl mb-0">{proposal.subcontractor.enterprise_name}</CardTitle>
              <p className="text-sm text-gray-500">ID: {proposal.subcontractor.id}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-semibold mb-2">Detalles de la Propuesta</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <Label className="text-xs font-medium text-gray-500">Contacto</Label>
                  <p className="text-sm">{proposal.subcontractor.username}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Tu cotización</Label>
                  <p className="text-sm font-semibold">$ {proposal.economic_proposal}</p>
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs font-medium text-gray-500">Requerimiento</Label>
                  <p className="text-sm">{proposal.tecnical_proposal}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Estado</Label>
                  <Badge className="mt-1 text-xs">{proposal.status || 'No solicitado'}</Badge>
                </div>
                <div>
                  <Label className="text-xs font-medium text-gray-500">Estado Fast Pay</Label>
                  <Badge className="mt-1 text-xs">{proposal.fast_pay_status || 'No solicitado'}</Badge>
                </div>
              </div>
            </section>

            {
              proposal.status && (
                <section>
                <h3 className="text-lg font-semibold mb-2">Información enviada</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { label: 'Deudas', value: proposal.subcontractor.no_debt },
                    { label: 'SCTR', value: proposal.subcontractor.sctr },
                    { label: 'Vida Ley', value: proposal.subcontractor.vida_ley },
                    { label: 'TDR', value: proposal.subcontractor.tdr },
                    { label: 'Examen Médico', value: proposal.subcontractor.examen_medico },
                    { label: 'Antecedentes Penales', value: proposal.subcontractor.antecedentes_penales },
                    { label: 'Antecedentes Policiales', value: proposal.subcontractor.antecedentes_policiales },
                    { label: 'Carnet de Construcción', value: proposal.subcontractor.carnet_de_construccion },
                    { label: 'Partida Registral', value: proposal.subcontractor.partida_registral },
                    { label: 'Sistema de Gestión de Seguridad', value: proposal.subcontractor.sistema_de_gestion_de_seguridad },
                    { label: 'Sistema de Gestión de Calidad', value: proposal.subcontractor.sistema_de_gestion_de_calidad },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Label className="text-xs font-medium text-gray-500">{item.label}</Label>
                      <Badge 
                        className={`text-xs ml-2 ${
                          proposal.status === 'accepted' ? "bg-green-500" : 
                          proposal.status === 'rejected' ? "bg-red-500" : 
                          "bg-yellow-500"
                        }`}
                      >
                        {proposal.status === 'accepted' ? 'Revisado' :
                        proposal.status === 'rejected' ? 'Revisado' :
                        'Aún no se revisa'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
              )
            }
            <div className="flex justify-center space-x-2 pt-2">
              {proposal.status === null && (
                <Button onClick={handleProposalRequest} size="sm">Solicitar Evaluación</Button>
              )}
              {proposal.status === 'accepted' && proposal.fast_pay_status === null && (
                <Button onClick={handleFastPayRequest} size="sm">Solicitar Fast Pay</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Button className="mt-4" size="sm" onClick={() => router.back()}>Volver</Button>
    </div>
  )
}