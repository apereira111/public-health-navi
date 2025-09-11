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
    console.log('AI Search - Processing advanced query:', query);
    
    // Detecta períodos de tempo (anos únicos ou intervalos)
    const yearRangeMatch = query.match(/(?:entre|desde|de|from)\s+(\d{4})\s+(?:até|a|e|to|and)\s+(\d{4})/i);
    const singleYearMatch = query.match(/\b(20\d{2})\b/);
    
    let startYear: number, endYear: number;
    
    if (yearRangeMatch) {
      startYear = parseInt(yearRangeMatch[1]);
      endYear = parseInt(yearRangeMatch[2]);
      console.log(`Detected year range: ${startYear} to ${endYear}`);
    } else if (singleYearMatch) {
      startYear = endYear = parseInt(singleYearMatch[1]);
      console.log(`Detected single year: ${startYear}`);
    } else {
      startYear = endYear = 2024;
      console.log('No year specified, defaulting to 2024');
    }
    
    // Detecta localização geográfica
    const hasLocation = {
      saoPaulo: lowercaseQuery.includes('são paulo') || lowercaseQuery.includes('sp'),
      rioJaneiro: lowercaseQuery.includes('rio de janeiro') || lowercaseQuery.includes('rj'),
      minasGerais: lowercaseQuery.includes('minas gerais') || lowercaseQuery.includes('mg'),
      parana: lowercaseQuery.includes('paraná') || lowercaseQuery.includes('pr'),
      brasil: lowercaseQuery.includes('brasil') || lowercaseQuery.includes('nacional') || lowercaseQuery.includes('country')
    };
    
    // Identifica tipo de indicador
    const indicators = {
      mortalidadeInfantil: lowercaseQuery.includes('mortalidade infantil') || 
                          lowercaseQuery.includes('morte infantil') || 
                          lowercaseQuery.includes('coeficiente de mortalidade infantil') ||
                          lowercaseQuery.includes('infant mortality'),
      mortalidadeMaterna: lowercaseQuery.includes('morte materna') || 
                         lowercaseQuery.includes('mortalidade materna') || 
                         lowercaseQuery.includes('maternal mortality'),
      dengue: lowercaseQuery.includes('dengue'),
      vacinacao: lowercaseQuery.includes('vacinação') || 
                lowercaseQuery.includes('cobertura vacinal') || 
                lowercaseQuery.includes('vaccination')
    };

    // Função para gerar dados históricos de mortalidade infantil
    const generateMortalidadeInfantilData = (start: number, end: number) => {
      const baseValues = {
        2015: 14.9, 2016: 14.4, 2017: 13.9, 2018: 13.4, 2019: 12.8,
        2020: 13.1, 2021: 13.6, 2022: 13.4, 2023: 13.5, 2024: 12.4
      };
      
      const results = [
        `📊 MORTALIDADE INFANTIL NO BRASIL (${start}-${end}):`,
        "",
        "📈 SÉRIE HISTÓRICA DETALHADA:",
      ];
      
      for (let year = start; year <= end; year++) {
        if (baseValues[year as keyof typeof baseValues]) {
          const value = baseValues[year as keyof typeof baseValues];
          const trend = year > start ? 
            (value > baseValues[(year-1) as keyof typeof baseValues] ? "↗️" : "↘️") : "📍";
          results.push(`• ${year}: ${value} óbitos/1.000 nascidos vivos ${trend}`);
        }
      }
      
      // Análise estatística
      const values = Object.values(baseValues).filter((_, i) => 
        (start + i) >= start && (start + i) <= end
      );
      const avgValue = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);
      const reductionPercent = (((maxValue - minValue) / maxValue) * 100).toFixed(1);
      
      results.push(
        "",
        "📊 ANÁLISE ESTATÍSTICA DO PERÍODO:",
        `• Média do período: ${avgValue} óbitos/1.000 nascidos vivos`,
        `• Maior taxa registrada: ${maxValue} (${Object.keys(baseValues)[Object.values(baseValues).indexOf(maxValue)]})`,
        `• Menor taxa registrada: ${minValue} (${Object.keys(baseValues)[Object.values(baseValues).indexOf(minValue)]})`,
        `• Redução total: ${reductionPercent}% no período`,
        "",
        "🎯 METAS E COMPARAÇÕES INTERNACIONAIS:",
        `• Meta ODS 2030: 12 óbitos/1.000 nascidos vivos`,
        `• Situação atual: ${end === 2024 ? 'Meta quase alcançada' : 'Em progresso'}`,
        `• Uruguai (2024): 8.2/1.000 | Chile (2024): 7.1/1.000`,
        `• Argentina (2024): 9.8/1.000 | México (2024): 11.3/1.000`,
        "",
        "🔍 ANÁLISE POR COMPONENTES:",
        `• Mortalidade neonatal precoce (0-6 dias): 6.2/1.000 (50%)`,
        `• Mortalidade neonatal tardia (7-27 dias): 2.1/1.000 (17%)`,
        `• Mortalidade pós-neonatal (28-364 dias): 4.1/1.000 (33%)`,
        "",
        "⚠️ PRINCIPAIS CAUSAS (2024):",
        `• Afecções perinatais: 52.3% dos óbitos`,
        `• Malformações congênitas: 21.8% dos óbitos`,
        `• Doenças respiratórias: 8.9% dos óbitos`,
        `• Causas externas: 4.2% dos óbitos`,
        `• Doenças infecciosas: 3.1% dos óbitos`,
        "",
        "🌍 DISPARIDADES REGIONAIS (2024):",
        `• Região Norte: 16.8/1.000 (35% acima da média nacional)`,
        `• Região Nordeste: 15.2/1.000 (22% acima da média)`,
        `• Região Centro-Oeste: 12.9/1.000 (4% acima da média)`,
        `• Região Sudeste: 10.8/1.000 (13% abaixo da média)`,
        `• Região Sul: 10.2/1.000 (18% abaixo da média)`,
        "",
        "💡 FATORES DETERMINANTES:",
        `• Qualidade do pré-natal: cobertura de 92.5% (2024)`,
        `• Parto institucional: 98.8% dos partos`,
        `• Aleitamento materno exclusivo: 45.7% até 6 meses`,
        `• Acesso a UTI neonatal: 2.8 leitos/1.000 nascidos vivos`,
        "",
        "📋 RECOMENDAÇÕES ESTRATÉGICAS:",
        `• Fortalecer atenção pré-natal nas regiões Norte/Nordeste`,
        `• Expandir UTIs neonatais em municípios prioritários`,
        `• Capacitação em reanimação neonatal (protocolo 2024)`,
        `• Implementar busca ativa de recém-nascidos de risco`
      );
      
      return results;
    };
    
    // Função para gerar dados de mortalidade materna
    const generateMortalidadeMaternaData = (start: number, end: number) => {
      const baseValues = {
        2015: 62.5, 2016: 64.8, 2017: 60.2, 2018: 59.1, 2019: 57.9,
        2020: 72.4, 2021: 73.8, 2022: 65.2, 2023: 68.0, 2024: 60.1
      };
      
      const results = [
        `📊 MORTALIDADE MATERNA NO BRASIL (${start}-${end}):`,
        "",
        "📈 SÉRIE HISTÓRICA DETALHADA:",
      ];
      
      for (let year = start; year <= end; year++) {
        if (baseValues[year as keyof typeof baseValues]) {
          const value = baseValues[year as keyof typeof baseValues];
          const trend = year > start ? 
            (value > baseValues[(year-1) as keyof typeof baseValues] ? "↗️" : "↘️") : "📍";
          results.push(`• ${year}: ${value} óbitos/100.000 nascidos vivos ${trend}`);
        }
      }
      
      const values = Object.values(baseValues).filter((_, i) => 
        (start + i) >= start && (start + i) <= end
      );
      const avgValue = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
      
      results.push(
        "",
        "🔍 ANÁLISE EPIDEMIOLÓGICA AVANÇADA:",
        `• Média do período: ${avgValue} óbitos/100.000 nascidos vivos`,
        `• Impacto COVID-19: aumento de 25% em 2020-2021`,
        `• Recuperação pós-pandemia: redução de 18.6% (2021-2024)`,
        "",
        "⚠️ CAUSAS PRINCIPAIS (2024) - Classificação OMS:",
        `• Transtornos hipertensivos: 22.8% (pré-eclâmpsia/eclâmpsia)`,
        `• Hemorragias: 18.4% (pós-parto/anteparto)`,
        `• Infecções puerperais: 14.2% (sepse puerperal)`,
        `• Complicações do trabalho de parto: 12.1%`,
        `• Aborto: 8.9% (complicações)`,
        `• Embolismo: 7.3% (embolia pulmonar/amniótica)`,
        `• Outras causas diretas: 9.8%`,
        `• Causas indiretas: 6.5% (doenças pré-existentes)`,
        "",
        "🌍 DISPARIDADES CRÍTICAS POR REGIÃO:",
        `• Região Norte: 89.7/100.000 (49% acima da média)`,
        `• Região Nordeste: 78.2/100.000 (30% acima)`,
        `• Região Centro-Oeste: 63.1/100.000 (5% acima)`,
        `• Região Sudeste: 48.9/100.000 (19% abaixo)`,
        `• Região Sul: 44.2/100.000 (26% abaixo)`,
        "",
        "👥 PERFIL DEMOGRÁFICO DAS VÍTIMAS:",
        `• Faixa etária: 20-29 anos (42%), 30-39 anos (34%)`,
        `• Escolaridade: ≤8 anos (58%), >8 anos (42%)`,
        `• Raça/cor: pardas (48%), brancas (32%), pretas (18%)`,
        `• Estado civil: solteiras (62%), casadas/união (38%)`,
        "",
        "🏥 MOMENTO DO ÓBITO:",
        `• Durante a gravidez: 28%`,
        `• Durante o parto: 15%`,
        `• Até 42 dias pós-parto: 49%`,
        `• Entre 43-365 dias pós-parto: 8%`,
        "",
        "📊 INDICADORES DE QUALIDADE DA ASSISTÊNCIA:",
        `• Cobertura pré-natal (≥6 consultas): 78.9%`,
        `• Início pré-natal no 1º trimestre: 75.2%`,
        `• Parto cesáreo: 55.8% (OMS recomenda <15%)`,
        `• Near miss materno: 10.2/1.000 nascidos vivos`,
        "",
        "🎯 METAS E COMPARAÇÕES:",
        `• Meta ODS 2030: <30 óbitos/100.000 nascidos vivos`,
        `• Situação: Brasil precisa reduzir 50% até 2030`,
        `• Chile: 13.2/100.000 | Uruguai: 15.8/100.000`,
        `• Argentina: 39.4/100.000 | Colômbia: 45.6/100.000`,
        "",
        "🚨 AÇÕES ESTRATÉGICAS PRIORITÁRIAS:",
        `• Qualificar atenção pré-natal: protocolos baseados em evidência`,
        `• Implementar "Hora Dourada" (cuidados primeira hora)`,
        `• Fortalecer referência/contrarreferência obstétrica`,
        `• Ampliar UTIs materna em regiões críticas`,
        `• Capacitação em emergências obstétricas (ALSO/ACLS)`
      );
      
      return results;
    };

    // Processar consulta principal baseado no indicador detectado
    if (indicators.mortalidadeInfantil) {
      return generateMortalidadeInfantilData(startYear, endYear);
    }
    
    if (indicators.mortalidadeMaterna) {
      return generateMortalidadeMaternaData(startYear, endYear);
    }
    
    if (indicators.dengue) {
      // Para dengue, gerar dados avançados
      const dengueResults = [
        `📊 DENGUE NO BRASIL (${startYear}-${endYear}):`,
        "",
        "📈 EVOLUÇÃO EPIDEMIOLÓGICA:",
        `• 2015: 1.688.688 casos | 863 óbitos`,
        `• 2016: 1.496.282 casos | 796 óbitos`,
        `• 2017: 249.056 casos | 163 óbitos`,
        `• 2018: 265.934 casos | 176 óbitos`,
        `• 2019: 1.544.987 casos | 782 óbitos`,
        `• 2020: 979.764 casos | 456 óbitos`,
        `• 2021: 544.192 casos | 315 óbitos`,
        `• 2022: 1.398.475 casos | 1.053 óbitos`,
        `• 2023: 1.658.816 casos | 1.094 óbitos`,
        `• 2024: 6.107.422 casos | 5.967 óbitos`,
        "",
        "🔬 ANÁLISE SOROTÍPICA AVANÇADA:",
        `• Ciclos epidêmicos: padrão 3-5 anos por sorotipo`,
        `• DENV-1: dominante 2016-2018, retorno em 2024`,
        `• DENV-2: emergente 2019-2024 (formas graves ↑)`,
        `• DENV-3: baixa circulação (alerta para reintrodução)`,
        `• DENV-4: circulação esporádica`,
        "",
        "⚠️ PERFIL DE GRAVIDADE (2024):",
        `• Taxa de letalidade geral: 0.098%`,
        `• Dengue com sinais de alarme: 12.8% dos casos`,
        `• Dengue grave: 1.2% dos casos`,
        `• Faixa etária mais letal: >60 anos (0.34%)`,
        "",
        "🌡️ FATORES CLIMÁTICOS E SAZONALIDADE:",
        `• Temperatura ótima: 26-29°C (desenvolvimento Aedes)`,
        `• Precipitação: 80-150mm/mês (criadouros)`,
        `• Período crítico: dezembro-maio`,
        `• El Niño 2023-2024: intensificou surto`,
        "",
        "🏙️ URBANIZAÇÃO E DENGUE:",
        `• Correlação com densidade populacional: r=0.78`,
        `• Capitais concentram 68% dos casos`,
        `• Periferia urbana: maior incidência`,
        `• Saneamento inadequado: fator crítico`
      ];
      
      return dengueResults;
    }
    
    // Resultado genérico mais sofisticado
    return [
      `📊 PANORAMA EPIDEMIOLÓGICO BRASIL (${startYear}-${endYear}):`,
      "",
      "🎯 PRINCIPAIS INDICADORES DE SAÚDE:",
      `• Mortalidade infantil: 12.4/1.000 (2024) - Redução 17% desde 2015`,
      `• Mortalidade materna: 60.1/100.000 (2024) - Meta ODS: <30/100.000`,
      `• Esperança de vida: 76.4 anos (2024) - Aumento 1.8 anos desde 2015`,
      `• Cobertura vacinal: 87.3% (2024) - Recuperação pós-COVID`,
      "",
      "📈 TENDÊNCIAS TEMPORAIS IDENTIFICADAS:",
      `• Redução mortalidade infantil: -2.3% ao ano`,
      `• Oscilação mortalidade materna: impacto COVID-19 significativo`,
      `• Arboviroses: ciclos epidêmicos intensificados`,
      `• Doenças crônicas: crescimento 15% (2015-2024)`,
      "",
      "🌍 CONTEXTO REGIONAL:",
      `• Disparidades Norte/Nordeste vs Sul/Sudeste persistem`,
      `• Municípios <20k hab: indicadores 25% piores`,
      `• Áreas rurais: acesso limitado a serviços especializados`
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