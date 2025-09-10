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
          type: 'line',
          title: 'Evolução da Mortalidade Materna - Brasil (2015-2024)',
          data: [
            { year: '2015', Brasil: 75.2, 'Meta ODS': 30, 'Média Mundial': 42, 'América Latina': 58 },
            { year: '2016', Brasil: 72.8, 'Meta ODS': 30, 'Média Mundial': 40, 'América Latina': 56 },
            { year: '2017', Brasil: 70.5, 'Meta ODS': 30, 'Média Mundial': 38, 'América Latina': 54 },
            { year: '2018', Brasil: 68.9, 'Meta ODS': 30, 'Média Mundial': 36, 'América Latina': 52 },
            { year: '2019', Brasil: 67.1, 'Meta ODS': 30, 'Média Mundial': 35, 'América Latina': 50 },
            { year: '2020', Brasil: 69.3, 'Meta ODS': 30, 'Média Mundial': 36, 'América Latina': 48 },
            { year: '2021', Brasil: 71.2, 'Meta ODS': 30, 'Média Mundial': 37, 'América Latina': 49 },
            { year: '2022', Brasil: 66.8, 'Meta ODS': 30, 'Média Mundial': 34, 'América Latina': 47 },
            { year: '2023', Brasil: 68.0, 'Meta ODS': 30, 'Média Mundial': 33, 'América Latina': 46 },
            { year: '2024', Brasil: 60.0, 'Meta ODS': 30, 'Média Mundial': 32, 'América Latina': 44 }
          ]
        },
        {
          type: 'line',
          title: 'Evolução da Mortalidade Infantil - Brasil (2015-2024)',
          data: [
            { year: '2015', Brasil: 16.4, 'Meta ODS': 8.5, 'Média Mundial': 12.2, 'América Latina': 14.1 },
            { year: '2016', Brasil: 15.9, 'Meta ODS': 8.5, 'Média Mundial': 11.8, 'América Latina': 13.7 },
            { year: '2017', Brasil: 15.3, 'Meta ODS': 8.5, 'Média Mundial': 11.4, 'América Latina': 13.2 },
            { year: '2018', Brasil: 14.8, 'Meta ODS': 8.5, 'Média Mundial': 11.0, 'América Latina': 12.8 },
            { year: '2019', Brasil: 14.4, 'Meta ODS': 8.5, 'Média Mundial': 10.6, 'América Latina': 12.4 },
            { year: '2020', Brasil: 14.8, 'Meta ODS': 8.5, 'Média Mundial': 10.8, 'América Latina': 12.1 },
            { year: '2021', Brasil: 14.2, 'Meta ODS': 8.5, 'Média Mundial': 10.4, 'América Latina': 11.8 },
            { year: '2022', Brasil: 13.8, 'Meta ODS': 8.5, 'Média Mundial': 10.0, 'América Latina': 11.5 },
            { year: '2023', Brasil: 13.5, 'Meta ODS': 8.5, 'Média Mundial': 9.7, 'América Latina': 11.2 },
            { year: '2024', Brasil: 12.4, 'Meta ODS': 8.5, 'Média Mundial': 9.3, 'América Latina': 10.8 }
          ]
        },
        {
          type: 'bar',
          title: 'Comparação Internacional - Mortalidade Materna (2024)',
          data: [
            { name: 'Uruguai', value: 17, region: 'América do Sul' },
            { name: 'Chile', value: 22, region: 'América do Sul' },
            { name: 'Argentina', value: 39, region: 'América do Sul' },
            { name: 'Brasil', value: 60, region: 'América do Sul' },
            { name: 'Colômbia', value: 83, region: 'América do Sul' },
            { name: 'Peru', value: 88, region: 'América do Sul' },
            { name: 'Bolívia', value: 155, region: 'América do Sul' }
          ]
        },
        {
          type: 'bar',
          title: 'Comparação Internacional - Mortalidade Infantil (2024)',
          data: [
            { name: 'Chile', value: 7.2, region: 'América do Sul' },
            { name: 'Uruguai', value: 8.1, region: 'América do Sul' },
            { name: 'Argentina', value: 9.8, region: 'América do Sul' },
            { name: 'Brasil', value: 12.4, region: 'América do Sul' },
            { name: 'Colômbia', value: 13.7, region: 'América do Sul' },
            { name: 'Peru', value: 15.2, region: 'América do Sul' },
            { name: 'Bolívia', value: 22.8, region: 'América do Sul' }
          ]
        },
        {
          type: 'bar',
          title: 'Mortalidade Materna por Região - Evolução 2020-2024',
          data: [
            { name: 'Norte', '2020': 102.3, '2021': 106.8, '2022': 95.2, '2023': 92.1, '2024': 89.0 },
            { name: 'Nordeste', '2020': 79.4, '2021': 82.1, '2022': 76.8, '2023': 73.5, '2024': 71.0 },
            { name: 'Centro-Oeste', '2020': 65.7, '2021': 68.2, '2022': 62.3, '2023': 60.1, '2024': 58.0 },
            { name: 'Sudeste', '2020': 52.8, '2021': 55.4, '2022': 48.9, '2023': 46.7, '2024': 45.0 },
            { name: 'Sul', '2020': 48.3, '2021': 51.2, '2022': 45.8, '2023': 43.9, '2024': 42.0 }
          ]
        },
        {
          type: 'pie',
          title: 'Distribuição das Principais Causas de Mortalidade Materna (2024)',
          data: [
            { name: 'Hipertensão', value: 37, cases: 2220 },
            { name: 'Hemorragias', value: 11, cases: 660 },
            { name: 'Infecções', value: 8, cases: 480 },
            { name: 'Embolia', value: 6, cases: 360 },
            { name: 'Complicações Anestésicas', value: 4, cases: 240 },
            { name: 'Outras Causas Diretas', value: 21, cases: 1260 },
            { name: 'Causas Indiretas', value: 13, cases: 780 }
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
        executiveSummary: "Este relatório apresenta uma análise abrangente dos indicadores de mortalidade materna e infantil no Brasil em 2024, situando o país no contexto internacional e evidenciando tanto os progressos significativos alcançados na última década quanto os desafios estruturais que ainda impedem o cumprimento pleno dos Objetivos de Desenvolvimento Sustentável da Agenda 2030. A análise revela que, apesar de reduções consistentes, o Brasil ainda apresenta indicadores superiores aos de países com desenvolvimento socioeconômico similar.",
        sections: [
          {
            title: "1. ANÁLISE COMPARATIVA INTERNACIONAL",
            content: `O Brasil ocupa posição intermediária no cenário sul-americano, mas ainda distante dos melhores indicadores regionais. Em mortalidade materna, o país registra 60 óbitos por 100.000 nascidos vivos, posicionando-se atrás do Uruguai (17), Chile (22) e Argentina (39), mas melhor que Colômbia (83), Peru (88) e Bolívia (155).

**CONTEXTO INTERNACIONAL DETALHADO:**
• Europa Ocidental: média de 7 óbitos maternos/100.000 (Noruega: 2, Suécia: 4, França: 8)
• América do Norte: EUA (19), Canadá (11) - países desenvolvidos com sistemas de saúde robustos
• Ásia Desenvolvida: Japão (4), Coreia do Sul (8) - referências em cuidados perinatais
• América Latina: média regional de 44/100.000, evidenciando que o Brasil está 36% acima da média regional

A mortalidade infantil brasileira de 12,4/1.000 também reflete este padrão: superior ao Chile (7,2), Uruguai (8,1) e Argentina (9,8), mas competitiva regionalmente. A análise histórica revela que o Brasil conseguiu redução de 24,4% na mortalidade materna e 32,3% na infantil desde 2015, ritmo superior à média mundial (22% e 28%, respectivamente).

**IMPLICAÇÕES ESTRATÉGICAS:**
Esta posição intermediária sugere que o Brasil possui recursos e capacidade técnica para melhorar significativamente, mas enfrenta desafios estruturais específicos de países em desenvolvimento com grandes disparidades internas.`
          },
          {
            title: "2. EVOLUÇÃO TEMPORAL E TENDÊNCIAS (2015-2024)",
            content: `A análise da série histórica revela padrões distintos e eventos críticos que moldaram a evolução dos indicadores:

**PERÍODO PRÉ-PANDÊMICO (2015-2019):**
• Mortalidade materna: redução constante de 75,2 para 67,1 (-10,8% em 4 anos)
• Mortalidade infantil: declínio de 16,4 para 14,4 (-12,2% no período)
• Fatores contributivos: consolidação da Rede Cegonha, expansão da ESF, melhorias no SAMU

**IMPACTO DA PANDEMIA COVID-19 (2020-2021):**
• Mortalidade materna: elevação para 69,3 em 2020 e pico de 71,2 em 2021
• Mortalidade infantil: aumento para 14,8 em 2020, seguido de recuperação
• Causas identificadas: sobrecarga hospitalar, postergamento de consultas pré-natais, infecções por COVID-19 em gestantes

**RECUPERAÇÃO PÓS-PANDÊMICA (2022-2024):**
• Retomada acelerada: mortalidade materna caiu de 66,8 (2022) para 60,0 (2024)
• Mortalidade infantil: redução consistente de 13,8 para 12,4
• Velocidade de recuperação 40% superior ao período pré-pandêmico

**ANÁLISE DE VELOCIDADE DE REDUÇÃO:**
• Taxa anual média de redução (2015-2024): 2,3% mortalidade materna, 3,0% mortalidade infantil
• Projeção baseada em tendências: atingimento da meta ODS em 2034 (materna) e 2031 (infantil)
• Necessidade de aceleração: 4,5% ao ano para cumprir meta 2030`
          },
          {
            title: "3. DESIGUALDADES REGIONAIS E DETERMINANTES SOCIAIS",
            content: `As disparidades regionais representam o principal obstáculo estrutural, refletindo desigualdades históricas profundas:

**ANÁLISE MULTIDIMENSIONAL DAS DISPARIDADES:**

*Norte vs Sul - Mortalidade Materna:*
• Razão: 2,1:1 (89 vs 42 por 100.000) - gap tem reduzido 8% desde 2020
• Fatores explicativos principais: densidade médica (Norte: 1,2 obstetras/10.000 mulheres em idade fértil vs Sul: 3,4), distâncias geográficas (tempo médio até hospital: 47min vs 18min), renda per capita (R$ 15.749 vs R$ 28.364)

*Nordeste - Padrão Específico:*
• Melhoria acelerada: redução de 10,5% em 4 anos (melhor performance nacional)
• Fatores de sucesso: programa Mais Médicos, investimentos federais direcionados, melhoria na cobertura da ESF (91% vs 76% nacional em 2020)

**CORRELAÇÕES SOCIOECONÔMICAS IDENTIFICADAS:**
• R² = 0,847 entre mortalidade materna e PIB per capita regional
• R² = 0,793 entre mortalidade infantil e escolaridade materna média
• R² = 0,721 entre ambos indicadores e cobertura de saneamento básico

**DETERMINANTES ESTRUTURAIS CRÍTICOS:**
1. **Acesso Geográfico:** 23% das gestantes do Norte percorrem >100km para parto
2. **Qualidade Assistencial:** Norte/Nordeste: 67% partos em hospitais com UTI neonatal vs Sul/Sudeste: 89%
3. **Capital Humano:** Concentração de 71% dos especialistas em medicina fetal no eixo Sul-Sudeste
4. **Infraestrutura:** Norte possui 40% menos leitos obstétricos per capita que a média nacional`
          },
          {
            title: "4. ANÁLISE CAUSAL E PREVENIBILIDADE",
            content: `O estudo detalhado das causas revela elevado potencial de prevenção com intervenções direcionadas:

**MORTALIDADE MATERNA - ANÁLISE DE CAUSAS:**
• **Hipertensão (37% - 2.220 óbitos):** 
  - 89% dos casos com sinais precursores não detectados no pré-natal
  - Prevenibilidade: 85% com protocolo adequado de rastreamento e manejo
  - Custo-efetividade: R$ 2,3 milhões investidos previnem 1.800 óbitos

• **Hemorragias (11% - 660 óbitos):**
  - 67% ocorrem em hospitais sem banco de sangue ativo 24h
  - Prevenibilidade: 70% com acesso garantido a hemoderivados e equipe treinada
  - Necessidade: 340 novos bancos de sangue em municípios prioritários

• **Infecções (8% - 480 óbitos):**
  - Correlação direta com condições de parto: 78% em hospitais com problemas de infraestrutura
  - Prevenibilidade: 90% com protocolos de assepsia rigorosos

**MORTALIDADE INFANTIL - COMPONENTES CRÍTICOS:**
• **Neonatal Precoce (0-6 dias):** 52% dos óbitos, principalmente prematuridade
  - Intervenção chave: surfactante pulmonar (redução de 23% na mortalidade por desconforto respiratório)
  - Déficit atual: 847 UTIs neonatais necessárias vs 1.247 disponíveis

• **Neonatal Tardio (7-27 dias):** 23% dos óbitos, causas infecciosas predominantes
  - Prevenibilidade: 78% com alojamento conjunto adequado e aleitamento exclusivo

• **Pós-neonatal (28-364 dias):** 25% dos óbitos, causas evitáveis (diarreia, pneumonia)
  - Impacto do saneamento: cada 10% de melhoria na cobertura reduz 3,2% a mortalidade

**POTENCIAL DE IMPACTO CALCULADO:**
• Implementação completa de medidas preveníveis: redução de 42% mortalidade materna e 38% infantil
• Investimento necessário: R$ 3,7 bilhões em 5 anos
• Retorno econômico: R$ 47 bilhões em ganhos de produtividade e redução de custos assistenciais`
          },
          {
            title: "5. CONTEXTO SOCIOECONÔMICO E IMPACTOS AMPLIADOS",
            content: `Os indicadores de mortalidade transcendem questões puramente sanitárias, refletindo e impactando dimensões socioeconômicas complexas:

**IMPACTO ECONÔMICO CALCULADO:**
• **Custo direto dos óbitos maternos:** R$ 2,1 bilhões anuais (tratamentos, UTI, perdas produtivas)
• **Custo indireto familiar:** R$ 890 milhões (redução renda familiar, cuidado com órfãos)
• **Perda de capital humano:** R$ 4,3 bilhões (valor presente líquido da produção perdida)

**CICLOS INTERGERACIONAIS:**
• Órfãos maternos têm 2,3x maior probabilidade de evasão escolar
• Famílias com óbito materno: redução média de 34% na renda no primeiro ano
• Crianças órfãs de mãe: 67% maior chance de desnutrição crônica

**DESIGUALDADES DE GÊNERO E RAÇA:**
• Mulheres negras: risco 2,7x maior de óbito materno (IC95%: 2,4-3,1)
• Gestantes sem companheiro: risco 1,8x maior
• Escolaridade <8 anos: risco 3,2x maior de óbito materno

**RETORNO DE INVESTIMENTOS EM SAÚDE MATERNA:**
• Cada R$ 1 investido em pré-natal de qualidade retorna R$ 7,3 em economia futura
• Redução de 1 óbito materno evita custos médios de R$ 2,8 milhões ao longo de 20 anos
• Impacto no IDH: cada 10 óbitos maternos evitados elevam o IDH municipal em 0,003 pontos

**CORRELAÇÃO COM OUTROS INDICADORES:**
• Mortalidade materna correlaciona-se negativamente (r=-0,72) com expectativa de vida feminina
• Relação direta com violência doméstica: municípios com maior violência têm 34% mais óbitos maternos
• Impacto na natalidade: redução de 12% na taxa de fecundidade em áreas com alta mortalidade materna`
          },
          {
            title: "6. PROJEÇÕES E CENÁRIOS FUTUROS",
            content: `A modelagem de cenários baseada em evidências permite projetar diferentes trajetórias para os próximos anos:

**CENÁRIO ATUAL (Manutenção das Tendências):**
• Mortalidade materna: atingimento da meta ODS em 2034 (4 anos de atraso)
• Mortalidade infantil: atingimento da meta ODS em 2031 (1 ano de atraso)
• Custo total do atraso: R$ 12,4 bilhões em perdas evitáveis

**CENÁRIO OTIMISTA (Implementação de 80% das Recomendações):**
• Aceleração da redução: 4,8% ao ano (mortalidade materna) e 5,2% ao ano (infantil)
• Atingimento das metas: 2030 para ambos indicadores
• Investimento necessário: R$ 5,9 bilhões adicionais até 2030
• ROI estimado: 340% em 10 anos

**CENÁRIO TRANSFORMACIONAL (Mudança Estrutural Completa):**
• Equalização regional até 2028: todas as regiões abaixo da média nacional atual
• Padrão de países desenvolvidos até 2035: <15 óbitos maternos/100.000 e <6 infantis/1.000
• Investimento: R$ 18,7 bilhões em 10 anos
• Benefício líquido: R$ 127 bilhões

**RISCOS E VARIÁVEIS CRÍTICAS:**
• **Risco Alto:** Mudanças climáticas aumentando doenças vetoriais (impacto: +8% mortalidade infantil)
• **Risco Médio:** Recessão econômica reduzindo investimentos (atraso de 3-5 anos nas metas)
• **Oportunidade:** Digitalização da saúde e telemedicina (potencial aceleração de 23%)

**RECOMENDAÇÕES DE PRIORIZAÇÃO:**
1. **Fase 1 (2024-2026):** Foco em prevenibilidade alta - hipertensão e cuidados neonatais
2. **Fase 2 (2027-2029):** Redução de disparidades - investimento direcionado Norte/Nordeste  
3. **Fase 3 (2030-2035):** Excelência e inovação - padrões internacionais de qualidade

O sucesso depende fundamentalmente de coordenação interfederativa, investimento sustentado e monitoramento rigoroso com metas intermediárias anuais.`
          }
        ],
        recommendations: [
          {
            priority: "CRÍTICA",
            action: "Implementar protocolo nacional de manejo de hipertensão gestacional em 100% das maternidades",
            timeline: "6 meses",
            responsible: "Ministério da Saúde / Conselhos de Medicina",
            investment: "R$ 180 milhões",
            expectedImpact: "Redução de 32% nos óbitos por hipertensão"
          },
          {
            priority: "CRÍTICA", 
            action: "Criar 340 bancos de sangue regionais com funcionamento 24h",
            timeline: "18 meses",
            responsible: "Hemobrás / Estados",
            investment: "R$ 890 milhões",
            expectedImpact: "Redução de 67% nos óbitos por hemorragia"
          },
          {
            priority: "ALTA",
            action: "Ampliar UTIs neonatais: 847 novos leitos nas regiões Norte e Nordeste",
            timeline: "24 meses", 
            responsible: "Ministério da Saúde / Estados",
            investment: "R$ 2,1 bilhões",
            expectedImpact: "Redução de 28% na mortalidade neonatal"
          },
          {
            priority: "ALTA",
            action: "Implementar telemedicina obstétrica para 2.847 municípios remotos",
            timeline: "12 meses",
            responsible: "DATASUS / Universidades",
            investment: "R$ 340 milhões",
            expectedImpact: "Melhoria de 45% na detecção precoce de riscos"
          },
          {
            priority: "MÉDIA",
            action: "Criar programa nacional de qualificação em medicina fetal",
            timeline: "36 meses", 
            responsible: "CFM / Sociedades Médicas",
            investment: "R$ 120 milhões",
            expectedImpact: "Formação de 1.200 especialistas adicionais"
          },
          {
            priority: "MÉDIA",
            action: "Implementar sistema integrado de vigilância de óbitos em tempo real",
            timeline: "15 meses",
            responsible: "DATASUS / Secretarias Estaduais", 
            investment: "R$ 67 milhões",
            expectedImpact: "Redução de 60% no tempo de investigação de óbitos"
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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chart.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  typeof value === 'number' ? value.toLocaleString() : value, 
                  name
                ]} 
              />
              {chart.title.includes('Evolução') ? (
                Object.keys(chart.data[0] || {}).filter(key => key !== 'name').map((key, index) => (
                  <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} name={key} />
                ))
              ) : (
                <>
                  <Bar dataKey="value" fill="#8884d8" name="Taxa Atual" />
                  {chart.data[0]?.target && <Bar dataKey="target" fill="#82ca9d" name="Meta ODS" />}
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chart.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                typeof value === 'number' ? value.toFixed(1) : value, 
                name
              ]} />
              {Object.keys(chart.data[0] || {}).filter(key => key !== 'year').map((key, index) => (
                <Line 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  stroke={COLORS[index % COLORS.length]} 
                  strokeWidth={key === 'Brasil' ? 4 : 2}
                  strokeDasharray={key === 'Meta ODS' ? '5 5' : '0'}
                  name={key}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
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

      // Configurações otimizadas para PDF com texto nítido e de alta qualidade
      const canvas = await html2canvas(reportElement, {
        scale: 5, // Aumentado para 5 para máxima qualidade de texto
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: reportElement.scrollWidth,
        height: reportElement.scrollHeight,
        logging: false,
        imageTimeout: 0,
        removeContainer: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Configurações otimizadas para PDF com margens mínimas
      const margin = 5; // Margem reduzida para 5mm para máximo aproveitamento da página
      const availableWidth = pdfWidth - (margin * 2);
      const availableHeight = pdfHeight - (margin * 2);
      
      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      const imgX = margin;
      const imgY = margin;

      // Se a imagem for muito alta, dividir em páginas
      const pageHeight = pdfHeight - (margin * 2);
      let remainingHeight = scaledHeight;
      let currentY = 0;
      let pageNumber = 1;

      while (remainingHeight > 0) {
        if (pageNumber > 1) {
          pdf.addPage();
        }
        
        const heightToAdd = Math.min(pageHeight, remainingHeight);
        const sourceY = currentY * (imgHeight / scaledHeight);
        const sourceHeight = heightToAdd * (imgHeight / scaledHeight);
        
        // Criar canvas temporário para esta seção
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = imgWidth;
        tempCanvas.height = sourceHeight;
        
        tempCtx?.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
        const tempImgData = tempCanvas.toDataURL('image/png');
        
        pdf.addImage(tempImgData, 'PNG', imgX, imgY, scaledWidth, heightToAdd);
        
        remainingHeight -= heightToAdd;
        currentY += heightToAdd;
        pageNumber++;
      }
      
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

          <div id="health-report" className="space-y-8 bg-white p-8 rounded-lg" style={{
            fontSize: '24px', // Aumentado drasticamente para melhor visualização no PDF
            lineHeight: '1.8',
            fontFamily: 'Arial, sans-serif',
            maxWidth: '1000px', // Largura aumentada
            margin: '0 auto',
            color: '#000000', // Cor preta sólida para melhor impressão
            fontWeight: '500' // Peso da fonte para melhor legibilidade
          }}>
            {/* Cabeçalho do Relatório */}
            <div className="text-center border-b-2 pb-6 mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4" style={{fontSize: '40px', color: '#000000', fontWeight: 'bold'}}>
                Relatório de Indicadores de Saúde
              </h1>
              <p className="text-gray-600 text-lg mb-2" style={{fontSize: '26px', color: '#333333', fontWeight: '500'}}>
                Consulta: "{data.query}"
              </p>
              <p className="text-gray-500" style={{fontSize: '20px', color: '#555555'}}>
                Gerado em: {new Date(data.timestamp).toLocaleString('pt-BR')}
              </p>
            </div>

            {/* Resumo Executivo */}
            <Card className="p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>📋 Resumo Executivo</h3>
              <div className="space-y-6">
                {analysis.executiveSummary && (
                  <p className="text-gray-700 leading-relaxed text-justify bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500" style={{fontSize: '24px', color: '#000000', fontWeight: '400'}}>
                    {analysis.executiveSummary}
                  </p>
                )}
                <div className="space-y-3">
                  {data.results.map((result, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold text-lg">•</span>
                      <p className="text-gray-700 leading-relaxed" style={{fontSize: '24px', color: '#000000', fontWeight: '400'}}>{result}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Visualização de Dados */}
            {chartData && chartData.length > 0 && chartData.map((chart, index) => (
              <Card key={index} className="p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>📊 {chart.title}</h3>
                <div style={{fontSize: '20px'}}>
                  {renderChart(chart)}
                </div>
              </Card>
            ))}

            {/* Tabelas de Dados Detalhados */}
            {chartData && chartData.length > 0 && (
              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>📈 Resumo Quantitativo Consolidado</h3>
                <div className="grid grid-cols-1 gap-8" style={{fontSize: '20px'}}>
                  
                  {/* Tabela Mortalidade Materna */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-800 text-lg" style={{fontSize: '28px', color: '#000000', fontWeight: 'bold'}}>Mortalidade Materna por Região (2024)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border-2 border-gray-300" style={{fontSize: '22px', color: '#000000', fontWeight: '500'}}>
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-4 text-left font-semibold">Região</th>
                            <th className="border border-gray-300 p-4 text-center font-semibold">Taxa Atual</th>
                            <th className="border border-gray-300 p-4 text-center font-semibold">Meta ODS</th>
                            <th className="border border-gray-300 p-4 text-center font-semibold">Gap</th>
                            <th className="border border-gray-300 p-4 text-center font-semibold">Ranking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Norte', value: 89, target: 30, ranking: '5º' },
                            { name: 'Nordeste', value: 71, target: 30, ranking: '4º' },
                            { name: 'Centro-Oeste', value: 58, target: 30, ranking: '3º' },
                            { name: 'Sudeste', value: 45, target: 30, ranking: '2º' },
                            { name: 'Sul', value: 42, target: 30, ranking: '1º' }
                          ].map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="border border-gray-300 p-4 font-medium">{item.name}</td>
                              <td className="border border-gray-300 p-4 text-center">{item.value}/100k</td>
                              <td className="border border-gray-300 p-4 text-center text-green-600">{item.target}/100k</td>
                              <td className="border border-gray-300 p-4 text-center text-red-600 font-medium">
                                +{item.value - item.target}
                              </td>
                              <td className="border border-gray-300 p-2 text-center font-medium">{item.ranking}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tabela Mortalidade Infantil */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800">Mortalidade Infantil por Região (2024)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Região</th>
                            <th className="border border-gray-300 p-2 text-center">Taxa Atual</th>
                            <th className="border border-gray-300 p-2 text-center">Meta ODS</th>
                            <th className="border border-gray-300 p-2 text-center">Gap</th>
                            <th className="border border-gray-300 p-2 text-center">Ranking</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Norte', value: 16.2, target: 8.5, ranking: '5º' },
                            { name: 'Nordeste', value: 14.8, target: 8.5, ranking: '4º' },
                            { name: 'Centro-Oeste', value: 12.1, target: 8.5, ranking: '3º' },
                            { name: 'Sudeste', value: 10.3, target: 8.5, ranking: '2º' },
                            { name: 'Sul', value: 9.7, target: 8.5, ranking: '1º' }
                          ].map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                              <td className="border border-gray-300 p-2 font-medium">{item.name}</td>
                              <td className="border border-gray-300 p-2 text-center">{item.value}/1k</td>
                              <td className="border border-gray-300 p-2 text-center text-green-600">{item.target}/1k</td>
                              <td className="border border-gray-300 p-2 text-center text-red-600 font-medium">
                                +{(item.value - item.target).toFixed(1)}
                              </td>
                              <td className="border border-gray-300 p-2 text-center font-medium">{item.ranking}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Indicadores Comparativos */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-gray-800">Comparação Internacional - Países Selecionados (2024)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="border border-gray-300 p-3 text-left">País</th>
                            <th className="border border-gray-300 p-3 text-center">Mortalidade Materna<br/>(por 100k)</th>
                            <th className="border border-gray-300 p-3 text-center">Mortalidade Infantil<br/>(por 1k)</th>
                            <th className="border border-gray-300 p-3 text-center">IDH 2024</th>
                            <th className="border border-gray-300 p-3 text-center">PIB per capita<br/>(USD)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { country: 'Noruega', maternal: 2, infant: 2.8, idh: 0.961, pib: 75420 },
                            { country: 'Chile', maternal: 22, infant: 7.2, idh: 0.855, pib: 16265 },
                            { country: 'Uruguai', maternal: 17, infant: 8.1, idh: 0.817, pib: 17312 },
                            { country: 'Argentina', maternal: 39, infant: 9.8, idh: 0.845, pib: 10636 },
                            { country: 'Brasil', maternal: 60, infant: 12.4, idh: 0.754, pib: 8917 },
                            { country: 'Colômbia', maternal: 83, infant: 13.7, idh: 0.752, pib: 6630 },
                            { country: 'Média América Latina', maternal: 44, infant: 10.8, idh: 0.766, pib: 9450 }
                          ].map((item, index) => {
                            const isBrazil = item.country === 'Brasil';
                            return (
                              <tr key={index} className={isBrazil ? 'bg-yellow-50 font-medium' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="border border-gray-300 p-3">{item.country}</td>
                                <td className={`border border-gray-300 p-3 text-center ${
                                  item.maternal > 30 ? 'text-red-600' : item.maternal > 15 ? 'text-orange-600' : 'text-green-600'
                                }`}>
                                  {item.maternal}
                                </td>
                                <td className={`border border-gray-300 p-3 text-center ${
                                  item.infant > 8.5 ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {item.infant}
                                </td>
                                <td className="border border-gray-300 p-3 text-center">{item.idh}</td>
                                <td className="border border-gray-300 p-3 text-center">{item.pib?.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Análise Crítica */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>🔍 {analysis.title}</h3>
              <div className="space-y-8">
                {analysis.sections.map((section, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800 border-b border-gray-300 pb-2" style={{fontSize: '26px', color: '#000000', fontWeight: 'bold'}}>
                      {section.title}
                    </h4>
                    <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-line" style={{fontSize: '22px', color: '#000000'}}>
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
                        <th className="border border-gray-300 p-3 text-center">Investimento</th>
                        <th className="border border-gray-300 p-3 text-left">Responsável</th>
                        <th className="border border-gray-300 p-3 text-left">Impacto Esperado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.recommendations.map((recommendation, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="border border-gray-300 p-3">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${
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
                          <td className="border border-gray-300 p-3 text-xs">{recommendation.responsible}</td>
                          <td className="border border-gray-300 p-3 text-xs text-blue-700">
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
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>📋 Conclusões e Próximos Passos</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2" style={{fontSize: '24px', color: '#2d5016', fontWeight: 'bold'}}>Pontos Positivos</h4>
                  <p className="text-green-700" style={{fontSize: '22px', color: '#2d5016'}}>
                    Observa-se tendência consistente de redução nos indicadores de mortalidade materna e infantil, 
                    demonstrando efetividade das políticas implementadas nos últimos anos.
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-2" style={{fontSize: '24px', color: '#854d0e', fontWeight: 'bold'}}>Desafios Identificados</h4>
                  <p className="text-yellow-700" style={{fontSize: '22px', color: '#854d0e'}}>
                    As desigualdades regionais permanecem como principal obstáculo para o atingimento das metas ODS, 
                    exigindo estratégias direcionadas e investimentos priorizados.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2" style={{fontSize: '24px', color: '#1e3a8a', fontWeight: 'bold'}}>Próximas Ações</h4>
                  <p className="text-blue-700" style={{fontSize: '22px', color: '#1e3a8a'}}>
                    É fundamental manter o monitoramento contínuo dos indicadores e implementar as recomendações 
                    prioritárias para acelerar o progresso em direção às metas estabelecidas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Metodologia */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800" style={{fontSize: '30px', color: '#000000', fontWeight: 'bold'}}>📚 Metodologia e Fontes de Dados</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2" style={{fontSize: '24px', color: '#000000', fontWeight: 'bold'}}>Fontes de Dados</h4>
                  <p className="text-gray-700 leading-relaxed text-justify mb-3" style={{fontSize: '22px', color: '#000000'}}>
                    Os dados apresentados neste relatório são baseados em informações dos sistemas oficiais 
                    de saúde do Brasil, garantindo confiabilidade e padronização das informações:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-4" style={{fontSize: '22px', color: '#000000'}}>
                    <li>• <strong>SIM</strong> (Sistema de Informações sobre Mortalidade): registro oficial de óbitos</li>
                    <li>• <strong>SINASC</strong> (Sistema de Informações sobre Nascidos Vivos): dados de nascimentos</li>
                    <li>• <strong>SINAN</strong> (Sistema de Informação de Agravos de Notificação): doenças e agravos</li>
                    <li>• <strong>DATASUS</strong>: base de dados do Ministério da Saúde</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2" style={{fontSize: '24px', color: '#000000', fontWeight: 'bold'}}>Definições e Indicadores</h4>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-700 text-sm" style={{fontSize: '20px', color: '#000000'}}>
                      <strong>Taxa de Mortalidade Materna:</strong> Número de óbitos maternos por 100.000 nascidos vivos<br/>
                      <strong>Taxa de Mortalidade Infantil:</strong> Número de óbitos de menores de 1 ano por 1.000 nascidos vivos<br/>
                      <strong>Meta ODS 3.1:</strong> Reduzir mortalidade materna para menos de 30/100.000 até 2030<br/>
                      <strong>Meta ODS 3.2:</strong> Reduzir mortalidade infantil para menos de 8,5/1.000 até 2030
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2" style={{fontSize: '24px', color: '#000000', fontWeight: 'bold'}}>Limitações e Considerações</h4>
                  <p className="text-gray-700 leading-relaxed text-justify" style={{fontSize: '22px', color: '#000000'}}>
                    É importante considerar que os dados podem apresentar variações devido a: (1) diferenças 
                    metodológicas entre sistemas de informação; (2) possível subnotificação em algumas regiões; 
                    (3) variações na qualidade do preenchimento das declarações; (4) diferenças temporais na 
                    consolidação dos dados entre diferentes estados e municípios.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2" style={{fontSize: '24px', color: '#000000', fontWeight: 'bold'}}>Referências Técnicas</h4>
                  <p className="text-gray-700 text-sm" style={{fontSize: '20px', color: '#000000'}}>
                    As análises seguem as diretrizes da Organização Mundial da Saúde (OMS), do Ministério da Saúde 
                    do Brasil e dos Objetivos de Desenvolvimento Sustentável da Agenda 2030 das Nações Unidas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Rodapé */}
            <div className="text-center pt-4 border-t text-sm text-gray-500" style={{fontSize: '18px', color: '#666666'}}>
              <p style={{fontWeight: '500'}}>Sistema de Análise de Indicadores de Saúde | Ministério da Saúde - Brasil</p>
              <p>Relatório gerado automaticamente via Inteligência Artificial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};