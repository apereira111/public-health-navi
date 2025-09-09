import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardPanel } from "./DashboardPanel";
import { allPanels } from "@/data/mockdata";
import { HealthDataService } from "@/services/HealthDataService";
import type { PanelData } from "@/types";

export const DashboardSelector = () => {
  const [selectedPanel, setSelectedPanel] = useState<PanelData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Função para carregar dados dinâmicos do painel
  const handlePanelSelect = async (panel: PanelData) => {
    setIsLoading(true);
    try {
      // Mapeia ID do painel para categoria do serviço
      const categoryMap: Record<string, string> = {
        'oral-health': 'oral_health',
        'womens-health': 'womens_health', 
        'mental-health': 'mental_health',
        'chronic-diseases': 'chronic_diseases',
        'epidemiology': 'epidemiology'
      };
      
      const category = categoryMap[panel.id] || 'oral_health';
      const updatedData = await HealthDataService.updatePanelData(category);
      setSelectedPanel(updatedData);
    } catch (error) {
      console.error('Erro ao carregar dados do painel:', error);
      setSelectedPanel(panel); // Fallback para dados originais
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedPanel) {
    return (
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPanel(null)}
              className="mb-4"
            >
              ← Voltar aos Painéis
            </Button>
          </div>
          <DashboardPanel data={selectedPanel} />
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Painéis Disponíveis
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Selecione um Painel
          </h2>
          <p className="text-xl text-muted-foreground">
            Escolha entre os diferentes painéis de saúde pública disponíveis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPanels.map((panel, index) => (
            <Card 
              key={index} 
              className="p-6 shadow-card border-0 cursor-pointer hover:shadow-elevated transition-shadow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {panel.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {panel.description}
                </p>
              </div>
              
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-xs">
                  {panel.kpis?.length || 0} Indicadores
                </Badge>
                <Badge variant="outline" className="text-xs ml-2">
                  {panel.charts?.length || 0} Gráficos
                </Badge>
              </div>

              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => handlePanelSelect(panel)}
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : "Ver Painel"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};