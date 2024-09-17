import { Button } from "@/components/ui/button"

interface HeaderProps {
  activeTab: 'licitaciones' | 'fastpays' | 'propuestas'
  setActiveTab: (tab: 'licitaciones' | 'fastpays' | 'propuestas') => void
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      <Button
        onClick={() => setActiveTab('licitaciones')}
        variant={activeTab === 'licitaciones' ? 'default' : 'outline'}
      >
        Licitaciones disponibles
      </Button>
      <Button
        onClick={() => setActiveTab('propuestas')}
        variant={activeTab === 'propuestas' ? 'default' : 'outline'}
      >
        Mis Licitaciones
      </Button>
      <Button
        onClick={() => setActiveTab('fastpays')}
        variant={activeTab === 'fastpays' ? 'default' : 'outline'}
      >
        Mis Fast Pays
      </Button>
    </div>
  )
}