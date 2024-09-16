'use client'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { fetchBids } from '@/lib/api';

export default function BidsList() {
  const [bids, setBids] = useState<any[]>([]);
  
  useEffect(() => {
    fetchBids().then((data) => {
      if (data) {
        setBids(data);
      }
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tus licitaciones</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bids.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{item.partida?.toUpperCase() || 'SIN PARTIDA'}</CardTitle>
              <CardDescription>{item.name}</CardDescription>
              <CardDescription>Propuestas disponibles</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardContent className="pt-0">
              <Link href={`/detalle/${item.id}`} passHref>
                <Button className="w-full">Ver Detalle</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}