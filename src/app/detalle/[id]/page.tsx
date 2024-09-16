import { notFound } from 'next/navigation'
import { fetchBidById } from '@/lib/api'
import BidDetailForm from './BidDetailForm'

export default async function BidDetailPage({ params }: { params: { id: string } }) {
  const bid = await fetchBidById(params.id)

  if (!bid) {
    notFound()
  }

  return <BidDetailForm bid={bid} />
}