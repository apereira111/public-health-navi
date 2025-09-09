import { supabase } from '@/lib/supabase';
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
  
  // Coleta dados dos portais governamentais
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
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Erro na coleta de dados:', error);
      return [];
    }
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
      // Primeiro tenta coletar dados reais
      const realData = await this.scrapeHealthData();
      
      // Se não conseguir dados reais, usa dados mockados
      if (realData.length === 0) {
        return this.generateMockData(category);
      }

      // Processa dados reais aqui
      // ... lógica para processar dados reais
      
      return this.generateMockData(category);
    } catch (error) {
      console.error('Erro ao atualizar dados do painel:', error);
      return this.generateMockData(category);
    }
  }
}