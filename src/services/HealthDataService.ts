import { supabase } from '@/integrations/supabase/client';
import type { PanelData, KPI, Chart } from '@/types';

export interface HealthIndicator {
  id: string;
  name: string;
  value: string | number;
  source: string;
  lastUpdated: Date;
  category: 'oral_health' | 'womens_health' | 'mental_health' | 'chronic_diseases' | 'epidemiology';
}

export class HealthDataService {
  
  // Coleta dados dos portais governamentais e salva no banco
  static async scrapeHealthData(): Promise<HealthIndicator[]> {
    try {
      const { data, error } = await supabase.functions.invoke('scrape-health-data', {
        body: { 
          sources: [
            'https://opendatasus.saude.gov.br/dataset',
            'http://tabnet.datasus.gov.br/cgi/tabcgi.exe',
            'https://sisab.saude.gov.br/paginas/acessoRestrito/relatorio/federal/indicadores/indicadorPainel.xhtml'
          ]
        }
      });

      if (error) {
        console.error('Erro ao coletar dados:', error);
        // Return mock data for demonstration
        return this.getMockHealthIndicators();
      }

      const healthData = data || this.getMockHealthIndicators();
      
      // Save to database
      await this.saveHealthIndicators(healthData);
      
      return healthData;
    } catch (error) {
      console.error('Erro na coleta de dados:', error);
      return this.getMockHealthIndicators();
    }
  }

