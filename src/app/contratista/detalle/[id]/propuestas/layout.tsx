import { ProposalComparisonProvider } from './ProposalComparisonContext'

export default function ProposalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProposalComparisonProvider>{children}</ProposalComparisonProvider>
}