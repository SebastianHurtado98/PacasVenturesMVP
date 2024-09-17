import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NavigationList() {
  return (
    <nav className="flex justify-center space-x-4 p-4">
      <Button asChild variant="default" className="bg-white text-black hover:bg-gray-800 hover:text-white">
        <Link href="/contratista">Soy contratista</Link>
      </Button>
      <Button asChild variant="default" className="bg-white text-black hover:bg-gray-800 hover:text-white">
        <Link href="/subcontratista">Soy subcontratista</Link>
      </Button>
    </nav>
  )
}