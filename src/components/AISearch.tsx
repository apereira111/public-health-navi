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

  const generateRelevantResults = (query: string): string[] => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('morte materna') || lowercaseQuery.includes('mortalidade materna')) {
      return [
        `Análise sobre mortalidade materna no Brasil em 2024:`,
        "• Taxa de mortalidade materna: 60 óbitos por 100.000 nascidos vivos",
        "• Principais causas: hipertensão (37%), hemorragia (11%), infecção (8%)",
        "• Redução de 12% em relação a 2023 (68 óbitos/100.000)",
        "• Meta ODS: reduzir para menos de 30 óbitos/100.000 até 2030",
        "• Regiões com maior incidência: Norte (89/100.000) e Nordeste (71/100.000)"
      ];
    }
    
    if (lowercaseQuery.includes('mortalidade infantil') || lowercaseQuery.includes('morte infantil')) {
      return [
        `Dados de mortalidade infantil no Brasil em 2024:`,
        "• Coeficiente de mortalidade infantil: 12.4 óbitos por 1.000 nascidos vivos",
        "• Mortalidade neonatal: 8.1 óbitos por 1.000 nascidos vivos (65% do total)",
        "• Mortalidade pós-neonatal: 4.3 óbitos por 1.000 nascidos vivos",
        "• Principais causas: prematuridade (35%), malformações (18%), asfixia (12%)",
        "• Tendência: redução de 8% em relação a 2023 (13.5/1.000)"
      ];
    }
    
    if (lowercaseQuery.includes('dengue')) {
      return [
        `Situação da dengue no Brasil em 2024:`,
        "• Casos confirmados: 6.1 milhões (até dezembro/2024)",
        "• Óbitos confirmados: 5.967 casos",
        "• Taxa de incidência: 2.915 casos por 100.000 habitantes",
        "• Estados mais afetados: MG, SP, PR, SC, GO",
        "• Sorotipo predominante: DENV-2 (67%) e DENV-1 (28%)"
      ];
    }
    
    if (lowercaseQuery.includes('vacinação') || lowercaseQuery.includes('cobertura vacinal')) {
      return [
        `Cobertura vacinal no Brasil em 2024:`,
        "• Cobertura geral: 87.3% da população alvo",
        "• Poliomielite: 89.2% (meta: 95%)",
        "• Tríplice viral: 91.4% (meta: 95%)",
        "• Pentavalente: 88.7% (meta: 95%)",
        "• BCG: 94.1% (meta: 90%)",
        "• Desafio: recuperar coberturas pré-pandemia"
      ];
    }
    
    // Resultado genérico para outras consultas
    return [
      `Indicadores de saúde relacionados a "${query}":`,
      "• Taxa de mortalidade infantil: 12.4 por 1.000 nascidos vivos",
      "• Taxa de mortalidade materna: 60 por 100.000 nascidos vivos",
      "• Cobertura do pré-natal: 92.5% das gestantes",
      "• Casos de dengue: 6.1 milhões em 2024",
      "• Cobertura vacinal: 87.3% da população alvo"
    ];
  };

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
      
      const mockResults = generateRelevantResults(query);
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