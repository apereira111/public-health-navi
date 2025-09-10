import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Sparkles, Calendar, TrendingUp, Heart, Baby, Users, Stethoscope, Brain, Shield, Activity } from "lucide-react";
import { HealthReport } from "./HealthReport";
import { allPanels } from "@/data/mockdata";

// Gerar templates baseados nos painéis disponíveis
const generateReportTemplates = () => {
  const iconMap: Record<string, any> = {
    "primary-care": Stethoscope,
    "financing": TrendingUp,
    "child-health": Baby,
    "womens-health": Heart,
    "epidemiology": Shield,
    "chronic-diseases": Activity,
    "oral-health": FileText,
    "elderly-health": Users,
    "mental-health": Brain
  };

  const frequencyMap: Record<string, string> = {
    "primary-care": "Mensal",
    "financing": "Trimestral", 
    "child-health": "Mensal",
    "womens-health": "Trimestral",
    "epidemiology": "Semanal",
    "chronic-diseases": "Mensal",
    "oral-health": "Trimestral",
    "elderly-health": "Mensal",
    "mental-health": "Trimestral"
  };

  return allPanels.map(panel => ({
    title: `Relatório de ${panel.title}`,
    description: `${panel.description} Análise comparativa 2023-2024 com recomendações.`,
    type: "Relatório Especializado",
    frequency: frequencyMap[panel.id || ""] || "Mensal",
    icon: iconMap[panel.id || ""] || FileText,
    panelId: panel.id
  }));
};

const reportTemplates = [
  {
    title: "Resumo Executivo Geral",
    description: "Visão abrangente de todos os indicadores de saúde com análise comparativa 2023-2024",
    type: "Resumo Executivo",
    frequency: "Mensal",
    icon: Calendar,
    panelId: "general"
  },
  ...generateReportTemplates()
];

export const Reports = () => {
  const [showReport, setShowReport] = useState(false);
  const [reportData, setReportData] = useState<{query: string, results: string[], timestamp: string} | null>(null);

  const generateReportData = (templateTitle: string, panelId?: string) => {
    const timestamp = new Date().toISOString();
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    
    if (templateTitle === "Resumo Executivo Geral") {
      return {
        query: `Resumo executivo geral dos indicadores de saúde do Brasil - ${currentYear}`,
        results: [
          `📊 RESUMO EXECUTIVO GERAL - ${currentYear}:`,
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
          `📈 ANÁLISE COMPARATIVA ${previousYear}-${currentYear}:`,
          "• Melhoria geral nos indicadores materno-infantis",
          "• Desafios persistentes em doenças infecciosas",
          "• Fortalecimento necessário da vigilância epidemiológica",
          "",
          "🎯 RECOMENDAÇÕES PRIORITÁRIAS:",
          "• Intensificar controle vetorial da dengue",
          "• Expandir cobertura de ESF em áreas rurais",
          "• Melhorar qualidade do pré-natal",
          "• Fortalecer rede de urgência obstétrica"
        ],
        timestamp
      };
    }
    
    // Gerar relatórios específicos por painel
    const panel = allPanels.find(p => p.id === panelId);
    if (panel) {
      return {
        query: `Relatório detalhado de ${panel.title} - Análise comparativa ${previousYear}-${currentYear}`,
        results: [
          `📊 RELATÓRIO DE ${panel.title.toUpperCase()} - ${currentYear}:`,
          "",
          `📋 DESCRIÇÃO: ${panel.description}`,
          "",
          "🔢 INDICADORES PRINCIPAIS:",
          ...panel.kpis.slice(0, 4).map(kpi => 
            `• ${kpi.title}: ${kpi.value} (${kpi.change} vs ${previousYear})`
          ),
          "",
          `📈 ANÁLISE COMPARATIVA ${previousYear}-${currentYear}:`,
          `• Tendência geral: ${panel.kpis.filter(k => k.changeType === 'increase').length > panel.kpis.filter(k => k.changeType === 'decrease').length ? 'Melhoria' : 'Estável'}`,
          `• Indicadores em alta: ${panel.kpis.filter(k => k.changeType === 'increase').length}`,
          `• Indicadores em queda: ${panel.kpis.filter(k => k.changeType === 'decrease').length}`,
          "",
          "🎯 DESTAQUES DO PERÍODO:",
          ...panel.kpis.slice(0, 3).map(kpi => 
            `• ${kpi.description}`
          ),
          "",
          "🔍 ANÁLISE CRÍTICA:",
          `• O setor de ${panel.title.toLowerCase()} apresenta ${panel.kpis.filter(k => k.changeType === 'increase').length > 2 ? 'evolução positiva' : 'desafios significativos'}`,
          `• Necessário monitoramento contínuo dos indicadores críticos`,
          `• Recomenda-se investimento em áreas com performance inferior`,
          "",
          "📊 DADOS DOS GRÁFICOS:",
          ...panel.charts.map(chart => 
            `• ${chart.title}: ${chart.data.length} categorias analisadas`
          ),
          "",
          "🎯 RECOMENDAÇÕES ESTRATÉGICAS:",
          `• Fortalecer monitoramento dos indicadores de ${panel.title.toLowerCase()}`,
          `• Implementar melhorias nos processos com performance inferior`,
          `• Manter investimentos nas áreas com bom desempenho`,
          `• Estabelecer metas claras para o próximo período`
        ],
        timestamp
      };
    }
    
    return null;
  };

  const handleGenerateReport = (templateTitle: string, panelId?: string) => {
    const data = generateReportData(templateTitle, panelId);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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
                    onClick={() => handleGenerateReport(template.title, template.panelId)}
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