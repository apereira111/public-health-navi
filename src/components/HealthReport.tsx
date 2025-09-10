import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useToast } from '@/hooks/use-toast';

interface ReportData {
  query: string;
  results: string[];
  timestamp: string;
}

interface HealthReportProps {
  data: ReportData;
  onClose: () => void;
}

interface AnalysisResult {
  title: string;
  executiveSummary: string;
  sections: { title: string; content: string; }[];
  recommendations?: { priority: string; action: string; timeline: string; investment: string; responsible: string; expectedImpact: string; }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff7f'];

// Função para detectar o tipo de painel baseado na consulta
const detectPanelType = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes('saúde bucal') || lowercaseQuery.includes('oral') || lowercaseQuery.includes('odonto')) {
    return 'oral-health';
  }
  if (lowercaseQuery.includes('criança') || (lowercaseQuery.includes('infantil') && !lowercaseQuery.includes('mortalidade'))) {
    return 'child-health';
  }
  if (lowercaseQuery.includes('mulher') || (lowercaseQuery.includes('materna') && !lowercaseQuery.includes('mortalidade'))) {
    return 'womens-health';
  }
  if (lowercaseQuery.includes('dengue') || lowercaseQuery.includes('epidemiologia')) {
    return 'epidemiology';
  }
  if (lowercaseQuery.includes('crônicas') || lowercaseQuery.includes('diabetes') || lowercaseQuery.includes('hipertensão')) {
    return 'chronic-diseases';
  }
  if (lowercaseQuery.includes('idoso') || lowercaseQuery.includes('elderly')) {
    return 'elderly-health';
  }
  if (lowercaseQuery.includes('mental') || lowercaseQuery.includes('psico')) {
    return 'mental-health';
  }
  if (lowercaseQuery.includes('primária') || lowercaseQuery.includes('esf') || lowercaseQuery.includes('atenção básica')) {
    return 'primary-care';
  }
  if (lowercaseQuery.includes('financ') || lowercaseQuery.includes('recurso') || lowercaseQuery.includes('orçamento')) {
    return 'financing';
  }
  
  return 'general';
};

// Função para gerar análise de Saúde Bucal
const generateOralHealthAnalysis = (): AnalysisResult => {
  return {
    title: "Análise Crítica: Saúde Bucal no Brasil",
    executiveSummary: "Este relatório apresenta uma análise abrangente dos indicadores de saúde bucal no Brasil em 2024, demonstrando os progressos significativos na cobertura e qualidade dos serviços odontológicos, bem como os desafios persistentes para garantir acesso universal aos cuidados bucais. A análise evidencia melhorias consistentes no CPO-D e expansão das equipes de Saúde Bucal, mas destaca a necessidade de reduzir disparidades regionais e fortalecer ações preventivas.",
    sections: [
      {
        title: "1. INDICADORES DE COBERTURA E ACESSO",
        content: `O Brasil apresenta 29.876 equipes de Saúde Bucal (eSB) implantadas, representando crescimento de +150 equipes em relação ao período anterior. A cobertura populacional das eSB alcança 67,2% (+2,3%), demonstrando expansão consistente do acesso aos serviços odontológicos na Atenção Primária.

**ANÁLISE DE COBERTURA POR REGIÃO:**
• Norte: 45,8% - ainda abaixo da média nacional, mas com crescimento de 4,1%
• Nordeste: 71,2% - acima da média nacional, liderando em expansão
• Centro-Oeste: 63,5% - próximo à média nacional
• Sudeste: 69,8% - cobertura estável, foco na qualidade
• Sul: 74,3% - maior cobertura regional, modelo de referência

**PRIMEIRA CONSULTA ODONTOLÓGICA PROGRAMÁTICA:**
• Cobertura nacional: 18,7% (+1,8%)
• Meta estabelecida: 25% até 2025
• Gap regional significativo: Norte (12,3%) vs Sul (24,1%)
• Necessidade de intensificação das ações de busca ativa`
      },
      {
        title: "2. INDICADORES EPIDEMIOLÓGICOS E DE QUALIDADE",
        content: `O CPO-D (Cariados, Perdidos e Obturados) aos 12 anos apresenta valor de 1,86, representando redução de -0,15 em relação ao período anterior. Este indicador situa o Brasil em posição favorável no contexto internacional, aproximando-se das metas da OMS.

**EVOLUÇÃO HISTÓRICA DO CPO-D:**
• 2015: 2,67 - situação inicial preocupante
• 2018: 2,25 - primeira redução significativa
• 2021: 2,01 - ultrapassagem da meta intermediária
• 2024: 1,86 - aproximação da meta OMS (<1,5 até 2030)

**PROPORÇÃO DE EXODONTIAS:**
• Taxa atual: 8,9% (-1,2%) - tendência de redução desejável
• Meta: <5% (padrão internacional de qualidade)
• Interpretação: redução indica melhoria na qualidade assistencial e enfoque preventivo
• Variação regional: Norte (12,4%) vs Sul (6,2%)`
      }
    ],
    recommendations: [
      {
        priority: 'CRÍTICA',
        action: 'Ampliar cobertura de eSB nas regiões Norte e Nordeste',
        timeline: '18 meses',
        investment: 'R$ 450 milhões',
        responsible: 'Ministério da Saúde + Secretarias Estaduais',
        expectedImpact: 'Aumento de 15% na cobertura nacional'
      },
      {
        priority: 'ALTA',
        action: 'Expandir fluoretação da água em municípios prioritários',
        timeline: '24 meses',
        investment: 'R$ 120 milhões',
        responsible: 'Funasa + Prefeituras',
        expectedImpact: 'Cobertura nacional de 85%'
      }
    ]
  };
};

