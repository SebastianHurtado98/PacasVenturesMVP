'use client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

interface Bid {
  id: number
  contractor_id: number
  name: string
  partida: string
  years: number
  no_debts_sunat: boolean
  experience: string
  economic_proposal: boolean
  technical_proposal: boolean
  sctr: boolean
  vida_ley: boolean
  tdr: boolean
  partida_registral: boolean
  medical_exam: boolean
  criminal_background: boolean
  police_background: boolean
  construction_card: boolean
  safety_management_system: boolean
  quality_management_system: boolean
  publication_date: string
}

export default function BidDetailForm({ bid }: { bid: Bid }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{bid.name}</CardTitle>
          <CardDescription>
            <span className="font-semibold">Partida:</span> {bid.partida.toUpperCase()}
          </CardDescription>
          <div className="flex items-center mt-2">
            <CalendarIcon className="mr-2" />
            <span>Publicado el {formatDate(bid.publication_date)}</span>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>ID de Contratista</Label>
              <p className="text-lg font-medium">{bid.contractor_id}</p>
            </div>
            <div>
              <Label>Años de Experiencia</Label>
              <p className="text-lg font-medium">{bid.years}</p>
            </div>
          </div>

          <div>
            <Label>Experiencia</Label>
            <p className="text-lg font-medium mt-1">{bid.experience}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatusItem label="Sin deudas SUNAT" status={bid.no_debts_sunat} />
            <StatusItem label="Propuesta Económica" status={bid.economic_proposal} />
            <StatusItem label="Propuesta Técnica" status={bid.technical_proposal} />
            <StatusItem label="SCTR" status={bid.sctr} />
            <StatusItem label="Vida Ley" status={bid.vida_ley} />
            <StatusItem label="TDR" status={bid.tdr} />
            <StatusItem label="Partida Registral" status={bid.partida_registral} />
            <StatusItem label="Examen Médico" status={bid.medical_exam} />
            <StatusItem label="Antecedentes Penales" status={bid.criminal_background} />
            <StatusItem label="Antecedentes Policiales" status={bid.police_background} />
            <StatusItem label="Tarjeta de Construcción" status={bid.construction_card} />
            <StatusItem label="Sistema de Gestión de Seguridad" status={bid.safety_management_system} />
            <StatusItem label="Sistema de Gestión de Calidad" status={bid.quality_management_system} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href={`/detalle/${bid.id}/propuestas`} passHref>
            <Button size="lg">Ver propuestas</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
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