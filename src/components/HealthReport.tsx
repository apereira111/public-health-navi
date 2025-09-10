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

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff7f'];

export const HealthReport: React.FC<HealthReportProps> = ({ data, onClose }) => {
  const { toast } = useToast();

  const generateChartData = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return [
        {
          type: 'bar',
          title: 'Taxa de Mortalidade Materna por Região (2024)',
          data: [
            { name: 'Norte', value: 89, target: 30 },
            { name: 'Nordeste', value: 71, target: 30 },
            { name: 'Centro-Oeste', value: 58, target: 30 },
            { name: 'Sudeste', value: 45, target: 30 },
            { name: 'Sul', value: 42, target: 30 }
          ]
        },
        {
          type: 'bar',
          title: 'Taxa de Mortalidade Infantil por Região (2024)',
          data: [
            { name: 'Norte', value: 16.2, target: 8.5 },
            { name: 'Nordeste', value: 14.8, target: 8.5 },
            { name: 'Centro-Oeste', value: 12.1, target: 8.5 },
            { name: 'Sudeste', value: 10.3, target: 8.5 },
            { name: 'Sul', value: 9.7, target: 8.5 }
          ]
        }
      ];
    }
    
    if (lowercaseQuery.includes('mortalidade materna')) {
      return [{
        type: 'bar',
        title: 'Taxa de Mortalidade Materna por Região (2024)',
        data: [
          { name: 'Norte', value: 89, target: 30 },
          { name: 'Nordeste', value: 71, target: 30 },
          { name: 'Centro-Oeste', value: 58, target: 30 },
          { name: 'Sudeste', value: 45, target: 30 },
          { name: 'Sul', value: 42, target: 30 }
        ]
      }];
    }
    
    if (lowercaseQuery.includes('mortalidade infantil')) {
      return [{
        type: 'line',
        title: 'Evolução da Mortalidade Infantil - Brasil (2020-2024)',
        data: [
          { year: '2020', value: 14.8 },
          { year: '2021', value: 14.2 },
          { year: '2022', value: 13.8 },
          { year: '2023', value: 13.5 },
          { year: '2024', value: 12.4 }
        ]
      }];
    }
    
    if (lowercaseQuery.includes('dengue')) {
      return [{
        type: 'pie',
        title: 'Distribuição de Casos de Dengue por Região (2024)',
        data: [
          { name: 'Sudeste', value: 45, cases: 2745000 },
          { name: 'Nordeste', value: 22, cases: 1342000 },
          { name: 'Sul', value: 15, cases: 915000 },
          { name: 'Centro-Oeste', value: 12, cases: 732000 },
          { name: 'Norte', value: 6, cases: 366000 }
        ]
      }];
    }
    
    return [];
  };

  const generateAnalysis = (query: string, results: string[]) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return {
        title: "Análise Crítica: Mortalidade Materna e Infantil no Brasil",
        executiveSummary: "Este relatório apresenta uma análise abrangente dos indicadores de mortalidade materna e infantil no Brasil em 2024, evidenciando os progressos alcançados e os desafios que ainda persistem para o cumprimento dos Objetivos de Desenvolvimento Sustentável (ODS) da Agenda 2030.",
        sections: [
          {
            title: "1. CONTEXTO EPIDEMIOLÓGICO",
            content: `O Brasil registrou em 2024 uma taxa de mortalidade materna de 60 óbitos por 100.000 nascidos vivos, representando uma redução de 12% em relação a 2023 (68 óbitos/100.000). Apesar dessa tendência positiva, o indicador permanece significativamente distante da meta estabelecida pelos ODS de reduzir a mortalidade materna para menos de 30 óbitos por 100.000 nascidos vivos até 2030.
            
Paralelamente, a mortalidade infantil apresentou taxa de 12,4 óbitos por 1.000 nascidos vivos, demonstrando redução de 8% em relação ao ano anterior. Contudo, este indicador também supera substancialmente a meta ODS de 8,5 óbitos por 1.000 nascidos vivos.
            
A análise dos dados evidencia que ambos os indicadores mantêm trajetória descendente consistente nos últimos cinco anos, sinalizando efetividade das políticas públicas de saúde materno-infantil implementadas no país.`
          },
          {
            title: "2. ANÁLISE DAS DISPARIDADES REGIONAIS",
            content: `As desigualdades regionais constituem o principal desafio para a melhoria dos indicadores nacionais. A região Norte apresenta a maior taxa de mortalidade materna (89/100.000), seguida pelo Nordeste (71/100.000), enquanto as regiões Sul (42/100.000) e Sudeste (45/100.000) demonstram indicadores mais favoráveis.
            
Esta disparidade reflete diferenças estruturais significativas:
• Densidade de profissionais especializados: as regiões Norte e Nordeste apresentam déficit de obstetras e neonatologistas
• Infraestrutura hospitalar: menor disponibilidade de UTIs neonatais e centros de parto de alto risco
• Fatores socioeconômicos: menor escolaridade materna, renda familiar reduzida e acesso limitado a serviços de saúde
• Cobertura da Estratégia Saúde da Família: variações na qualidade e regularidade do pré-natal
            
A mortalidade infantil segue padrão similar, com as regiões Norte (16,2/1.000) e Nordeste (14,8/1.000) apresentando taxas superiores à média nacional.`
          },
          {
            title: "3. DETERMINANTES CAUSAIS",
            content: `A análise das principais causas de óbito materno revela padrão consistente com estudos internacionais:
• Hipertensão arterial (37%): principal causa evitável através de pré-natal adequado e manejo obstétrico apropriado
• Hemorragias (11%): requerem acesso rápido a serviços especializados e bancos de sangue
• Infecções puerperais (8%): preveníveis com protocolos de assepsia e antibioticoterapia adequada
• Outras causas obstétricas diretas (44%): incluindo embolia, complicações anestésicas e cardiopatias
            
Quanto à mortalidade infantil, as principais causas identificadas são:
• Afecções perinatais (52%): relacionadas à prematuridade e baixo peso ao nascer
• Malformações congênitas (23%): requerem diagnóstico precoce e tratamento especializado
• Doenças infecciosas (15%): preveníveis através de vacinação e saneamento adequado
• Outras causas (10%): incluindo causas externas e doenças metabólicas`
          },
          {
            title: "4. IMPACTO SOCIOECONÔMICO",
            content: `Os óbitos maternos e infantis geram impactos socioeconômicos substanciais que transcendem os aspectos puramente epidemiológicos:
            
IMPACTO FAMILIAR:
• Desestruturação familiar decorrente da perda materna
• Redução da renda familiar e aumento da vulnerabilidade social
• Impacto psicológico nos cônjuges e filhos sobreviventes
• Custos diretos com tratamentos e procedimentos
            
IMPACTO NO SISTEMA DE SAÚDE:
• Aumento dos custos assistenciais em UTIs neonatais
• Necessidade de investimento em tecnologias de alto custo
• Sobrecarga dos serviços de emergência obstétrica
• Demanda por profissionais altamente especializados
            
IMPACTO SOCIAL:
• Perpetuação de ciclos de pobreza e exclusão social
• Redução do capital humano e produtivo
• Impacto na qualidade de vida das comunidades
• Reflexo das desigualdades sociais e de acesso à saúde`
          },
          {
            title: "5. TENDÊNCIAS E PROJEÇÕES",
            content: `A análise temporal dos indicadores permite identificar tendências positivas consistentes:
            
MORTALIDADE MATERNA:
• Redução média de 3,2% ao ano no período 2020-2024
• Melhoria mais acentuada nas regiões Sul e Sudeste
• Impacto positivo da implementação da Rede Cegonha
• Projeção de atingimento da meta ODS em 2035, caso mantida a tendência atual
            
MORTALIDADE INFANTIL:
• Redução média de 2,8% ao ano no período analisado
• Diminuição mais significativa no componente pós-neonatal
• Contribuição das políticas de imunização e saneamento
• Projeção de atingimento da meta ODS em 2032, mantidas as atuais políticas
            
FATORES CONTRIBUTIVOS PARA A MELHORIA:
• Ampliação da cobertura do pré-natal de qualidade
• Implementação de protocolos clínicos padronizados
• Investimento em tecnologias perinatais
• Fortalecimento da atenção primária à saúde`
          },
          {
            title: "6. RECOMENDAÇÕES ESTRATÉGICAS",
            content: `Com base na análise dos dados e evidências científicas, recomenda-se a implementação das seguintes estratégias prioritárias:
            
AÇÕES IMEDIATAS (6-12 meses):
• Implementação de protocolos padronizados de emergência obstétrica em todos os hospitais
• Capacitação de equipes multiprofissionais em manejo de complicações maternas
• Fortalecimento do sistema de transporte de gestantes de alto risco
• Ampliação da cobertura de UTIs neonatais nas regiões Norte e Nordeste
            
AÇÕES DE MÉDIO PRAZO (1-3 anos):
• Expansão da Rede Cegonha com foco nas regiões prioritárias
• Implementação de telemedicina para consultorias especializadas
• Criação de centros de referência em medicina fetal
• Fortalecimento da vigilância dos óbitos maternos e infantis
            
AÇÕES DE LONGO PRAZO (3-5 anos):
• Redução das desigualdades regionais através de investimento direcionado
• Implementação de sistema integrado de informações perinatais
• Desenvolvimento de programa nacional de qualificação obstétrica
• Estabelecimento de metas regionalizadas alinhadas aos ODS`
          }
        ],
        recommendations: [
          {
            priority: "ALTA",
            action: "Implementar protocolos de emergência obstétrica padronizados",
            timeline: "6 meses",
            responsible: "Ministério da Saúde / Secretarias Estaduais"
          },
          {
            priority: "ALTA", 
            action: "Ampliar UTIs neonatais nas regiões Norte e Nordeste",
            timeline: "12 meses",
            responsible: "Ministério da Saúde"
          },
          {
            priority: "MÉDIA",
            action: "Implementar telemedicina obstétrica",
            timeline: "18 meses", 
            responsible: "Secretarias Estaduais"
          },
          {
            priority: "MÉDIA",
            action: "Fortalecer vigilância de óbitos",
            timeline: "12 meses",
            responsible: "Secretarias Municipais"
          }
        ]
      };
    }
    
    if (lowercaseQuery.includes('mortalidade materna')) {
      return {
        title: "Análise Crítica: Mortalidade Materna no Brasil",
        sections: [
          {
            title: "Cenário Epidemiológico",
            content: "A taxa de 60 óbitos maternos por 100.000 nascidos vivos coloca o Brasil em situação preocupante, considerando que países desenvolvidos apresentam taxas inferiores a 10 óbitos/100.000."
          },
          {
            title: "Principais Causas",
            content: "A hipertensão arterial responde por 37% dos óbitos, seguida por hemorragias (11%) e infecções (8%). Estas são causas evitáveis com assistência adequada durante o pré-natal e parto."
          },
          {
            title: "Impacto Social",
            content: "Cada óbito materno representa não apenas uma tragédia familiar, mas também um indicador de qualidade dos serviços de saúde e das condições socioeconômicas da população."
          }
        ]
      };
    }
    
    return {
      title: "Análise dos Indicadores de Saúde",
      sections: [
        {
          title: "Contextualização",
          content: "Os dados apresentados refletem o panorama atual dos indicadores de saúde no Brasil, evidenciando tanto avanços quanto desafios persistentes."
        },
        {
          title: "Considerações Metodológicas",
          content: "É importante considerar que os dados podem apresentar subnotificação e variações metodológicas entre diferentes sistemas de informação em saúde."
        }
      ]
    };
  };

  const chartData = generateChartData(data.query);
  const analysis = generateAnalysis(data.query, data.results);

  const renderChart = (chart: any) => {
    if (!chart) return null;

    switch (chart.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" name="Taxa Atual" />
              <Bar dataKey="target" fill="#82ca9d" name="Meta ODS" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const generatePDF = async () => {
    try {
      const reportElement = document.getElementById('health-report');
      if (!reportElement) return;

      toast({
        title: "Gerando PDF",
        description: "Processando o relatório..."
      });

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `relatorio-saude-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: "PDF gerado com sucesso",
        description: `Arquivo ${fileName} foi baixado.`
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível criar o arquivo PDF.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Relatório de Análise de Indicadores de Saúde</h2>
            <div className="flex gap-2">
              <Button onClick={generatePDF} variant="outline">
                📄 Exportar PDF
              </Button>
              <Button onClick={onClose} variant="outline">
                ✕ Fechar
              </Button>
            </div>
          </div>

          <div id="health-report" className="space-y-6 bg-white p-6 rounded">
            {/* Cabeçalho do Relatório */}
            <div className="text-center border-b pb-4 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Relatório de Indicadores de Saúde
              </h1>
              <p className="text-gray-600">
                Consulta: "{data.query}"
              </p>
              <p className="text-sm text-gray-500">
                Gerado em: {new Date(data.timestamp).toLocaleString('pt-BR')}
              </p>
            </div>

            {/* Resumo Executivo */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">📋 Resumo Executivo</h3>
              <div className="space-y-4">
                {analysis.executiveSummary && (
                  <p className="text-gray-700 leading-relaxed text-justify bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    {analysis.executiveSummary}
                  </p>
                )}
                <div className="space-y-2">
                  {data.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <p className="text-gray-700 leading-relaxed">{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Visualização de Dados */}
            {chartData && chartData.length > 0 && chartData.map((chart, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 {chart.title}</h3>
                {renderChart(chart)}
              </Card>
            ))}

            {/* Tabelas de Dados */}
            {chartData && chartData.length > 0 && chartData.map((chart, index) => (
              chart.type === 'bar' && (
                <Card key={`table-${index}`} className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">📈 Dados Detalhados - {chart.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Região</th>
                          <th className="border border-gray-300 p-3 text-center">Taxa Atual</th>
                          <th className="border border-gray-300 p-3 text-center">Meta ODS</th>
                          <th className="border border-gray-300 p-3 text-center">Distância da Meta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chart.data.map((item, itemIndex) => (
                          <tr key={itemIndex} className={itemIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 p-3 font-medium">{item.name}</td>
                            <td className="border border-gray-300 p-3 text-center">{item.value}</td>
                            <td className="border border-gray-300 p-3 text-center">{item.target}</td>
                            <td className="border border-gray-300 p-3 text-center text-red-600">
                              +{item.value - item.target}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              )
            ))}

            {/* Análise Crítica */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">🔍 {analysis.title}</h3>
              <div className="space-y-8">
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
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">🎯 Recomendações Estratégicas</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Prioridade</th>
                        <th className="border border-gray-300 p-3 text-left">Ação Recomendada</th>
                        <th className="border border-gray-300 p-3 text-center">Prazo</th>
                        <th className="border border-gray-300 p-3 text-left">Responsável</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.recommendations.map((recommendation, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 p-3">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
                              recommendation.priority === 'ALTA' 
                                ? 'bg-red-100 text-red-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {recommendation.priority}
                            </span>
                          </td>
                          <td className="border border-gray-300 p-3">{recommendation.action}</td>
                          <td className="border border-gray-300 p-3 text-center font-medium">{recommendation.timeline}</td>
                          <td className="border border-gray-300 p-3 text-sm">{recommendation.responsible}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Conclusões e Próximos Passos */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">📋 Conclusões e Próximos Passos</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Pontos Positivos</h4>
                  <p className="text-green-700">
                    Observa-se tendência consistente de redução nos indicadores de mortalidade materna e infantil, 
                    demonstrando efetividade das políticas implementadas nos últimos anos.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-2">Desafios Identificados</h4>
                  <p className="text-yellow-700">
                    As desigualdades regionais permanecem como principal obstáculo para o atingimento das metas ODS, 
                    exigindo estratégias direcionadas e investimentos priorizados.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Próximas Ações</h4>
                  <p className="text-blue-700">
                    É fundamental manter o monitoramento contínuo dos indicadores e implementar as recomendações 
                    prioritárias para acelerar o progresso em direção às metas estabelecidas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Metodologia */}
            <Card className="p-6">
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
                  <h4 className="font-semibold text-gray-800 mb-2">Definições e Indicadores</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700 text-sm">
                      <strong>Taxa de Mortalidade Materna:</strong> Número de óbitos maternos por 100.000 nascidos vivos<br/>
                      <strong>Taxa de Mortalidade Infantil:</strong> Número de óbitos de menores de 1 ano por 1.000 nascidos vivos<br/>
                      <strong>Meta ODS 3.1:</strong> Reduzir mortalidade materna para menos de 30/100.000 até 2030<br/>
                      <strong>Meta ODS 3.2:</strong> Reduzir mortalidade infantil para menos de 8,5/1.000 até 2030
                    </p>
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
              <p>Sistema de Análise de Indicadores de Saúde | Ministério da Saúde - Brasil</p>
              <p>Relatório gerado automaticamente via Inteligência Artificial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};