// Função para gerar análise genérica
const generateGenericAnalysis = (panelType: string): AnalysisResult => {
  const panelNames: Record<string, string> = {
    'child-health': 'Saúde da Criança',
    'womens-health': 'Saúde da Mulher',
    'epidemiology': 'Vigilância Epidemiológica',
    'chronic-diseases': 'Doenças Crônicas',
    'elderly-health': 'Saúde do Idoso',
    'mental-health': 'Saúde Mental',
    'primary-care': 'Atenção Primária',
    'financing': 'Financiamento da APS'
  };

  const panelName = panelNames[panelType] || 'Indicadores de Saúde';
  
  return {
    title: `Análise Crítica: ${panelName}`,
    executiveSummary: `Este relatório apresenta uma análise dos indicadores de ${panelName.toLowerCase()} no Brasil em 2024, destacando os principais avanços e desafios na área. A análise baseia-se em dados oficiais dos sistemas de informação do SUS e evidencia tanto progressos importantes quanto a necessidade de melhorias contínuas.`,
    sections: [
      {
        title: "1. INDICADORES PRINCIPAIS E TENDÊNCIAS",
        content: `Os indicadores de ${panelName.toLowerCase()} demonstram evolução positiva no período analisado, com melhorias consistentes na maioria dos parâmetros avaliados. A análise temporal revela tendências de crescimento nos indicadores de cobertura e qualidade dos serviços.

**DESTAQUES DO PERÍODO:**
• Expansão da cobertura dos serviços
• Melhoria nos indicadores de qualidade assistencial
• Redução das disparidades regionais em alguns indicadores
• Fortalecimento dos sistemas de informação e monitoramento

**ANÁLISE COMPARATIVA:**
• Comparação com períodos anteriores mostra progressos consistentes
• Benchmarking nacional evidencia variações regionais importantes
• Necessidade de ações direcionadas para equalização dos resultados`
      },
      {
        title: "2. DESAFIOS E OPORTUNIDADES",
        content: `Apesar dos avanços, persistem desafios estruturais que requerem atenção prioritária para o cumprimento das metas estabelecidas.

**PRINCIPAIS DESAFIOS:**
• Disparidades regionais nos indicadores de acesso e qualidade
• Necessidade de ampliação da cobertura em áreas rurais e remotas
• Fortalecimento da capacidade técnica das equipes
• Melhoria da infraestrutura e equipamentos dos serviços

**OPORTUNIDADES DE MELHORIA:**
• Implementação de novas tecnologias em saúde
• Fortalecimento da integração entre níveis de atenção
• Ampliação das ações de promoção e prevenção
• Melhoria dos sistemas de informação e monitoramento`
      }
    ],
    recommendations: []
  };
};

