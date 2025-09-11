import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, TrendingUp, TrendingDown, Calendar, BarChart3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import type { PanelData } from "@/types";

interface ReportGeneratorProps {
  panelData: PanelData;
}

export const ReportGenerator = ({ panelData }: ReportGeneratorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const generateExecutiveSummary = () => {
    const positiveKpis = panelData.kpis.filter(kpi => kpi.changeType === 'increase').length;
    const totalKpis = panelData.kpis.length;
    const positivePercentage = Math.round((positiveKpis / totalKpis) * 100);

    const scenarioText = positivePercentage > 60 ? 
      'um cenário predominantemente favorável' : 
      positivePercentage > 40 ? 
        'um cenário misto com oportunidades de melhoria' : 
        'desafios significativos que requerem atenção imediata';

    return `Este relatório apresenta uma análise abrangente dos indicadores de ${panelData.title.toLowerCase()}. Dos ${totalKpis} indicadores principais analisados, ${positiveKpis} (${positivePercentage}%) apresentaram tendência positiva no período avaliado. Os dados demonstram ${scenarioText}.`;
  };

  const generateInsights = () => {
    const insights = [];
    
    // Análise dos KPIs
    const bestKpi = panelData.kpis.find(kpi => kpi.changeType === 'increase');
    const worstKpi = panelData.kpis.find(kpi => kpi.changeType === 'decrease');
    
    if (bestKpi) {
      insights.push(`Destaque positivo: ${bestKpi.title} apresentou crescimento de ${bestKpi.change}, indicando ${bestKpi.description.toLowerCase()}.`);
    }
    
    if (worstKpi) {
      insights.push(`Ponto de atenção: ${worstKpi.title} registrou queda de ${worstKpi.change}, sugerindo necessidade de intervenção para ${worstKpi.description.toLowerCase()}.`);
    }

    // Análise dos gráficos
    panelData.charts.forEach((chart) => {
      if (chart.data.length > 0) {
        const maxValue = Math.max(...chart.data.map(d => d.value));
        const maxItem = chart.data.find(d => d.value === maxValue);
        if (maxItem) {
          insights.push(`No ${chart.title}, ${maxItem.name} apresenta o maior valor (${maxValue}), representando o principal foco de atenção desta análise.`);
        }
      }
    });

    return insights;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    const negativeKpis = panelData.kpis.filter(kpi => kpi.changeType === 'decrease');
    const positiveKpis = panelData.kpis.filter(kpi => kpi.changeType === 'increase');

    if (negativeKpis.length > 0) {
      recommendations.push("Implementar plano de ação imediato para os indicadores em queda, com metas específicas e cronograma definido.");
      recommendations.push("Realizar análise detalhada dos fatores contribuintes para as tendências negativas identificadas.");
    }

    if (positiveKpis.length > 0) {
      recommendations.push("Replicar as boas práticas identificadas nos indicadores positivos para outras áreas similares.");
      recommendations.push("Manter monitoramento contínuo dos indicadores em crescimento para sustentar a tendência positiva.");
    }

    recommendations.push("Estabelecer reuniões periódicas de acompanhamento com stakeholders relevantes.");
    recommendations.push("Desenvolver dashboard de acompanhamento em tempo real para tomada de decisão ágil.");

    return recommendations;
  };

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const saveReport = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para salvar relatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      const reportContent = {
        title: panelData.title,
        description: panelData.description,
        date: currentDate,
        executiveSummary: generateExecutiveSummary(),
        insights: generateInsights(),
        recommendations: generateRecommendations(),
        kpis: panelData.kpis
      };

      const { error } = await supabase
        .from('saved_reports')
        .insert({
          user_id: user.id,
          title: `Relatório: ${panelData.title} - ${currentDate}`,
          content: reportContent as any,
          panel_data: panelData as any
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Relatório Salvo!",
        description: "Seu relatório foi salvo com sucesso e está disponível na página de Relatórios.",
      });

      setIsOpen(false);
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o relatório. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadReport = async () => {
    setIsDownloading(true);

    try {
      const reportElement = document.querySelector('[data-report-content]') as HTMLElement;
      if (!reportElement) {
        throw new Error('Elemento do relatório não encontrado');
      }

      // A4 real com margens menores para texto maior
      const A4 = { widthMM: 210, heightMM: 297, marginMM: 10 };
      const contentWidthMM = A4.widthMM - A4.marginMM * 2; // 190mm
      const contentHeightMM = A4.heightMM - A4.marginMM * 2; // 277mm

      // Largura alvo do clone (~190mm em 96DPI)
      const cloneWidthPx = 720;
      const scale = 2; // alta qualidade

      const canvas = await html2canvas(reportElement, {
        scale,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('[data-report-content]') as HTMLElement;
          // CSS global no clone para evitar faixas/gradientes e garantir tipografia legível
          const style = clonedDoc.createElement('style');
          style.textContent = `
            [data-report-content], [data-report-content] * { 
              background: #ffffff !important; 
              box-shadow: none !important; 
              filter: none !important; 
              text-rendering: optimizeLegibility; 
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `;
          clonedDoc.head.appendChild(style);

          if (clonedElement) {
            Object.assign(clonedElement.style, {
              transform: 'none',
              WebkitTransform: 'none',
              position: 'relative',
              overflow: 'visible',
              backgroundColor: '#ffffff',
              fontFamily: 'Arial, sans-serif',
              fontSize: '16px',
              lineHeight: '1.65',
              padding: '24px',
              boxSizing: 'border-box',
              width: `${cloneWidthPx}px`,
              maxWidth: `${cloneWidthPx}px`,
            } as any);
          }
        }
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const xPos = A4.marginMM;
      const yPos = A4.marginMM;

      // mm por pixel baseado na largura alvo (cloneWidthPx) e no scale
      const mmPerPx = contentWidthMM / canvas.width;
      const contentHeightPx = Math.floor(contentHeightMM / mmPerPx);

      const totalPages = Math.ceil(canvas.height / contentHeightPx);
      const overlap = 2; // sobreposição para esconder costuras

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) pdf.addPage();

        const sliceCanvas = document.createElement('canvas');
        const sliceCtx = sliceCanvas.getContext('2d')!;
        sliceCanvas.width = canvas.width;

        const startY = Math.max(0, page * contentHeightPx - (page > 0 ? overlap : 0));
        const sliceHeightPx = Math.min(
          contentHeightPx + (page > 0 ? overlap : 0),
          canvas.height - startY
        );
        sliceCanvas.height = sliceHeightPx;

        // minimizar banding nas fatias
        sliceCtx.imageSmoothingEnabled = false;
        sliceCtx.imageSmoothingQuality = 'high';

        sliceCtx.drawImage(
          canvas,
          0, startY,
          canvas.width, sliceHeightPx,
          0, 0,
          canvas.width, sliceHeightPx
        );

        const imgData = sliceCanvas.toDataURL('image/png', 0.95);
        const sliceHeightMM = sliceCanvas.height * mmPerPx;

        pdf.addImage(imgData, 'PNG', xPos, yPos, contentWidthMM, sliceHeightMM, undefined, 'MEDIUM');
      }

      const fileName = `Relatorio_${panelData.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: 'PDF Gerado com Sucesso!',
        description: 'Seu relatório foi baixado em alta qualidade.',
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível gerar o PDF. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="professional" className="gap-2">
          <FileText className="h-4 w-4" />
          Gerar Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Relatório Executivo - {panelData.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6" data-report-content>
          {/* Header do Relatório */}
          <Card className="p-6 bg-accent/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{panelData.title}</h2>
                <p className="text-muted-foreground">{panelData.description}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  {currentDate}
                </div>
                <Badge variant="secondary" className="gap-1">
                  <BarChart3 className="h-3 w-3" />
                  Relatório Automático
                </Badge>
              </div>
            </div>
          </Card>

          {/* Resumo Executivo */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Resumo Executivo
            </h3>
            <p className="text-foreground leading-relaxed">
              {generateExecutiveSummary()}
            </p>
          </Card>

          {/* Indicadores Principais */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Indicadores Principais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {panelData.kpis.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    {kpi.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 text-primary" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{kpi.title}</p>
                      <p className="text-sm text-muted-foreground">{kpi.value}</p>
                    </div>
                  </div>
                  <Badge variant={kpi.changeType === 'increase' ? "secondary" : "destructive"}>
                    {kpi.change}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Insights e Análises */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Insights e Análises</h3>
            <div className="space-y-3">
              {generateInsights().map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recomendações */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recomendações</h3>
            <div className="space-y-3">
              {generateRecommendations().map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Ações */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              onClick={saveReport}
              disabled={isSaving || !user}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Salvando..." : "Salvar Relatório"}
            </Button>
            <Button 
              onClick={downloadReport}
              disabled={isDownloading}
              variant="professional" 
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {isDownloading ? "Gerando PDF..." : "Baixar Relatório"}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};