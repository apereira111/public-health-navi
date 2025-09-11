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
      // Encontrar o elemento do relatório
      const reportElement = document.querySelector('[data-report-content]') as HTMLElement;
      if (!reportElement) {
        throw new Error('Elemento do relatório não encontrado');
      }

      // Configurar html2canvas para melhor qualidade
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Aumenta a resolução
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        width: reportElement.scrollWidth,
        height: reportElement.scrollHeight,
        scrollX: 0,
        scrollY: 0
      });

      // Configurar o PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png', 1.0);
      
      // Calcular dimensões para ajustar ao PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calcular proporção para manter aspecto
      const ratio = Math.min(pdfWidth / (imgWidth * 0.264583), pdfHeight / (imgHeight * 0.264583));
      
      const scaledWidth = (imgWidth * 0.264583) * ratio;
      const scaledHeight = (imgHeight * 0.264583) * ratio;
      
      // Centralizar a imagem no PDF
      const xPos = (pdfWidth - scaledWidth) / 2;
      const yPos = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, 'PNG', xPos, yPos, scaledWidth, scaledHeight);
      
      // Salvar o PDF
      const fileName = `Relatorio_${panelData.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF Gerado!",
        description: "Seu relatório foi baixado com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o PDF. Tente novamente.",
        variant: "destructive",
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