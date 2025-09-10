import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Sparkles, Calendar, TrendingUp } from "lucide-react";
import { HealthReport } from "./HealthReport";

const reportTemplates = [
  {
    title: "Resumo Mensal de Saúde",
    description: "Visão abrangente dos principais indicadores de saúde com análise de tendências",
    type: "Resumo Executivo",
    frequency: "Mensal",
    icon: Calendar,
  },
  {
    title: "Relatório de Saúde Materna",
    description: "Análise detalhada da mortalidade materna, cuidados pré-natais e resultados de nascimento",
    type: "Relatório Especializado",
    frequency: "Trimestral",
    icon: FileText,
  },
  {
    title: "Relatório de Vigilância de Doenças",
    description: "Rastreamento em tempo real de doenças infecciosas e padrões de surtos",
    type: "Vigilância",
    frequency: "Semanal",
    icon: TrendingUp,
  },
];

export const Reports = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<{query: string, results: string[], timestamp: string} | null>(null);

  const generateReportData = (templateTitle: string) => {
    const timestamp = new Date().toISOString();
    
    if (templateTitle === "Relatório de Saúde Materna") {
      return {
        query: "Relatório detalhado sobre mortalidade materna e cuidados pré-natais no Brasil em 2024",
        results: [
          "📊 MORTALIDADE MATERNA NO BRASIL - 2024:",
          "",
          "• Taxa atual: 60 óbitos por 100.000 nascidos vivos",
          "• Meta ODS 2030: 30 óbitos por 100.000 nascidos vivos",
          "• Situação: 100% acima da meta estabelecida",
          "",
          "🏥 PRINCIPAIS CAUSAS DE MORTALIDADE MATERNA:",
          "• Hipertensão arterial: 37% dos casos",
          "• Hemorragia obstétrica: 11% dos casos", 
          "• Infecção puerperal: 8% dos casos",
          "• Embolia: 6% dos casos",
          "",
          "📈 EVOLUÇÃO TEMPORAL:",
          "• 2023: 68 óbitos/100.000 nascidos vivos",
          "• 2024: 60 óbitos/100.000 nascidos vivos",
          "• Redução: 12% em relação ao ano anterior",
          "",
          "🗺️ DISTRIBUIÇÃO REGIONAL:",
          "• Região Norte: 89 óbitos/100.000 (mais crítica)",
          "• Região Nordeste: 71 óbitos/100.000",
          "• Região Sul: 45 óbitos/100.000 (melhor índice)",
          "",
          "🤱 CUIDADOS PRÉ-NATAIS:",
          "• Cobertura nacional: 89.2% das gestantes",
          "• Meta recomendada: 95% de cobertura",
          "• Consultas adequadas (≥6): 78% das gestantes"
        ],
        timestamp
      };
    } else if (templateTitle === "Resumo Mensal de Saúde") {
      return {
        query: "Resumo executivo dos principais indicadores de saúde do Brasil - Dezembro 2024",
        results: [
          "📊 RESUMO EXECUTIVO - DEZEMBRO 2024:",
          "",
          "🔴 INDICADORES CRÍTICOS:",
          "• Mortalidade materna: 60/100.000 (meta: 30/100.000)",
          "• Mortalidade infantil: 12.4/1.000 (meta: 8.5/1.000)",
          "• Casos de dengue: 6.1 milhões (aumento de 180%)",
          "",
          "🟡 INDICADORES DE ATENÇÃO:",
          "• Cobertura vacinal: 87.3% (meta: 95%)",
          "• Cobertura pré-natal: 89.2% (meta: 95%)",
          "• Casos de tuberculose: estável (44/100.000)",
          "",
          "🟢 INDICADORES POSITIVOS:",
          "• Redução de 12% na mortalidade materna",
          "• Redução de 8% na mortalidade infantil",
          "• Aumento de 15% na cobertura de ESF rural",
          "",
          "📈 TENDÊNCIAS DO ANO:",
          "• Melhoria geral nos indicadores materno-infantis",
          "• Desafios persistentes em doenças infecciosas",
          "• Necessidade de fortalecimento da vigilância epidemiológica"
        ],
        timestamp
      };
    } else if (templateTitle === "Relatório de Vigilância de Doenças") {
      return {
        query: "Relatório de vigilância epidemiológica - Doenças infecciosas Brasil 2024",
        results: [
          "🦠 VIGILÂNCIA EPIDEMIOLÓGICA - SEMANA 50/2024:",
          "",
          "🔴 ALERTAS CRÍTICOS:",
          "• Dengue: 6.1 milhões de casos (+180% vs 2023)",
          "• Chikungunya: 315.000 casos (+45% vs 2023)",
          "• Zika: 12.500 casos (estável)",
          "",
          "📍 DISTRIBUIÇÃO GEOGRÁFICA - DENGUE:",
          "• Minas Gerais: 1.8 milhões de casos",
          "• São Paulo: 1.2 milhões de casos",
          "• Paraná: 890.000 casos",
          "• Santa Catarina: 650.000 casos",
          "",
          "🧬 SOROTIPOS CIRCULANTES:",
          "• DENV-2: 67% dos casos (predominante)",
          "• DENV-1: 28% dos casos",
          "• DENV-3: 4% dos casos",  
          "• DENV-4: 1% dos casos",
          "",
          "☠️ LETALIDADE:",
          "• Dengue: 5.967 óbitos confirmados",
          "• Taxa de letalidade: 0.1%",
          "• Grupos de risco: >60 anos, gestantes, imunossuprimidos",
          "",
          "📊 OUTRAS DOENÇAS DE NOTIFICAÇÃO:",
          "• COVID-19: tendência decrescente",
          "• Influenza: sazonalidade normal",
          "• Febre amarela: sem casos urbanos"
        ],
        timestamp
      };
    }
    
    return null;
  };

  const handleGenerateReport = (templateTitle: string) => {
    const data = generateReportData(templateTitle);
    if (data) {
      setReportData(data);
      setShowReport(true);
    }
  };
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-light text-accent font-medium px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            Relatórios Gerados por IA
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Geração Automatizada de Relatórios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Gere relatórios profissionais de saúde com análises, insights e recomendações da IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {reportTemplates.map((template, index) => {
            const Icon = template.icon;
            return (
              <Card key={index} className="p-6 shadow-card border-0 hover:shadow-elevated transition-all duration-300 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {template.frequency}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {template.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Badge variant="outline" className="mb-4">
                      {template.type}
                    </Badge>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                    onClick={() => handleGenerateReport(template.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Sample Report Preview */}
        <Card className="p-8 shadow-elevated border-0 bg-gradient-subtle">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Exemplo de Relatório Gerado por IA
            </h3>
            <p className="text-muted-foreground">
              Prévia de um resumo mensal automatizado de saúde
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-card">
            <div className="border-l-4 border-primary pl-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Resumo Executivo - Outubro 2024
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Os dados de saúde deste mês mostram melhorias significativas nos resultados de saúde materna, 
                com uma redução de 12,5% nas taxas de mortalidade materna em comparação ao mesmo período do ano passado. 
                Os principais fatores que contribuíram para essa melhoria incluem aumento da cobertura de cuidados pré-natais 
                e melhoria dos serviços de obstetrícia de emergência.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="font-semibold text-foreground mb-3">Principais Conquistas</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Mortalidade materna reduzida em 12,5%
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Cobertura de cuidados pré-natais aumentou para 89,2%
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    Taxas de vacinação melhoraram em 2,3%
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-semibold text-foreground mb-3">Recomendações</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Expandir programas de cuidados pré-natais rurais
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Aumentar financiamento de transporte de emergência
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    Melhorar treinamento de agentes comunitários de saúde
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {showReport && reportData && (
        <HealthReport 
          data={reportData} 
          onClose={() => setShowReport(false)} 
        />
      )}
    </section>
  );
};