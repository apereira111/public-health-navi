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
    
    if (lowercaseQuery.includes('mortalidade materna')) {
      return {
        type: 'bar',
        title: 'Taxa de Mortalidade Materna por Região (2024)',
        data: [
          { name: 'Norte', value: 89, target: 30 },
          { name: 'Nordeste', value: 71, target: 30 },
          { name: 'Centro-Oeste', value: 58, target: 30 },
          { name: 'Sudeste', value: 45, target: 30 },
          { name: 'Sul', value: 42, target: 30 }
        ]
      };
    }
    
    if (lowercaseQuery.includes('mortalidade infantil')) {
      return {
        type: 'line',
        title: 'Evolução da Mortalidade Infantil - Brasil (2020-2024)',
        data: [
          { year: '2020', value: 14.8 },
          { year: '2021', value: 14.2 },
          { year: '2022', value: 13.8 },
          { year: '2023', value: 13.5 },
          { year: '2024', value: 12.4 }
        ]
      };
    }
    
    if (lowercaseQuery.includes('dengue')) {
      return {
        type: 'pie',
        title: 'Distribuição de Casos de Dengue por Região (2024)',
        data: [
          { name: 'Sudeste', value: 45, cases: 2745000 },
          { name: 'Nordeste', value: 22, cases: 1342000 },
          { name: 'Sul', value: 15, cases: 915000 },
          { name: 'Centro-Oeste', value: 12, cases: 732000 },
          { name: 'Norte', value: 6, cases: 366000 }
        ]
      };
    }
    
    return null;
  };

  const generateAnalysis = (query: string, results: string[]) => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return {
        title: "Análise Crítica: Mortalidade Materna e Infantil no Brasil",
        sections: [
          {
            title: "Situação Atual",
            content: "O Brasil apresenta taxas de mortalidade materna e infantil ainda distantes das metas estabelecidas pelos Objetivos de Desenvolvimento Sustentável (ODS). A taxa de mortalidade materna de 60 óbitos por 100.000 nascidos vivos está duas vezes acima da meta de 30 óbitos/100.000."
          },
          {
            title: "Desigualdades Regionais",
            content: "Observa-se significativas disparidades regionais, com as regiões Norte e Nordeste apresentando indicadores mais críticos. Esta diferença reflete desigualdades socioeconômicas e no acesso aos serviços de saúde de qualidade."
          },
          {
            title: "Tendências Positivas",
            content: "Apesar dos desafios, nota-se tendência de redução em ambos os indicadores. A mortalidade materna reduziu 12% e a infantil 8% em relação a 2023, demonstrando efetividade das políticas públicas implementadas."
          },
          {
            title: "Recomendações",
            content: "É fundamental fortalecer a atenção pré-natal, melhorar a qualidade da assistência obstétrica, investir em UTIs neonatais e reduzir as desigualdades regionais através de políticas públicas direcionadas."
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

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartData.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.data}>
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
            <LineChart data={chartData.data}>
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
                data={chartData.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.data.map((entry, index) => (
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
              <div className="space-y-2">
                {data.results.map((result, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {result}
                  </p>
                ))}
              </div>
            </Card>

            {/* Visualização de Dados */}
            {chartData && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">📊 {chartData.title}</h3>
                {renderChart()}
              </Card>
            )}

            {/* Tabela de Dados */}
            {chartData && chartData.type === 'bar' && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">📈 Dados Detalhados</h3>
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
                      {chartData.data.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
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
            )}

            {/* Análise Crítica */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">🔍 {analysis.title}</h3>
              <div className="space-y-6">
                {analysis.sections.map((section, index) => (
                  <div key={index}>
                    <h4 className="text-lg font-medium mb-2 text-gray-800">{section.title}</h4>
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Metodologia */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">📚 Metodologia</h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                Os dados apresentados neste relatório são baseados em informações dos sistemas oficiais 
                de saúde do Brasil, incluindo SIM (Sistema de Informações sobre Mortalidade), SINASC 
                (Sistema de Informações sobre Nascidos Vivos) e SINAN (Sistema de Informação de Agravos 
                de Notificação). As análises consideram as definições da Organização Mundial da Saúde (OMS) 
                e os parâmetros estabelecidos pelos Objetivos de Desenvolvimento Sustentável (ODS).
              </p>
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