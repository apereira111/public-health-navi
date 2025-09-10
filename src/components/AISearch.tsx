import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const AISearch = () => {
  console.log('AISearch component rendering - basic version');
  
  const [query, setQuery] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">Pesquisa com IA</h2>
        <p className="text-muted-foreground mb-6">
          Use linguagem natural para buscar indicadores de saúde
        </p>
        
        <div className="flex gap-4">
          <Input 
            placeholder="Digite sua consulta aqui..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button>
            Buscar
          </Button>
        </div>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            Funcionalidade em desenvolvimento. Em breve você poderá fazer consultas avançadas com IA.
          </p>
        </div>
      </Card>
    </div>
  );
};