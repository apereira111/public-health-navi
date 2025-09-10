import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { HealthReport } from "./HealthReport";

export const AISearch = () => {
  console.log('AISearch component rendering - basic version');
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<{query: string, results: string[], timestamp: string} | null>(null);
  const { toast } = useToast();

  const generateRelevantResults = (query: string): string[] => {
    const lowercaseQuery = query.toLowerCase();
    
    // Detecta o ano mencionado na consulta
    const yearMatch = query.match(/\b(20\d{2})\b/);
    const requestedYear = yearMatch ? yearMatch[1] : '2024';
    
    // Detecta localização geográfica
    const hasLocation = {
      saoPaulo: lowercaseQuery.includes('são paulo') || lowercaseQuery.includes('sp'),
      rioJaneiro: lowercaseQuery.includes('rio de janeiro') || lowercaseQuery.includes('rj'),
      minasGerais: lowercaseQuery.includes('minas gerais') || lowercaseQuery.includes('mg'),
      parana: lowercaseQuery.includes('paraná') || lowercaseQuery.includes('pr'),
      brasil: lowercaseQuery.includes('brasil') || lowercaseQuery.includes('nacional')
    };
    
    // Verifica se a consulta menciona ambos os indicadores
    const hasMortalidadeMaterna = lowercaseQuery.includes('morte materna') || lowercaseQuery.includes('mortalidade materna') || lowercaseQuery.includes('maternidade');
    const hasMortalidadeInfantil = lowercaseQuery.includes('mortalidade infantil') || lowercaseQuery.includes('morte infantil') || lowercaseQuery.includes('coeficiente de mortalidade infantil');
    
    if (hasMortalidadeMaterna && hasMortalidadeInfantil) {
      if (requestedYear === '2023') {
        return [
          `Dados de mortalidade materna e infantil no Brasil em 2023:`,
          "",
          "📊 MORTALIDADE MATERNA:",
          "• Taxa: 68 óbitos por 100.000 nascidos vivos",
          "• Principais causas: hipertensão (39%), hemorragia (13%), infecção (9%)",
          "• Aumento de 5% em relação a 2022 (65 óbitos/100.000)",
          "• Regiões críticas: Norte (95/100.000) e Nordeste (78/100.000)",
          "",
          "👶 MORTALIDADE INFANTIL:",
          "• Coeficiente: 13.5 óbitos por 1.000 nascidos vivos",
          "• Mortalidade neonatal: 8.8/1.000 (65% do total)",
          "• Principais causas: prematuridade (37%), malformações (19%)",
          "• Tendência: estabilização em relação a 2022"
        ];
      }
      return [
        `Dados de mortalidade materna e infantil no Brasil em ${requestedYear}:`,
        "",
        "📊 MORTALIDADE MATERNA:",
        "• Taxa: 60 óbitos por 100.000 nascidos vivos",
        "• Principais causas: hipertensão (37%), hemorragia (11%), infecção (8%)",
        "• Redução de 12% em relação a 2023 (68 óbitos/100.000)",
        "• Regiões críticas: Norte (89/100.000) e Nordeste (71/100.000)",
        "",
        "👶 MORTALIDADE INFANTIL:",
        "• Coeficiente: 12.4 óbitos por 1.000 nascidos vivos",
        "• Mortalidade neonatal: 8.1/1.000 (65% do total)",
        "• Principais causas: prematuridade (35%), malformações (18%)",
        "• Tendência: redução de 8% em relação a 2023"
      ];
    }
    
    if (hasMortalidadeMaterna) {
      if (requestedYear === '2023') {
        return [
          `Análise sobre mortalidade materna no Brasil em 2023:`,
          "• Taxa de mortalidade materna: 68 óbitos por 100.000 nascidos vivos",
          "• Principais causas: hipertensão (39%), hemorragia (13%), infecção (9%)",
          "• Aumento de 5% em relação a 2022 (65 óbitos/100.000)",
          "• Meta ODS: reduzir para menos de 30 óbitos/100.000 até 2030",
          "• Regiões com maior incidência: Norte (95/100.000) e Nordeste (78/100.000)"
        ];
      }
      return [
        `Análise sobre mortalidade materna no Brasil em ${requestedYear}:`,
        "• Taxa de mortalidade materna: 60 óbitos por 100.000 nascidos vivos",
        "• Principais causas: hipertensão (37%), hemorragia (11%), infecção (8%)",
        "• Redução de 12% em relação a 2023 (68 óbitos/100.000)",
        "• Meta ODS: reduzir para menos de 30 óbitos/100.000 até 2030",
        "• Regiões com maior incidência: Norte (89/100.000) e Nordeste (71/100.000)"
      ];
    }
    
    if (hasMortalidadeInfantil) {
      if (requestedYear === '2023') {
        return [
          `Dados de mortalidade infantil no Brasil em 2023:`,
          "• Coeficiente de mortalidade infantil: 13.5 óbitos por 1.000 nascidos vivos",
          "• Mortalidade neonatal: 8.8 óbitos por 1.000 nascidos vivos (65% do total)",
          "• Mortalidade pós-neonatal: 4.7 óbitos por 1.000 nascidos vivos",
          "• Principais causas: prematuridade (37%), malformações (19%), asfixia (13%)",
          "• Tendência: estabilização em relação a 2022 (13.4/1.000)"
        ];
      }
      return [
        `Dados de mortalidade infantil no Brasil em ${requestedYear}:`,
        "• Coeficiente de mortalidade infantil: 12.4 óbitos por 1.000 nascidos vivos",
        "• Mortalidade neonatal: 8.1 óbitos por 1.000 nascidos vivos (65% do total)",
        "• Mortalidade pós-neonatal: 4.3 óbitos por 1.000 nascidos vivos",
        "• Principais causas: prematuridade (35%), malformações (18%), asfixia (12%)",
        "• Tendência: redução de 8% em relação a 2023 (13.5/1.000)"
      ];
    }
    
    if (lowercaseQuery.includes('dengue')) {
      // Dados específicos por localização
      if (hasLocation.saoPaulo) {
        if (requestedYear === '2023') {
          return [
            `Relação entre casos de dengue e mortes por dengue na cidade de São Paulo em 2023:`,
            "",
            "📊 DADOS ESPECÍFICOS DE SÃO PAULO (2023):",
            "• Casos confirmados: 189.420 (11.8% do total nacional)",
            "• Óbitos confirmados: 127 casos",
            "• Taxa de incidência: 1.542 casos por 100.000 habitantes",
            "• Taxa de letalidade: 0.067%",
            "",
            "🏙️ DISTRIBUIÇÃO POR REGIÃO DA CIDADE:",
            "• Zona Sul: 52.340 casos / 35 óbitos",
            "• Zona Leste: 48.720 casos / 31 óbitos",
            "• Zona Norte: 41.580 casos / 28 óbitos",
            "• Zona Oeste: 35.280 casos / 22 óbitos",
            "• Centro: 11.500 casos / 11 óbitos",
            "",
            "📈 COMPARAÇÃO COM ANOS ANTERIORES:",
            "• 2022: 89.340 casos / 67 óbitos (+112% casos)",
            "• 2023: 189.420 casos / 127 óbitos",
            "",
            "🔍 ANÁLISE ESPECÍFICA SP:",
            "• Sorotipo predominante: DENV-2 (52%) e DENV-1 (38%)",
            "• Bairros mais afetados: Cidade Tiradentes, Itaquera, Sapopemba",
            "• Período crítico: fevereiro a junho de 2023",
            "",
            "🏥 REDE DE ATENDIMENTO:",
            "• 468 UBS com protocolo dengue ativo",
            "• 15 hospitais de referência para casos graves",
            "• Tempo médio para diagnóstico: 2.8 dias"
          ];
        }
        return [
          `Situação da dengue na cidade de São Paulo em ${requestedYear}:`,
          "",
          "📊 DADOS ESPECÍFICOS DE SÃO PAULO (2024):",
          "• Casos confirmados: 412.680 (6.7% do total nacional)",  
          "• Óbitos confirmados: 298 casos",
          "• Taxa de incidência: 3.562 casos por 100.000 habitantes",
          "• Taxa de letalidade: 0.072%",
          "",
          "📈 EVOLUÇÃO 2023-2024:",
          "• Aumento de 118% nos casos (189.420 → 412.680)",
          "• Aumento de 135% nos óbitos (127 → 298)",
          "",
          "🏙️ REGIÕES MAIS AFETADAS:",
          "• Zona Leste: 138.450 casos (33.6%)",
          "• Zona Sul: 98.720 casos (23.9%)",
          "• Zona Norte: 89.340 casos (21.7%)",
          "",
          "🔬 PERFIL EPIDEMIOLÓGICO:",
          "• Sorotipo predominante: DENV-2 (71%)",
          "• Faixa etária: 25-44 anos (38%)",
          "• Período crítico: dezembro 2023 a maio 2024"
        ];
      }
      
      if (requestedYear === '2023') {
        return [
          `Relação entre casos de dengue e mortes por dengue por estado brasileiro em 2023:`,
          "",
          "📊 DADOS CONSOLIDADOS POR REGIÃO (2023):",
          "• Casos confirmados: 1.6 milhões (até dezembro/2023)",
          "• Óbitos confirmados: 1.094 casos",
          "• Taxa de incidência: 781 casos por 100.000 habitantes",
          "• Taxa de letalidade: 0.068%",
          "",
          "🗺️ DISTRIBUIÇÃO POR ESTADOS:",
          "• Minas Gerais: 245.830 casos / 183 óbitos",
          "• São Paulo: 189.420 casos / 127 óbitos", 
          "• Goiás: 156.780 casos / 98 óbitos",
          "• Distrito Federal: 89.560 casos / 45 óbitos",
          "• Rio de Janeiro: 78.340 casos / 67 óbitos",
          "• Paraná: 67.230 casos / 34 óbitos",
          "",
          "🔍 ANÁLISE COMPARATIVA:",
          "• Sorotipo predominante: DENV-1 (45%) e DENV-2 (38%)",
          "• Faixa etária mais afetada: 20-39 anos (42%)",
          "• Período crítico: março a maio de 2023"
        ];
      }
      return [
        `Situação da dengue no Brasil em ${requestedYear}:`,
        "• Casos confirmados: 6.1 milhões (até dezembro/2024)",
        "• Óbitos confirmados: 5.967 casos",
        "• Taxa de incidência: 2.915 casos por 100.000 habitantes",
        "• Estados mais afetados: MG, SP, PR, SC, GO",
        "• Sorotipo predominante: DENV-2 (67%) e DENV-1 (28%)"
      ];
    }
    
    if (lowercaseQuery.includes('vacinação') || lowercaseQuery.includes('cobertura vacinal')) {
      if (requestedYear === '2023') {
        return [
          `Cobertura vacinal no Brasil em 2023:`,
          "• Cobertura geral: 84.1% da população alvo",
          "• Poliomielite: 86.7% (meta: 95%)",
          "• Tríplice viral: 88.9% (meta: 95%)",
          "• Pentavalente: 85.3% (meta: 95%)",
          "• BCG: 91.8% (meta: 90%)",
          "• Desafio: recuperação pós-pandemia em andamento"
        ];
      }
      return [
        `Cobertura vacinal no Brasil em ${requestedYear}:`,
        "• Cobertura geral: 87.3% da população alvo",
        "• Poliomielite: 89.2% (meta: 95%)",
        "• Tríplice viral: 91.4% (meta: 95%)",
        "• Pentavalente: 88.7% (meta: 95%)",
        "• BCG: 94.1% (meta: 90%)",
        "• Desafio: recuperar coberturas pré-pandemia"
      ];
    }
    
    // Resultado genérico para outras consultas
    if (requestedYear === '2023') {
      return [
        `Indicadores de saúde relacionados a "${query}" em 2023:`,
        "• Taxa de mortalidade infantil: 13.5 por 1.000 nascidos vivos",
        "• Taxa de mortalidade materna: 68 por 100.000 nascidos vivos",
        "• Cobertura do pré-natal: 89.7% das gestantes",
        "• Casos de dengue: 1.6 milhões em 2023",
        "• Cobertura vacinal: 84.1% da população alvo"
      ];
    }
    return [
      `Indicadores de saúde relacionados a "${query}" em ${requestedYear}:`,
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
      
      // Preparar dados para o relatório
      setReportData({
        query: query,
        results: mockResults,
        timestamp: new Date().toISOString()
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

  const generateReport = () => {
    if (reportData) {
      setShowReport(true);
    } else {
      toast({
        title: "Nenhum dado disponível",
        description: "Faça uma busca primeiro para gerar o relatório.",
        variant: "destructive"
      });
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
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Resultados da busca:</h3>
              <Button onClick={generateReport} variant="default" size="sm">
                📊 Gerar Relatório Profissional
              </Button>
            </div>
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
      
      {showReport && reportData && (
        <HealthReport 
          data={reportData} 
          onClose={() => setShowReport(false)} 
        />
      )}
    </div>
  );
};