import type { PanelData, IndicatorOption } from '../types';

// Painéis (exemplos — ajuste os conteúdos conforme seu projeto)
export const primaryCareData: PanelData = {
  id: "primary-care",
  title: "Indicadores Gerais de Saúde",
  description: "Dados gerais de saúde.",
  kpis: [
    { id: 'pc-1', title: 'Atendimentos NASF', value: '4.123.456', change: '+5.2%', changeType: 'increase', description: 'Descrição.' },
    { id: 'pc-2', title: 'Cobertura ESF', value: '82.1%', change: '+1.5%', changeType: 'increase', description: 'Descrição.' },
  ],
  charts: [
    { type: 'bar', title: 'Atendimentos por Região', data: [
        { name: 'Norte', value: 450000 },
        { name: 'Nordeste', value: 980000 },
        { name: 'Sudeste', value: 1520000 },
        { name: 'Sul', value: 730000 },
        { name: 'Centro-Oeste', value: 440000 }
      ], dataKey: 'value', nameKey: 'name'
    },
    { type: 'line', title: 'Evolução ESF', data: [
        { name: '2020', value: 76 },
        { name: '2021', value: 78 },
        { name: '2022', value: 79 },
        { name: '2023', value: 81 },
        { name: '2024', value: 82 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

export const financingData: PanelData = {
  id: "financing",
  title: "Financiamento da APS",
  description: "Indicadores financeiros da APS no Brasil.",
  kpis: [
    { id: 'fin-1', title: 'Repasse Federal (PAB Fixo)', value: 'R$ 15.2 bi', change: '+1.1%', changeType: 'increase', description: 'Descrição.' },
    { id: 'fin-2', title: 'Incentivo de Desempenho (Previne)', value: 'R$ 4.8 bi', change: '+3.5%', changeType: 'increase', description: 'Descrição.' },
    { id: 'fin-3', title: 'Custo Médio por Equipe ESF', value: 'R$ 75.345', change: '+0.5%', changeType: 'increase', description: 'Descrição.' },
    { id: 'fin-4', title: 'Execução Orçamentária Municipal', value: '95.8%', change: '-1.2%', changeType: 'decrease', description: 'Descrição.' }
  ],
  charts: [
    { type: 'bar', title: 'Repasses por Região', data: [
        { name: 'Norte', value: 1200000000 },
        { name: 'Nordeste', value: 4800000000 },
        { name: 'Sudeste', value: 7200000000 },
        { name: 'Sul', value: 2400000000 },
        { name: 'Centro-Oeste', value: 1600000000 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

export const childHealthData: PanelData = {
  id: "child-health",
  title: "Saúde da Criança",
  description: "Indicadores de saúde infantil no Brasil.",
  kpis: [
    { id: 'child-1', title: 'Taxa de Mortalidade Infantil', value: '8.5 /mil', change: '-0.2', changeType: 'decrease', description: 'Descrição.' },
  ],
  charts: [
    {
      type: 'line',
      title: 'Evolução da Mortalidade Infantil',
      data: [
        { name: '2020', value: 10.2 },
        { name: '2021', value: 9.8 },
        { name: '2022', value: 9.1 },
        { name: '2023', value: 8.8 },
        { name: '2024', value: 8.5 }
      ],
      dataKey: 'value',
      nameKey: 'name'
    }
  ]
};

export const womenHealthData: PanelData = {
  id: "womens-health",
  title: "Saúde da Mulher",
  description: "Indicadores de saúde feminina.",
  kpis: [
    { id: 'women-1', title: 'Cobertura Pré-Natal (mín. 6 consultas)', value: '85%', change: '+1.5%', changeType: 'increase', description: 'Descrição.' },
    { id: 'women-2', title: 'Partos Cesáreos na Rede Pública', value: '45%', change: '-0.8%', changeType: 'decrease', description: 'Descrição.' },
  ],
  charts: [
    { type: 'bar', title: 'Cobertura Pré-Natal por Estado', data: [
        { name: 'SP', value: 87 },
        { name: 'RJ', value: 83 },
        { name: 'MG', value: 85 }
      ], dataKey: 'value', nameKey: 'name'
    },
    { type: 'line', title: 'Evolução do Rastreamento de Câncer', data: [
        { name: '2020', value: 55 },
        { name: '2021', value: 57 },
        { name: '2022', value: 58 },
        { name: '2023', value: 58.5 },
        { name: '2024', value: 59.7 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

export const dengueData: PanelData = {
  id: "epidemiology",
  title: "Dengue",
  description: "Indicadores de dengue.",
  kpis: [
    { id: 'dengue-1', title: 'Casos Notificados (Ano)', value: '1.2 milhão', change: '+15%', changeType: 'increase', description: 'Descrição.' },
  ],
  charts: [
    { type: 'bar', title: 'Casos por Região', data: [
        { name: 'Sudeste', value: 520000 },
        { name: 'Nordeste', value: 380000 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

export const chronicDiseasesData: PanelData = {
  id: "chronic-diseases",
  title: "Doenças Crônicas",
  description: "Distribuição de doenças crônicas.",
  kpis: [
    { id: 'chronic-1', title: 'Hipertensos Cadastrados', value: '15.2 milhões', change: '+250k', changeType: 'increase', description: 'Descrição.' },
  ],
  charts: [
    { type: 'pie', title: 'Distribuição de Doenças Crônicas', data: [
        { name: 'Hipertensão', value: 15200000 },
        { name: 'Diabetes', value: 7800000 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

export const oralHealthData: PanelData = {
  id: "oral-health",
  title: "Saúde Bucal",
  description: "Indicadores de saúde bucal.",
  kpis: [
    { id: 'oral-1', title: 'Equipes de Saúde Bucal (eSB)', value: '29.876', change: '+150', changeType: 'increase', description: 'Descrição.' }
  ],
  charts: [
    { type: 'bar', title: 'Cobertura de Saúde Bucal', data: [
        { name: 'UF1', value: 70 },
        { name: 'UF2', value: 65 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

// Novo: Saúde do Idoso
export const elderlyHealthData: PanelData = {
  id: "elderly-health",
  title: "Saúde do Idoso",
  description: "Indicadores da população idosa.",
  kpis: [
    { id: 'elderly-1', title: 'População Idosa Acompanhada', value: '4.2 milhões', change: '+0.6%', changeType: 'increase', description: 'Descrição.' }
  ],
  charts: [
    { type: 'bar', title: 'Distribuição por Faixa Etária', data: [
        { name: '60-69', value: 900000 },
        { name: '70-79', value: 1200000 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

// Novo: Saúde Mental (corrigido conforme anterior)
export const mentalHealthData: PanelData = {
  id: "mental-health",
  title: "Saúde Mental",
  description: "Indicadores de saúde mental no Brasil.",
  kpis: [
    { id: 'mental-1', title: 'Casos de Transtornos Mentais', value: '1.1 milhão', change: '+4%', changeType: 'increase', description: 'Estimativa de casos relatados/diagnosticados.' },
    { id: 'mental-2', title: 'Acesso a Serviços de Saúde Mental', value: '57%', change: '+2%', changeType: 'increase', description: 'Proporção da população com acesso a serviços de saúde mental.' },
    { id: 'mental-3', title: 'Atendimentos Ambulatoriais', value: '2.3 milhões', change: '+3.5%', changeType: 'increase', description: 'Total de atendimentos ambulatoriais na área de saúde mental.' },
    { id: 'mental-4', title: 'Tempo Médio de Espera', value: '14 dias', change: '-1 dia', changeType: 'decrease', description: 'Tempo médio de espera para atendimento.' }
  ],
  charts: [
    { type: 'pie', title: 'Distribuição de Transtornos Mentais (estimado)', data: [
        { name: 'Depressão', value: 420000 },
        { name: 'Ansiedade', value: 360000 },
        { name: 'Transtorno Bipolar', value: 120000 },
        { name: 'Esquizofrenia', value: 90000 }
      ], dataKey: 'value', nameKey: 'name'
    },
    { type: 'bar', title: 'Atendimentos por Categoria', data: [
        { name: 'PSI', value: 800000 },
        { name: 'NEUR', value: 650000 },
        { name: 'PSI/CB', value: 520000 }
      ], dataKey: 'value', nameKey: 'name'
    }
  ]
};

// Exporte todos os painéis juntos (ajuste se já tiver uma lista existente)
export const allPanels: PanelData[] = [
  primaryCareData,
  financingData,
  childHealthData,
  womenHealthData,
  dengueData,
  chronicDiseasesData,
  oralHealthData,
  elderlyHealthData,
  mentalHealthData
];

// Opções de indicadores (se já existirem, mantenha únicos)
export const allIndicatorOptions: IndicatorOption[] = [
  { value: "casos_doencas", label: "Casos de Doenças" },
  { value: "taxa_mortalidade", label: "Taxa de Mortalidade" },
  { value: "indicadores_regionais", label: "Indicadores por Região" }
];