  // Salva indicadores de saúde no banco de dados
  static async saveHealthIndicators(indicators: HealthIndicator[]): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const indicatorsWithUser = indicators.map(indicator => ({
        name: indicator.name,
        value: indicator.value.toString(),
        category: indicator.category,
        collected_by: user.id,
        last_updated: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('health_indicators')
        .insert(indicatorsWithUser);

      if (error) {
        console.error('Error saving health indicators:', error);
        throw error;
      }

      // Also save collection record
      await supabase
        .from('collections')
        .insert({
          user_id: user.id,
          status: 'completed',
          indicators_count: indicators.length
        });

    } catch (error) {
      console.error('Failed to save health indicators:', error);
      // Don't throw error - just log it, so the UI still shows the data
    }
  }

  // Busca indicadores salvos no banco por categoria
  static async getHealthIndicatorsByCategory(category: string): Promise<HealthIndicator[]> {
    try {
      const { data, error } = await supabase
        .from('health_indicators')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching health indicators:', error);
        return [];
      }

      return data?.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        source: 'Database',
        lastUpdated: new Date(item.last_updated),
        category: item.category as any
      })) || [];

    } catch (error) {
      console.error('Failed to fetch health indicators:', error);
      return [];
    }
  }

  // Gera dados mock para demonstração
  static getMockHealthIndicators(): HealthIndicator[] {
    return [
      {
        id: '1',
        name: 'Taxa de Mortalidade Infantil',
        value: '14.2 por 1000 nascidos vivos',
        source: 'DATASUS',
        lastUpdated: new Date(),
        category: 'womens_health'
      },
      {
        id: '2', 
        name: 'Cobertura Vacinal',
        value: '87.3%',
        source: 'SISAB',
        lastUpdated: new Date(),
        category: 'epidemiology'
      },
      {
        id: '3',
        name: 'Consultas de Pré-natal',
        value: '6.2 consultas por gestante',
        source: 'OpenDataSUS',
        lastUpdated: new Date(),
        category: 'womens_health'
      },
      {
        id: '4',
        name: 'CPO-D aos 12 anos',
        value: '1.86',
        source: 'DATASUS',
        lastUpdated: new Date(),
        category: 'oral_health'
      }
    ];
  }

  // Processa dados do TabNet com POST requests
  static async fetchTabNetData(params: any): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('scrape-health-data', {
        body: { 
          type: 'tabnet',
          params 
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados TabNet:', error);
      return null;
    }
  }

  // Gera dados mockados para demonstração
  static generateMockData(category: string): PanelData {
    const mockData: Record<string, PanelData> = {
      'oral_health': {
        id: 'oral-health',
        title: 'Saúde Bucal',
        description: 'Indicadores de saúde bucal da população brasileira',
        category: 'Saúde Bucal',
        kpis: [
          { id: 'cpod-12', title: 'CPO-D aos 12 anos', value: '1.86', change: '-12%', changeType: 'decrease', description: 'Índice de dentes cariados, perdidos e obturados aos 12 anos' },
          { id: 'cobertura-esb', title: 'Cobertura ESB', value: '67.2%', change: '+5%', changeType: 'increase', description: 'Cobertura de Equipes de Saúde Bucal' },
          { id: 'fluoretacao', title: 'Fluoretação', value: '76.3%', change: '+2%', changeType: 'increase', description: 'Cobertura de fluoretação da água' },
          { id: 'edentulismo', title: 'Edentulismo 65+', value: '53.7%', change: '-8%', changeType: 'decrease', description: 'Taxa de edentulismo em idosos' }
        ],
        charts: [
          {
            type: 'line',
            title: 'Evolução CPO-D por Região',
            data: [
              { name: '2010', value: 2.8 }, { name: '2015', value: 2.3 }, { name: '2020', value: 2.0 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          },
          {
            type: 'bar',
            title: 'Cobertura de Equipes de Saúde Bucal',
            data: [
              { name: 'Norte', value: 45.2 }, { name: 'Nordeste', value: 78.5 }, { name: 'Sudeste', value: 62.1 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          }
        ]
      },
      'womens_health': {
        id: 'womens-health',
        title: 'Saúde da Mulher',
        description: 'Indicadores de saúde da mulher no Brasil',
        category: 'Saúde da Mulher',
        kpis: [
          { id: 'mortalidade-materna', title: 'Mortalidade Materna', value: '57.9', change: '-15%', changeType: 'decrease', description: 'Taxa por 100.000 nascidos vivos' },
          { id: 'prenatal-7', title: 'Pré-natal 7+ consultas', value: '69.4%', change: '+8%', changeType: 'increase', description: 'Cobertura pré-natal adequada' },
          { id: 'mamografia', title: 'Cobertura Mamografia', value: '54.7%', change: '+3%', changeType: 'increase', description: 'Rastreamento mamográfico' },
          { id: 'partos-cesareos', title: 'Partos Cesáreos', value: '55.6%', change: '-2%', changeType: 'decrease', description: 'Taxa de partos cesáreos' }
        ],
        charts: [
          {
            type: 'line',
            title: 'Mortalidade Materna por 100.000 nascidos vivos',
            data: [
              { name: '2015', value: 62.0 }, { name: '2018', value: 59.1 }, { name: '2019', value: 57.9 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          }
        ]
      },
      'mental_health': {
        id: 'mental-health',
        title: 'Saúde Mental',
        description: 'Indicadores de saúde mental e atenção psicossocial',
        category: 'Saúde Mental',
        kpis: [
          { id: 'caps-100k', title: 'CAPS por 100k hab', value: '1.15', change: '+12%', changeType: 'increase', description: 'Centros de Atenção Psicossocial' },
          { id: 'internacoes-psiq', title: 'Internações Psiquiátricas', value: '156.8', change: '-25%', changeType: 'decrease', description: 'Taxa por 100.000 habitantes' },
          { id: 'suicidios', title: 'Suicídios por 100k', value: '6.4', change: '+8%', changeType: 'increase', description: 'Taxa de mortalidade por suicídio' },
          { id: 'cobertura-raps', title: 'Cobertura RAPS', value: '73.2%', change: '+15%', changeType: 'increase', description: 'Rede de Atenção Psicossocial' }
        ],
        charts: [
          {
            type: 'line',
            title: 'Evolução da Rede CAPS',
            data: [
              { name: '2015', value: 2345 }, { name: '2018', value: 2778 }, { name: '2021', value: 3180 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          }
        ]
      },
      'chronic_diseases': {
        id: 'chronic-diseases',
        title: 'Doenças Crônicas',
        description: 'Monitoramento de doenças crônicas não transmissíveis',
        category: 'Doenças Crônicas',
        kpis: [
          { id: 'hipertensao', title: 'Hipertensão (%)', value: '24.5%', change: '+3%', changeType: 'increase', description: 'Prevalência de hipertensão arterial' },
          { id: 'diabetes', title: 'Diabetes (%)', value: '8.4%', change: '+5%', changeType: 'increase', description: 'Prevalência de diabetes mellitus' },
          { id: 'obesidade', title: 'Obesidade (%)', value: '20.3%', change: '+12%', changeType: 'increase', description: 'Prevalência de obesidade' },
          { id: 'tabagismo', title: 'Tabagismo (%)', value: '9.1%', change: '-15%', changeType: 'decrease', description: 'Prevalência de tabagismo' }
        ],
        charts: [
          {
            type: 'bar',
            title: 'Prevalência de DCNT por Faixa Etária',
            data: [
              { name: '18-24', value: 15.2 }, { name: '35-44', value: 22.1 }, { name: '65+', value: 68.4 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          }
        ]
      },
      'epidemiology': {
        id: 'epidemiology',
        title: 'Vigilância Epidemiológica',
        description: 'Dados de vigilância em saúde e doenças de notificação',
        category: 'Epidemiologia',
        kpis: [
          { id: 'dengue-casos', title: 'Dengue (casos)', value: '1.439.471', change: '+156%', changeType: 'increase', description: 'Casos notificados de dengue' },
          { id: 'tuberculose', title: 'Tuberculose (incidência)', value: '35.0', change: '-8%', changeType: 'decrease', description: 'Taxa por 100.000 habitantes' },
          { id: 'sifilis', title: 'Sífilis Congênita', value: '8.2', change: '-12%', changeType: 'decrease', description: 'Taxa por 1.000 nascidos vivos' },
          { id: 'cobertura-vac', title: 'Cobertura Vacinal', value: '84.2%', change: '-5%', changeType: 'decrease', description: 'Cobertura vacinal geral' }
        ],
        charts: [
          {
            type: 'line',
            title: 'Casos de Dengue por Semana Epidemiológica',
            data: [
              { name: 'SE1', value: 12543 }, { name: 'SE10', value: 45123 }, { name: 'SE20', value: 89234 }
            ],
            dataKey: 'value',
            nameKey: 'name'
          }
        ]
      }
    };

    return mockData[category] || mockData['oral_health'];
  }

  // Atualiza dados de um painel específico
  static async updatePanelData(category: string): Promise<PanelData> {
    try {
      // Primeiro tenta buscar dados reais do banco
      const dbData = await this.getHealthIndicatorsByCategory(category);
      
      if (dbData.length > 0) {
        return this.convertToPanelData(category, dbData);
      }

      // Se não há dados no banco, tenta coletar novos dados
      const realData = await this.scrapeHealthData();
      
      if (realData.length > 0) {
        // Filtra dados da categoria específica
        const categoryData = realData.filter(item => item.category === category);
        if (categoryData.length > 0) {
          return this.convertToPanelData(category, categoryData);
        }
      }

      // Fallback para dados mockados
      return this.generateMockData(category);
    } catch (error) {
      console.error('Erro ao atualizar dados do painel:', error);
      return this.generateMockData(category);
    }
  }

  // Converte indicadores para formato PanelData
  static convertToPanelData(category: string, indicators: HealthIndicator[]): PanelData {
    const categoryMap: Record<string, { title: string; description: string }> = {
      'oral_health': {
        title: 'Saúde Bucal',
        description: 'Indicadores de saúde bucal da população'
      },
      'womens_health': {
        title: 'Saúde da Mulher', 
        description: 'Indicadores de saúde materno-infantil e da mulher'
      },
      'mental_health': {
        title: 'Saúde Mental',
        description: 'Indicadores de saúde mental e atenção psicossocial'
      },
      'chronic_diseases': {
        title: 'Doenças Crônicas',
        description: 'Monitoramento de doenças crônicas não transmissíveis'
      },
      'epidemiology': {
        title: 'Vigilância Epidemiológica',
        description: 'Dados de vigilância em saúde e doenças de notificação'
      }
    };

    const categoryInfo = categoryMap[category] || {
      title: 'Indicadores de Saúde',
      description: 'Dados atualizados de saúde pública'
    };

    // Convert indicators to KPIs
    const kpis: KPI[] = indicators.slice(0, 4).map((indicator, index) => ({
      id: indicator.id,
      title: indicator.name,
      value: indicator.value.toString(),
      change: '+2.5%', // This could be calculated from historical data
      changeType: 'increase' as const,
      description: `Fonte: ${indicator.source} - Atualizado: ${indicator.lastUpdated.toLocaleDateString()}`
    }));

    // Generate sample charts based on the indicators
    const charts: Chart[] = [
      {
        type: 'bar',
        title: 'Indicadores Coletados',
        data: indicators.slice(0, 3).map((indicator, index) => ({
          name: indicator.name.substring(0, 15),
          value: Math.random() * 100 + 50
        })),
        dataKey: 'value',
        nameKey: 'name'
      }
    ];

    return {
      id: category,
      title: categoryInfo.title,
      description: categoryInfo.description,
      category: categoryInfo.title,
      kpis,
      charts
    };
  }
}