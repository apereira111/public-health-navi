import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Sparkles, Calendar, TrendingUp } from "lucide-react";

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
                    onClick={() => {
                      // TODO: Implement report generation
                      alert(`Gerando ${template.title}... Esta funcionalidade será implementada em breve!`);
                    }}
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
    </section>
  );
};