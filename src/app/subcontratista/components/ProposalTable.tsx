import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

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

interface ProposalTableProps {
  proposals: Proposal[]
  activeTab: 'licitaciones' | 'fastpays' | 'propuestas'
}

export default function ProposalTable({ proposals, activeTab }: ProposalTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contrata</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>{activeTab === 'licitaciones' ? 'Requerimiento': 'Propuesta Técnica'}</TableHead>
          <TableHead>{activeTab === 'licitaciones' ? 'Presupuesto': 'Propuesta Económica'}</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((proposal) => (
          <TableRow key={proposal.id}>
            <TableCell>{proposal.subcontractor.enterprise_name}</TableCell>
            <TableCell>{proposal.subcontractor.username}</TableCell>
            <TableCell>{proposal.tecnical_proposal.substring(0, 50)}...</TableCell>
            <TableCell>{proposal.economic_proposal}</TableCell>
            <TableCell>{activeTab === 'licitaciones' ? 'activo' : activeTab === 'propuestas' ? proposal.status : proposal.fast_pay_status}</TableCell>
            <TableCell>
              <Link href={`/subcontratista/propuesta/${proposal.id}`}>
                <Button variant="outline">Ver detalle</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}