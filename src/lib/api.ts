// lib/api.ts
import { createClient } from '@supabase/supabase-js';

const NEXT_PUBLIC_SUPABASE_URL="https://elooxoaxmxwdqffefsfm.supabase.co"
const NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsb294b2F4bXh3ZHFmZmVmc2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYyNTA1MDgsImV4cCI6MjA0MTgyNjUwOH0.U2Cg1wyeKSXzHGJS2GWaLIW27PnvtBWYmJeQi693gfg"

// Inicializa el cliente de Supabase
const supabaseUrl = NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Función para obtener los datos de 'bid'
export async function fetchBids() {
  try {
    const { data, error } = await supabase
      .from('bid')
      .select('*');
    
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error fetching bids:', error);
    return null;
  }
}

export async function fetchBidById(id: string) {
    try {
        const { data, error } = await supabase
        .from('bid')
        .select('*')
        .eq('id', id)
        .single();
        
        if (error) {
        throw error;
        }
        return data;
    } catch (error) {
        console.error('Error fetching bid:', error);
        return null;
    }
    }

    export async function fetchProposals() {
        try {
            const { data, error } = await supabase
                .from('proposal')
                .select(`
                    *,
                    subcontractor:subcontractor_id (*)
                `);
    
            if (error) {
                throw error;
            }
            return data;
        } catch (error) {
            console.error('Error fetching proposals:', error);
            return null;
        }
    }
    