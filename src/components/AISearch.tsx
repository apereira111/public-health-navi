import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const AISearch = () => {
  console.log('AISearch component rendering - basic version');
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Digite sua consulta",
        description: "Por favor, digite uma consulta antes de buscar.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular busca com IA
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResults = [
        `Indicadores relacionados a "${query}":`,
        "• Taxa de mortalidade infantil: 12.4 por 1000 nascidos vivos",
        "• Cobertura vacinal: 87.3% da população alvo",
        "• Casos de dengue: 234 casos confirmados este mês",
        "• Consultas preventivas: 4.567 consultas realizadas"
      ];
      
      setResults(mockResults);
      
      toast({
        title: "Busca concluída",
        description: "Encontrados dados relacionados à sua consulta."
      });
    } catch (error) {
      toast({
        title: "Erro na busca",
        description: "Não foi possível processar sua consulta.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

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
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={isLoading}
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
        </div>
        
        {results.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-3">Resultados da busca:</h3>
            <div className="space-y-2">
              {results.map((result, index) => (
                <p key={index} className="text-sm">
                  {result}
                </p>
              ))}
            </div>
          </div>
        )}
        
        {results.length === 0 && !isLoading && (
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Digite uma consulta e clique em "Buscar" para ver os resultados.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};