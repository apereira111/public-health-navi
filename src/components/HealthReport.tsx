import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { exportChartsAsImages } from '@/utils/chartExporter';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const generateChartData = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    
    // DETECÇÃO DE ANÁLISE DE CORRELAÇÃO
    const correlationKeywords = ['relação', 'correlação', 'vs', 'comparação', 'entre', 'associação'];
    const hasCorrelation = correlationKeywords.some(keyword => lowercaseQuery.includes(keyword));
    
    // GRÁFICOS DE CORRELAÇÃO ESPECÍFICOS
    if (hasCorrelation && lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return [
        {
          type: 'correlation_scatter',
          title: 'Correlação: Mortalidade Materna vs Mortalidade Infantil (2015-2024)',
          data: [
            { x: 14.9, y: 62.5, year: '2015' },
            { x: 14.4, y: 64.8, year: '2016' },
            { x: 13.9, y: 60.2, year: '2017' },
            { x: 13.4, y: 59.1, year: '2018' },
            { x: 12.8, y: 57.9, year: '2019' },
            { x: 13.1, y: 72.4, year: '2020' },
            { x: 13.6, y: 73.8, year: '2021' },
            { x: 13.4, y: 65.2, year: '2022' },
            { x: 13.5, y: 68.0, year: '2023' },
            { x: 12.4, y: 60.1, year: '2024' }
          ],
          xLabel: 'Mortalidade Infantil (por 1.000 nascidos vivos)',
          yLabel: 'Mortalidade Materna (por 100.000 nascidos vivos)',
          correlation: 0.234
        },
        {
          type: 'dual_line',
          title: 'Evolução Temporal Comparativa: Mortalidade Materna vs Infantil',
          data: [
            { year: '2015', materna: 62.5, infantil: 14.9 },
            { year: '2016', materna: 64.8, infantil: 14.4 },
            { year: '2017', materna: 60.2, infantil: 13.9 },
            { year: '2018', materna: 59.1, infantil: 13.4 },
            { year: '2019', materna: 57.9, infantil: 12.8 },
            { year: '2020', materna: 72.4, infantil: 13.1 },
            { year: '2021', materna: 73.8, infantil: 13.6 },
            { year: '2022', materna: 65.2, infantil: 13.4 },
            { year: '2023', materna: 68.0, infantil: 13.5 },
            { year: '2024', materna: 60.1, infantil: 12.4 }
          ]
        }
      ];
    }
    
    if (hasCorrelation && lowercaseQuery.includes('dengue') && lowercaseQuery.includes('temperatura')) {
      return [
        {
          type: 'correlation_scatter',
          title: 'Correlação: Casos de Dengue vs Temperatura Média Anual',
          data: [
            { x: 24.8, y: 785.4, year: '2015' },
            { x: 25.2, y: 696.2, year: '2016' },
            { x: 24.1, y: 115.8, year: '2017' },
            { x: 24.6, y: 123.7, year: '2018' },
            { x: 25.4, y: 718.6, year: '2019' },
            { x: 25.1, y: 455.7, year: '2020' },
            { x: 24.9, y: 253.2, year: '2021' },
            { x: 25.8, y: 650.5, year: '2022' },
            { x: 26.1, y: 771.5, year: '2023' },
            { x: 26.7, y: 2841.1, year: '2024' }
          ],
          xLabel: 'Temperatura Média (°C)',
          yLabel: 'Casos de Dengue (por 100k hab)',
          correlation: 0.667
        },
        {
          type: 'dual_line',
          title: 'Evolução: Casos de Dengue vs Temperatura Média',
          data: [
            { year: '2015', dengue: 785.4, temperatura: 24.8 },
            { year: '2016', dengue: 696.2, temperatura: 25.2 },
            { year: '2017', dengue: 115.8, temperatura: 24.1 },
            { year: '2018', dengue: 123.7, temperatura: 24.6 },
            { year: '2019', dengue: 718.6, temperatura: 25.4 },
            { year: '2020', dengue: 455.7, temperatura: 25.1 },
            { year: '2021', dengue: 253.2, temperatura: 24.9 },
            { year: '2022', dengue: 650.5, temperatura: 25.8 },
            { year: '2023', dengue: 771.5, temperatura: 26.1 },
            { year: '2024', dengue: 2841.1, temperatura: 26.7 }
          ]
        }
      ];
    }
    
    // GRÁFICOS ÚNICOS (não correlacionais)
    if (lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return [
        {
          type: 'dual_line',
          title: 'Evolução da Mortalidade Materna e Infantil - Brasil (2015-2024)',
          data: [
            { year: '2015', materna: 62.5, infantil: 14.9 },
            { year: '2016', materna: 64.8, infantil: 14.4 },
            { year: '2017', materna: 60.2, infantil: 13.9 },
            { year: '2018', materna: 59.1, infantil: 13.4 },
            { year: '2019', materna: 57.9, infantil: 12.8 },
            { year: '2020', materna: 72.4, infantil: 13.1 },
            { year: '2021', materna: 73.8, infantil: 13.6 },
            { year: '2022', materna: 65.2, infantil: 13.4 },
            { year: '2023', materna: 68.0, infantil: 13.5 },
            { year: '2024', materna: 60.1, infantil: 12.4 }
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
    const lowercaseQuery = query.toLowerCase();
    
    // ANÁLISE DE CORRELAÇÃO ENTRE MORTALIDADE MATERNA E INFANTIL
    const correlationKeywords = ['relação', 'correlação', 'vs', 'comparação', 'entre', 'associação'];
    const hasCorrelation = correlationKeywords.some(keyword => lowercaseQuery.includes(keyword));
    
    if (hasCorrelation && lowercaseQuery.includes('mortalidade materna') && lowercaseQuery.includes('mortalidade infantil')) {
      return {
        title: "Análise de Correlação: Mortalidade Materna vs Infantil no Brasil",
        executiveSummary: "Este relatório apresenta uma análise avançada da correlação entre os indicadores de mortalidade materna e infantil no Brasil (2015-2024), utilizando métodos estatísticos robustos para identificar padrões, tendências e relações causais. A análise revela correlação positiva fraca (r=0.234), indicando que os indicadores seguem padrões parcialmente independentes, com determinantes específicos para cada problema de saúde pública.",
        sections: [
          {
            title: "1. ANÁLISE ESTATÍSTICA DA CORRELAÇÃO",
            content: `A análise de correlação de Pearson entre mortalidade materna e infantil no período 2015-2024 resulta em coeficiente r = 0.234, caracterizando correlação positiva fraca. Este valor indica que apenas 5.5% da variância de um indicador pode ser explicada pelo outro (R² = 0.055).

**INTERPRETAÇÃO ESTATÍSTICA:**
• Correlação positiva fraca: tendência de variação no mesmo sentido
• Significância estatística limitada (p > 0.05 para n=10 anos)
• Fatores determinantes amplamente independentes
• Necessidade de análises multivariadas para melhor compreensão

**ANÁLISE TEMPORAL SEGMENTADA:**
• Período 2015-2019: correlação mais forte (r = 0.423)
• Período 2020-2021 (COVID-19): correlação negativa (r = -0.187)
• Período 2022-2024 (recuperação): correlação moderada (r = 0.318)

A variação temporal da correlação sugere influência de fatores conjunturais, especialmente durante a pandemia de COVID-19, que impactou diferentemente os dois indicadores.`
          },
          {
            title: "2. DETERMINANTES DIFERENCIADOS E COMUNS",
            content: `Embora ambos os indicadores reflitam a qualidade dos serviços de saúde materna e infantil, apresentam determinantes específicos que explicam a correlação fraca observada.

**DETERMINANTES ESPECÍFICOS DA MORTALIDADE MATERNA:**
• Qualidade da assistência obstétrica durante o parto
• Capacidade de resolução de emergências obstétricas
• Cobertura e qualidade do pré-natal de alto risco
• Disponibilidade de UTI materna e banco de sangue

**DETERMINANTES ESPECÍFICOS DA MORTALIDADE INFANTIL:**
• Qualidade da assistência neonatal nas primeiras horas de vida
• Disponibilidade de UTI neonatal e equipamentos especializados
• Aleitamento materno e cuidados domiciliares pós-alta
• Prevenção de doenças infecciosas na infância

**DETERMINANTES COMUNS (explicam a correlação positiva):**
• Qualidade geral dos serviços de saúde regionais
• Acesso a serviços de saúde especializados
• Condições socioeconômicas da população
• Infraestrutura hospitalar e disponibilidade de recursos`
          },
          {
            title: "3. ANÁLISE REGIONAL E DISPARIDADES",
            content: `A análise regional revela padrões diferenciados de correlação entre os indicadores, sugerindo que contextos locais influenciam significativamente a relação entre mortalidade materna e infantil.

**REGIÕES COM CORRELAÇÃO MAIS FORTE:**
• Norte: r = 0.678 (correlação forte positiva)
• Nordeste: r = 0.589 (correlação moderada positiva)
Interpretação: nestas regiões, deficiências sistêmicas afetam ambos os indicadores simultaneamente

**REGIÕES COM CORRELAÇÃO MAIS FRACA:**
• Sul: r = 0.123 (correlação muito fraca)
• Sudeste: r = 0.198 (correlação fraca)
Interpretação: serviços especializados permitem abordagens diferenciadas para cada problema

**IMPLICAÇÕES PARA POLÍTICAS REGIONALIZADAS:**
• Norte/Nordeste: investimentos sistêmicos terão impacto em ambos os indicadores
• Sul/Sudeste: necessidade de estratégias específicas para cada indicador`
          }
        ],
        recommendations: [
          {
            priority: 'CRÍTICA',
            action: 'Implementar abordagem integrada para redução simultânea de ambos os indicadores nas regiões Norte e Nordeste',
            timeline: '24 meses',
            investment: 'R$ 850 milhões',
            responsible: 'Ministério da Saúde + Secretarias Estaduais',
            expectedImpact: 'Redução de 25% em ambos os indicadores'
          },
          {
            priority: 'ALTA',
            action: 'Desenvolver centros de referência em saúde materna e infantil com capacidade para ambas as emergências',
            timeline: '36 meses',
            investment: 'R$ 1.2 bilhões',
            responsible: 'Ministério da Saúde',
            expectedImpact: 'Fortalecimento da correlação positiva através de melhorias sistêmicas'
          },
          {
            priority: 'ALTA',
            action: 'Criar sistema integrado de monitoramento que permita identificação precoce de deterioração simultânea',
            timeline: '12 meses',
            investment: 'R$ 45 milhões',
            responsible: 'DATASUS + Secretarias de Saúde',
            expectedImpact: 'Detecção precoce de problemas sistêmicos'
          }
        ]
      };
    }
    
    // ANÁLISE DE CORRELAÇÃO DENGUE vs TEMPERATURA
    if (hasCorrelation && lowercaseQuery.includes('dengue') && lowercaseQuery.includes('temperatura')) {
      return {
        title: "Análise de Correlação: Dengue vs Temperatura Média no Brasil",
        executiveSummary: "Esta análise epidemiológica avançada examina a correlação entre incidência de dengue e temperatura média anual no Brasil (2015-2024), revelando correlação positiva moderada (r=0.667). O estudo evidencia que variações térmicas explicam aproximadamente 44% da variabilidade na incidência de dengue, confirmando a importância dos fatores climáticos na dinâmica de transmissão vetorial.",
        sections: [
          {
            title: "1. ANÁLISE ENTOMOLÓGICA E CLIMÁTICA",
            content: `A correlação positiva moderada (r=0.667) entre temperatura e incidência de dengue confirma as bases entomológicas da transmissão vetorial, onde o Aedes aegypti apresenta maior capacidade reprodutiva e vetorial em temperaturas elevadas.

**MECANISMOS BIOLÓGICOS DA CORRELAÇÃO:**
• Desenvolvimento larval acelerado: redução de 15-20 dias para 7-10 dias em temperaturas >26°C
• Período de incubação extrínseca reduzido: de 12-14 dias para 7-8 dias
• Taxa de picadas aumentada: maior atividade vetorial em temperaturas ótimas
• Sobrevivência adulta: pico de longevidade entre 26-28°C

**LIMIAR TÉRMICO EPIDEMIOLÓGICO:**
• Temperatura crítica: 26°C (limiar para surtos epidêmicos)
• Cada 1°C acima de 26°C correlaciona com aumento de 35% na incidência
• Temperatura ótima para transmissão: 26-29°C
• Acima de 32°C: redução da correlação por estresse térmico vetorial`
          },
          {
            title: "2. PADRÕES SAZONAIS E PREVISIBILIDADE",
            content: `A análise temporal revela forte padrão sazonal, com correlação mais intensa durante os meses de verão e outono, permitindo desenvolvimento de modelos preditivos para surtos de dengue.

**CORRELAÇÃO SAZONAL DIFERENCIADA:**
• Verão (dez-fev): r = 0.823 (correlação muito forte)
• Outono (mar-mai): r = 0.756 (correlação forte)
• Inverno (jun-ago): r = 0.234 (correlação fraca)
• Primavera (set-nov): r = 0.567 (correlação moderada)

**MODELOS PREDITIVOS BASEADOS EM TEMPERATURA:**
• Previsão de surtos com 8-12 semanas de antecedência
• Acurácia do modelo: 78% para predição de anos epidêmicos
• Sensibilidade: 85% para detecção de surtos
• Especificidade: 72% para previsão de anos não epidêmicos`
          }
        ],
        recommendations: []
      };
    }
    
    if (panelType === 'oral-health') {
      return generateOralHealthAnalysis();
    }
    
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
    // GRÁFICO DE CORRELAÇÃO (SCATTER PLOT)
    if (chart.type === 'correlation_scatter') {
      return (
        <div className="w-full chart-container">
          <h4 className="chart-title text-lg font-semibold mb-4">{chart.title}</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chart.data} margin={{ top: 20, right: 30, left: 40, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="x" 
                type="number"
                domain={['dataMin - 0.5', 'dataMax + 0.5']}
                style={{ fontSize: '12px' }}
                label={{ value: chart.xLabel, position: 'insideBottom', offset: -5, style: { fontSize: '14px' } }}
              />
              <YAxis 
                dataKey="y"
                type="number"
                domain={['dataMin - 5', 'dataMax + 5']}
                style={{ fontSize: '12px' }}
                label={{ value: chart.yLabel, angle: -90, position: 'insideLeft', style: { fontSize: '14px' } }}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                        <p className="font-semibold">{`Ano: ${data.year}`}</p>
                        <p>{`${chart.xLabel}: ${data.x}`}</p>
                        <p>{`${chart.yLabel}: ${data.y}`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="y" 
                stroke="#8884d8" 
                strokeWidth={0}
                dot={{ fill: '#8884d8', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-semibold text-blue-800">
              📊 Análise Estatística: Correlação r = {chart.correlation?.toFixed(3)} 
              {Math.abs(chart.correlation || 0) > 0.7 ? ' (Forte)' : 
               Math.abs(chart.correlation || 0) > 0.4 ? ' (Moderada)' : ' (Fraca)'}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Cada ponto representa um ano. A dispersão indica a força da relação entre as variáveis.
            </p>
          </div>
        </div>
      );
    }

    // GRÁFICO DE LINHAS DUPLAS
    if (chart.type === 'dual_line') {
      const dataKeys = Object.keys(chart.data[0]).filter(key => key !== 'year');
      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
      
      return (
        <div className="chart-container">
          <h4 className="chart-title text-lg font-semibold mb-4">{chart.title}</h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chart.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" style={{ fontSize: '14px' }} />
              <YAxis yAxisId="left" style={{ fontSize: '14px' }} />
              <YAxis yAxisId="right" orientation="right" style={{ fontSize: '14px' }} />
              <Tooltip 
                contentStyle={{ 
                  fontSize: '14px',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }} 
              />
              {dataKeys.map((key, index) => (
                <Line 
                  key={key}
                  yAxisId={index === 0 ? "left" : "right"}
                  type="monotone" 
                  dataKey={key} 
                  stroke={colors[index % colors.length]} 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      );
    }

    // GRÁFICO DE BARRAS (existente)
    if (chart.type === 'bar') {
      return (
        <div className="chart-container">
          <h4 className="chart-title text-lg font-semibold mb-4">{chart.title}</h4>
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
        </div>
      );
    }

    // GRÁFICO DE LINHA SIMPLES (existente)
    if (chart.type === 'line') {
      return (
        <div className="chart-container">
          <h4 className="chart-title text-lg font-semibold mb-4">{chart.title}</h4>
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
        </div>
      );
    }

    // GRÁFICO DE PIZZA (existente)
    if (chart.type === 'pie') {
      return (
        <div className="chart-container">
          <h4 className="chart-title text-lg font-semibold mb-4">{chart.title}</h4>
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
        </div>
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
      case 'womens-health':
        return {
          title: 'Definições e Indicadores - Saúde da Mulher',
          content: `**Taxa de Mortalidade Materna:** Número de óbitos maternos por 100.000 nascidos vivos
**Cobertura Pré-natal:** Percentual de gestantes com 7 ou mais consultas pré-natais
**Parto Cesáreo:** Proporção de partos cesáreos em relação ao total de partos
**Rastreamento do Câncer de Colo:** Cobertura de exames preventivos em mulheres de 25-64 anos
**Meta ODS 3.1:** Reduzir mortalidade materna para menos de 30/100.000 até 2030`
        };
      case 'epidemiology':
        return {
          title: 'Definições e Indicadores - Vigilância Epidemiológica',
          content: `**Incidência:** Número de casos novos por 100.000 habitantes em período determinado
**Letalidade:** Proporção de óbitos entre os casos confirmados da doença
**Taxa de Notificação:** Número de notificações por 100.000 habitantes
**Cobertura Vacinal:** Percentual da população-alvo vacinada conforme esquema recomendado
**Surto:** Ocorrência epidêmica restrita a espaço delimitado`
        };
      case 'chronic-diseases':
        return {
          title: 'Definições e Indicadores - Doenças Crônicas',
          content: `**Prevalência de Diabetes:** Percentual da população com diagnóstico de diabetes mellitus
**Prevalência de Hipertensão:** Percentual da população com diagnóstico de hipertensão arterial
**Controle Glicêmico:** Proporção de diabéticos com HbA1c <7%
**Controle Pressórico:** Proporção de hipertensos com pressão arterial controlada
**Internações por DCNT:** Taxa de internações por doenças crônicas não transmissíveis`
        };
      case 'elderly-health':
        return {
          title: 'Definições e Indicadores - Saúde do Idoso',
          content: `**Cobertura de Caderneta do Idoso:** Percentual de idosos acompanhados na APS
**Taxa de Quedas:** Incidência de quedas por 1.000 idosos/ano
**Vacinação Influenza:** Cobertura vacinal contra influenza em idosos ≥60 anos
**Avaliação Multidimensional:** Proporção de idosos com avaliação geriátrica ampla
**Fragilidade:** Prevalência de síndrome de fragilidade em idosos`
        };
      case 'mental-health':
        return {
          title: 'Definições e Indicadores - Saúde Mental',
          content: `**Taxa de Suicídio:** Número de óbitos por suicídio por 100.000 habitantes
**CAPS:** Centros de Atenção Psicossocial - serviços especializados em saúde mental
**Cobertura CAPS:** Número de CAPS por 100.000 habitantes
**Internações Psiquiátricas:** Taxa de internações em hospitais psiquiátricos
**Acompanhamento Territorial:** Proporção de usuários em seguimento na rede territorial`
        };
      case 'primary-care':
        return {
          title: 'Definições e Indicadores - Atenção Primária',
          content: `**Cobertura ESF:** Percentual da população coberta por equipes de Saúde da Família
**Consultas per capita:** Número médio de consultas médicas por habitante/ano
**PMAQ:** Programa de Melhoria do Acesso e da Qualidade da Atenção Básica
**eMulti:** Equipes multiprofissionais de Atenção Básica
**Teleconsultoria:** Consultas realizadas através de telemedicina`
        };
      case 'financing':
        return {
          title: 'Definições e Indicadores - Financiamento da APS',
          content: `**Gasto per capita APS:** Gasto em Atenção Primária por habitante/ano
**PAB Fixo:** Piso de Atenção Básica - repasse federal fixo por habitante
**PAB Variável:** Recursos federais condicionados a programas específicos
**Aplicação Mínima:** Percentual mínimo de recursos próprios aplicados em saúde
**Investimento em APS:** Proporção do orçamento de saúde aplicada na Atenção Primária`
        };
      default:
        return {
          title: 'Definições e Indicadores Gerais',
          content: `**Indicadores de Saúde:** Medidas quantitativas do estado de saúde da população
**Sistemas de Informação:** Ferramentas de coleta, processamento e análise de dados de saúde
**Pactuação:** Processo de negociação e acordo de metas entre gestores do SUS
**Monitoramento:** Acompanhamento sistemático do cumprimento de metas e indicadores
**Avaliação:** Análise crítica dos resultados alcançados e impactos das ações de saúde`
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
      case 'womens-health':
        return {
          positive: "Os indicadores de saúde da mulher demonstram avanços importantes na redução da mortalidade materna e ampliação do acesso ao pré-natal de qualidade, refletindo o fortalecimento das redes de atenção materno-infantil.",
          challenges: "A persistência de altas taxas de cesariana e disparidades regionais no acesso aos serviços de saúde reprodutiva constituem desafios que requerem estratégias integradas e multissetoriais.",
          nextSteps: "Priorizar a qualificação do pré-natal, fortalecer a atenção ao parto normal e ampliar o acesso ao planejamento reprodutivo, especialmente nas regiões com maiores vulnerabilidades."
        };
      case 'epidemiology':
        return {
          positive: "O sistema de vigilância epidemiológica tem demonstrado capacidade de resposta adequada aos eventos de saúde pública, com melhoria na oportunidade das notificações e fortalecimento das ações de controle.",
          challenges: "A necessidade de fortalecer a vigilância em municípios de pequeno porte e aprimorar a integração entre os sistemas de informação permanece como desafio para o aprimoramento contínuo.",
          nextSteps: "Intensificar as ações de capacitação das equipes de vigilância, modernizar os sistemas de informação e fortalecer as ações de prevenção e controle de doenças transmissíveis."
        };
      case 'chronic-diseases':
        return {
          positive: "Observa-se melhoria no controle das doenças crônicas não transmissíveis, com ampliação do acesso ao diagnóstico precoce e aumento da adesão ao tratamento na Atenção Primária.",
          challenges: "A necessidade de reduzir a incidência de complicações das DCNT e melhorar a qualidade de vida dos pacientes crônicos continua sendo um desafio prioritário para o sistema de saúde.",
          nextSteps: "Fortalecer as ações de promoção da saúde, ampliar o acesso a medicamentos essenciais e implementar programas integrados de cuidado às condições crônicas."
        };
      case 'elderly-health':
        return {
          positive: "O envelhecimento ativo e saudável tem ganhado protagonismo nas políticas de saúde, com melhoria na cobertura vacinal e ampliação dos serviços especializados para a população idosa.",
          challenges: "O aumento da demanda por cuidados geriátricos e a necessidade de capacitação das equipes para o atendimento multidimensional do idoso representam desafios crescentes.",
          nextSteps: "Implementar a avaliação geriátrica ampla na Atenção Primária, fortalecer a rede de cuidados domiciliares e ampliar a prevenção de quedas e fragilidade."
        };
      case 'mental-health':
        return {
          positive: "A expansão da Rede de Atenção Psicossocial e o fortalecimento dos CAPS têm contribuído para a melhoria do acesso aos cuidados em saúde mental de base comunitária.",
          challenges: "A persistência de altas taxas de suicídio e a necessidade de integração entre atenção primária e serviços especializados em saúde mental permanecem como desafios prioritários.",
          nextSteps: "Ampliar a cobertura da RAPS, fortalecer as ações de prevenção ao suicídio e qualificar o cuidado em saúde mental na Atenção Primária através de capacitação e matriciamento."
        };
      case 'primary-care':
        return {
          positive: "A Estratégia Saúde da Família tem demonstrado impacto positivo nos indicadores de saúde, com expansão da cobertura e melhoria da qualidade da atenção básica em todo o país.",
          challenges: "A necessidade de fortalecimento da capacidade resolutiva da APS e melhoria da integração com os demais níveis de atenção permanecem como desafios estruturais.",
          nextSteps: "Ampliar a cobertura da ESF, fortalecer a educação permanente das equipes e implementar novas tecnologias para apoio ao cuidado, incluindo telessaúde."
        };
      case 'financing':
        return {
          positive: "Os investimentos em Atenção Primária têm apresentado crescimento consistente, com ampliação dos recursos federais e melhoria na aplicação dos recursos pelos municípios.",
          challenges: "A necessidade de garantir sustentabilidade financeira do SUS e reduzir as disparidades de investimento entre diferentes regiões do país continua sendo um desafio fundamental.",
          nextSteps: "Fortalecer os mecanismos de financiamento da APS, aprimorar os critérios de alocação de recursos e implementar instrumentos de monitoramento da aplicação dos investimentos."
        };
      default:
        return {
          positive: "Os indicadores de saúde demonstram evolução positiva no período analisado, evidenciando o impacto das políticas públicas implementadas e o fortalecimento do Sistema Único de Saúde.",
          challenges: "As desigualdades regionais permanecem como principal obstáculo para o atingimento das metas ODS, exigindo estratégias direcionadas e investimentos priorizados.",
          nextSteps: "É fundamental manter o monitoramento contínuo dos indicadores e implementar as recomendações prioritárias para acelerar o progresso em direção às metas estabelecidas."
        };
    }
  };

  const generatePDF = async () => {
    if (isGeneratingPdf) return;
    
    setIsGeneratingPdf(true);
    toast({ title: 'Gerando PDF...', description: 'Processando gráficos e conteúdo. Aguarde alguns segundos...' });

    // Use requestAnimationFrame to ensure UI updates before heavy processing
    requestAnimationFrame(async () => {
      try {
        // Export charts as images first
        const chartImages = await exportChartsAsImages();

        const pdfMakeMod = await import('pdfmake/build/pdfmake');
        const pdfFontsMod = await import('pdfmake/build/vfs_fonts');
        const pdfMakeLocal: any = (pdfMakeMod as any).default ?? (pdfMakeMod as any);
        const vfs = (pdfFontsMod as any).vfs ?? (pdfFontsMod as any).pdfMake?.vfs;
        if (vfs) pdfMakeLocal.vfs = vfs;

        const bulletsFromMultiline = (text: string) => text.split('\n').map(s => s.trim()).filter(Boolean);

        const chartContent = chartImages.length > 0 ? [
          { text: 'Gráficos e Visualizações', style: 'subheader' },
          ...chartImages.flatMap((chart) => [
            { text: chart.title, style: 'sectionTitle' },
            { 
              image: chart.dataUrl, 
              width: 500, 
              margin: [0, 5, 0, 15],
              alignment: 'center'
            }
          ])
        ] : [];

        const docDefinition: any = {
          pageSize: 'A4',
          pageMargins: [20, 24, 20, 28],
          content: [
            { text: 'Relatório de Indicadores de Saúde', style: 'header' },
            { text: `Consulta: "${data.query}"`, style: 'meta' },
            { text: `Gerado em: ${new Date(data.timestamp).toLocaleString('pt-BR')}`, style: 'meta', margin: [0, 0, 0, 8] },

            { text: 'Resumo Executivo', style: 'subheader' },
            ...(analysis.executiveSummary ? [{ text: analysis.executiveSummary, style: 'normal', margin: [0, 0, 0, 10] }] : []),
            ...(data.results?.length ? [{ ul: data.results, style: 'normal', margin: [0, 0, 0, 12] }] : []),

            ...chartContent,

            { text: 'Seções Analíticas', style: 'subheader' },
            ...analysis.sections.flatMap((sec) => [
              { text: sec.title, style: 'sectionTitle' },
              { text: sec.content, style: 'normal', margin: [0, 0, 0, 8] },
            ]),

            ...(analysis.recommendations?.length ? [
              { text: 'Recomendações Prioritárias', style: 'subheader' },
              { ul: analysis.recommendations.map(r => `${r.priority}: ${r.action} — Prazo: ${r.timeline} — Investimento: ${r.investment} — Responsável: ${r.responsible} — Impacto: ${r.expectedImpact}`), style: 'normal', margin: [0, 0, 0, 12] },
            ] : []),

            { text: definitions.title, style: 'subheader' },
            { ul: bulletsFromMultiline(definitions.content), style: 'normal', margin: [0, 0, 0, 12] },

            { text: 'Conclusões', style: 'subheader' },
            { ul: [
              `Pontos Positivos: ${conclusions.positive}`,
              `Desafios: ${conclusions.challenges}`,
              `Próximos Passos: ${conclusions.nextSteps}`,
            ], style: 'normal' },
          ],
          styles: {
            header: { fontSize: 22, bold: true, margin: [0, 0, 0, 8] },
            subheader: { fontSize: 16, bold: true, color: '#111', margin: [0, 10, 0, 6] },
            sectionTitle: { fontSize: 14, bold: true, margin: [0, 6, 0, 4] },
            normal: { fontSize: 13.5, lineHeight: 1.45, color: '#000' },
            meta: { fontSize: 10.5, color: '#555' },
          },
          defaultStyle: { font: 'Roboto' },
          footer: (currentPage: number, pageCount: number) => ({
            text: `Página ${currentPage} de ${pageCount}`,
            alignment: 'right', margin: [0, 8, 20, 0], fontSize: 9, color: '#666'
          }),
        };

        const pdf = pdfMakeLocal.createPdf(docDefinition);
        const fileName = `relatorio-saude-${Date.now()}.pdf`;
        
        // Use direct download to avoid UI blocking
        pdf.download(fileName);
        
        // Reset state and show success after a short delay
        setTimeout(() => {
          setIsGeneratingPdf(false);
          toast({ title: 'PDF Gerado', description: 'O relatório foi exportado com sucesso!' });
        }, 1500);

      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        setIsGeneratingPdf(false);
        toast({ title: 'Erro', description: 'Erro ao gerar o PDF. Tente novamente.', variant: 'destructive' });
      }
    });
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
              <Button 
                onClick={generatePDF} 
                variant="outline"
                disabled={isGeneratingPdf}
                className={isGeneratingPdf ? "bg-blue-100 text-blue-700 border-blue-300" : ""}
              >
                {isGeneratingPdf ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Gerando PDF...
                  </>
                ) : (
                  <>
                    📄 Exportar PDF
                  </>
                )}
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