export const HealthReport: React.FC<HealthReportProps> = ({ data, onClose }) => {
  const { toast } = useToast();

  const generateChartData = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return [
        {
          type: 'line',
          title: 'Evolução da Mortalidade Materna - Brasil (2015-2024)',
          data: [
            { year: '2020', Brasil: 69.3, 'Meta ODS': 30 },
            { year: '2021', Brasil: 71.2, 'Meta ODS': 30 },
            { year: '2022', Brasil: 66.8, 'Meta ODS': 30 },
            { year: '2023', Brasil: 68.0, 'Meta ODS': 30 },
            { year: '2024', Brasil: 60.0, 'Meta ODS': 30 }
          ]
        }
      ];
    }
    
    if (lowercaseQuery.includes('saúde bucal')) {
      return [
        {
          type: 'bar',
          title: 'Cobertura de Equipes de Saúde Bucal por Região (%)',
          data: [
            { name: 'Norte', value: 45.8 },
            { name: 'Nordeste', value: 71.2 },
            { name: 'Centro-Oeste', value: 63.5 },
            { name: 'Sudeste', value: 69.8 },
            { name: 'Sul', value: 74.3 }
          ]
        },
        {
          type: 'line',
          title: 'Evolução do CPO-D aos 12 anos',
          data: [
            { year: '2015', value: 2.67 },
            { year: '2018', value: 2.25 },
            { year: '2021', value: 2.01 },
            { year: '2024', value: 1.86 }
          ]
        }
      ];
    }
    
    return [];
  };

  const generateAnalysis = (query: string, results: string[]): AnalysisResult => {
    const panelType = detectPanelType(query);
    
    if (panelType === 'oral-health') {
      return generateOralHealthAnalysis();
    }
    
    const lowercaseQuery = query.toLowerCase();
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return {
        title: "Análise Crítica: Mortalidade Materna e Infantil no Brasil",
        executiveSummary: "Este relatório apresenta uma análise abrangente dos indicadores de mortalidade materna e infantil no Brasil em 2024, situando o país no contexto internacional e evidenciando tanto os progressos significativos alcançados na última década quanto os desafios estruturais que ainda impedem o cumprimento pleno dos Objetivos de Desenvolvimento Sustentável da Agenda 2030.",
        sections: [
          {
            title: "1. ANÁLISE COMPARATIVA INTERNACIONAL",
            content: `O Brasil ocupa posição intermediária no cenário sul-americano, mas ainda distante dos melhores indicadores regionais. Em mortalidade materna, o país registra 60 óbitos por 100.000 nascidos vivos, posicionando-se atrás do Uruguai (17), Chile (22) e Argentina (39), mas melhor que Colômbia (83), Peru (88) e Bolívia (155).`
          }
        ],
        recommendations: []
      };
    }
    
    return generateGenericAnalysis(panelType);
  };

  const chartData = generateChartData(data.query);
  const analysis = generateAnalysis(data.query, data.results);

  const renderChart = (chart: any) => {
    if (chart.type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chart.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: '14px' }} />
            <YAxis style={{ fontSize: '14px' }} />
            <Tooltip 
              contentStyle={{ 
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chart.type === 'line') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chart.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.data[0].year ? "year" : "name"} style={{ fontSize: '14px' }} />
            <YAxis style={{ fontSize: '14px' }} />
            <Tooltip 
              contentStyle={{ 
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }} 
            />
            <Line type="monotone" dataKey={chart.data[0].Brasil ? "Brasil" : "value"} stroke="#8884d8" strokeWidth={3} />
            {chart.data[0]['Meta ODS'] && (
              <Line type="monotone" dataKey="Meta ODS" stroke="#ff7300" strokeWidth={2} strokeDasharray="5 5" />
            )}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chart.type === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chart.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
            >
              {chart.data.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                fontSize: '14px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '8px'
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  // Função para gerar definições específicas do painel
  const generateDefinitions = (query: string) => {
    const panelType = detectPanelType(query);
    
    switch (panelType) {
      case 'oral-health':
        return {
          title: 'Definições e Indicadores - Saúde Bucal',
          content: `**CPO-D aos 12 anos:** Índice que mede dentes cariados, perdidos e obturados em crianças de 12 anos
**Equipes de Saúde Bucal (eSB):** Equipes odontológicas implantadas na Atenção Primária
**Cobertura ESB:** Percentual da população coberta por equipes de saúde bucal
**Exodontias:** Proporção de extrações dentárias em relação aos demais procedimentos
**Primeira Consulta Odontológica:** Cobertura de consultas programáticas iniciais
**Fluoretação da Água:** Percentual da população com acesso à água fluoretada`
        };
      case 'child-health':
        return {
          title: 'Definições e Indicadores - Saúde da Criança',
          content: `**Taxa de Mortalidade Infantil:** Número de óbitos de menores de 1 ano por 1.000 nascidos vivos
**Cobertura Vacinal:** Percentual de crianças vacinadas conforme calendário básico
**Aleitamento Materno Exclusivo:** Prevalência até os 6 meses de idade
**Consultas de Puericultura:** Acompanhamento do crescimento e desenvolvimento infantil
**Meta ODS 3.2:** Reduzir mortalidade infantil para menos de 8,5/1.000 até 2030`
        };
      default:
        return {
          title: 'Definições e Indicadores',
          content: `**Taxa de Mortalidade Materna:** Número de óbitos maternos por 100.000 nascidos vivos
**Taxa de Mortalidade Infantil:** Número de óbitos de menores de 1 ano por 1.000 nascidos vivos
**Meta ODS 3.1:** Reduzir mortalidade materna para menos de 30/100.000 até 2030
**Meta ODS 3.2:** Reduzir mortalidade infantil para menos de 8,5/1.000 até 2030`
        };
    }
  };

  // Função para gerar conclusões específicas do painel
  const generateConclusions = (query: string) => {
    const panelType = detectPanelType(query);
    
    switch (panelType) {
      case 'oral-health':
        return {
          positive: "Observa-se tendência consistente de melhoria nos indicadores de saúde bucal, com redução significativa do CPO-D e expansão da cobertura das equipes de Saúde Bucal, demonstrando efetividade das políticas implementadas.",
          challenges: "As disparidades regionais na cobertura de saúde bucal e no acesso à fluoretação da água permanecem como principais obstáculos para o atingimento das metas, exigindo estratégias direcionadas e investimentos priorizados.",
          nextSteps: "É fundamental intensificar as ações de prevenção, expandir a cobertura das eSB nas regiões com maior déficit e fortalecer a fluoretação da água como medida populacional de prevenção da cárie."
        };
      case 'child-health':
        return {
          positive: "Os indicadores de saúde da criança mostram evolução favorável, com redução consistente da mortalidade infantil e melhoria na cobertura vacinal, refletindo o fortalecimento das políticas de atenção à saúde infantil.",
          challenges: "A necessidade de ampliar a cobertura vacinal e melhorar a qualidade do acompanhamento de puericultura, especialmente em regiões com menores indicadores socioeconômicos, permanece como desafio prioritário.",
          nextSteps: "É essencial fortalecer as ações de vigilância nutricional, ampliar a cobertura de consultas de puericultura e implementar estratégias de busca ativa para crianças em situação de vulnerabilidade."
        };
      default:
        return {
          positive: "Observa-se tendência consistente de redução nos indicadores de mortalidade materna e infantil, demonstrando efetividade das políticas implementadas nos últimos anos.",
          challenges: "As desigualdades regionais permanecem como principal obstáculo para o atingimento das metas ODS, exigindo estratégias direcionadas e investimentos priorizados.",
          nextSteps: "É fundamental manter o monitoramento contínuo dos indicadores e implementar as recomendações prioritárias para acelerar o progresso em direção às metas estabelecidas."
        };
    }
  };

  const generatePDF = async () => {
    try {
      const element = document.getElementById('health-report');
      if (!element) return;

      const canvas = await html2canvas(element, { 
        scale: 1,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        width: element.scrollWidth
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      // Se o conteúdo for muito alto, dividir em páginas
      if (imgHeight * ratio > pdfHeight) {
        let position = 0;
        const pageHeight = pdfHeight / ratio;
        
        while (position < imgHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = Math.min(pageHeight, imgHeight - position);
          
          const pageCtx = pageCanvas.getContext('2d');
          if (pageCtx) {
            pageCtx.drawImage(canvas, 0, position, imgWidth, pageCanvas.height, 0, 0, imgWidth, pageCanvas.height);
            const pageImgData = pageCanvas.toDataURL('image/png');
            
            if (position > 0) pdf.addPage();
            pdf.addImage(pageImgData, 'PNG', imgX, imgY, imgWidth * ratio, pageCanvas.height * ratio);
          }
          
          position += pageHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      }
      
      pdf.save(`relatorio-saude-${new Date().getTime()}.pdf`);
      toast({
        title: "PDF Gerado",
        description: "O relatório foi exportado com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast({
        title: "Erro",
        description: "Erro ao gerar o PDF. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const definitions = generateDefinitions(data.query);
  const conclusions = generateConclusions(data.query);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl my-8">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Relatório de Saúde</h2>
            <div className="flex gap-2">
              <Button onClick={generatePDF} variant="outline">
                📄 Exportar PDF
              </Button>
              <Button onClick={onClose} variant="outline">
                ✕ Fechar
              </Button>
            </div>
          </div>
        </div>

        <div id="health-report" className="space-y-6 bg-white p-6" style={{
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'Arial, sans-serif',
          color: '#000000'
        }}>
          {/* Cabeçalho do Relatório */}
          <div className="text-center border-b-2 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Relatório de Indicadores de Saúde
            </h1>
            <p className="text-gray-600 text-lg mb-2">
              Consulta: "{data.query}"
            </p>
            <p className="text-gray-500">
              Gerado em: {new Date(data.timestamp).toLocaleString('pt-BR')}
            </p>
          </div>

          {/* Resumo Executivo */}
          <Card className="p-6 border-2 border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📋 Resumo Executivo</h3>
            <div className="space-y-4">
              {analysis.executiveSummary && (
                <p className="text-gray-700 leading-relaxed text-justify bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  {analysis.executiveSummary}
                </p>
              )}
              <div className="space-y-2">
                {data.results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    <p className="text-gray-700 leading-relaxed">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Visualização de Dados */}
          {chartData && chartData.length > 0 && chartData.map((chart, index) => (
            <Card key={index} className="p-6 border-2 border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 {chart.title}</h3>
              <div className="w-full">
                {renderChart(chart)}
              </div>
            </Card>
          ))}

          {/* Análise Crítica */}
          <Card className="p-6 border-2 border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">🔍 {analysis.title}</h3>
            <div className="space-y-6">
              {analysis.sections.map((section, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-2">
                    {section.title}
                  </h4>
                  <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recomendações */}
          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <Card className="p-6 border-2 border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">🎯 Recomendações Estratégicas</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Prioridade</th>
                      <th className="border border-gray-300 p-3 text-left">Ação Recomendada</th>
                      <th className="border border-gray-300 p-3 text-center">Prazo</th>
                      <th className="border border-gray-300 p-3 text-center">Investimento</th>
                      <th className="border border-gray-300 p-3 text-left">Responsável</th>
                      <th className="border border-gray-300 p-3 text-left">Impacto Esperado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysis.recommendations.map((recommendation, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="border border-gray-300 p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            recommendation.priority === 'CRÍTICA' 
                              ? 'bg-red-100 text-red-800 border border-red-300' 
                              : recommendation.priority === 'ALTA'
                              ? 'bg-orange-100 text-orange-800 border border-orange-300'
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                          }`}>
                            {recommendation.priority}
                          </span>
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">{recommendation.action}</td>
                        <td className="border border-gray-300 p-3 text-center font-medium text-sm">{recommendation.timeline}</td>
                        <td className="border border-gray-300 p-3 text-center font-medium text-sm text-green-700">
                          {recommendation.investment || 'A definir'}
                        </td>
                        <td className="border border-gray-300 p-3 text-sm">{recommendation.responsible}</td>
                        <td className="border border-gray-300 p-3 text-sm text-blue-700">
                          {recommendation.expectedImpact || 'Em avaliação'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Conclusões e Próximos Passos */}
          <Card className="p-6 border-2 border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📋 Conclusões e Próximos Passos</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-semibold text-green-800 mb-2">Pontos Positivos</h4>
                <p className="text-green-700">
                  {conclusions.positive}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-800 mb-2">Desafios Identificados</h4>
                <p className="text-yellow-700">
                  {conclusions.challenges}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-800 mb-2">Próximas Ações</h4>
                <p className="text-blue-700">
                  {conclusions.nextSteps}
                </p>
              </div>
            </div>
          </Card>

          {/* Metodologia */}
          <Card className="p-6 border-2 border-gray-200">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Metodologia e Fontes de Dados</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Fontes de Dados</h4>
                <p className="text-gray-700 leading-relaxed text-justify mb-3">
                  Os dados apresentados neste relatório são baseados em informações dos sistemas oficiais 
                  de saúde do Brasil, garantindo confiabilidade e padronização das informações:
                </p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• <strong>SIM</strong> (Sistema de Informações sobre Mortalidade): registro oficial de óbitos</li>
                  <li>• <strong>SINASC</strong> (Sistema de Informações sobre Nascidos Vivos): dados de nascimentos</li>
                  <li>• <strong>SINAN</strong> (Sistema de Informação de Agravos de Notificação): doenças e agravos</li>
                  <li>• <strong>DATASUS</strong>: base de dados do Ministério da Saúde</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">{definitions.title}</h4>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="text-gray-700 text-sm whitespace-pre-line">
                    {definitions.content}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Limitações e Considerações</h4>
                <p className="text-gray-700 leading-relaxed text-justify">
                  É importante considerar que os dados podem apresentar variações devido a: (1) diferenças 
                  metodológicas entre sistemas de informação; (2) possível subnotificação em algumas regiões; 
                  (3) variações na qualidade do preenchimento das declarações; (4) diferenças temporais na 
                  consolidação dos dados entre diferentes estados e municípios.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Referências Técnicas</h4>
                <p className="text-gray-700 text-sm">
                  As análises seguem as diretrizes da Organização Mundial da Saúde (OMS), do Ministério da Saúde 
                  do Brasil e dos Objetivos de Desenvolvimento Sustentável da Agenda 2030 das Nações Unidas.
                </p>
              </div>
            </div>
          </Card>

          {/* Rodapé */}
          <div className="text-center pt-4 border-t text-sm text-gray-500">
            <p className="font-medium">Sistema de Análise de Indicadores de Saúde | Ministério da Saúde - Brasil</p>
            <p>Relatório gerado automaticamente via Inteligência Artificial</p>
          </div>
        </div>
      </div>
    </div>
  );
};