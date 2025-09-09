import type { PanelData, IndicatorOption } from '../types';

// Painéis (exemplos — ajuste os conteúdos conforme seu projeto)
export const primaryCareData: PanelData = {
  id: "primary-care",
  title: "Atenção Primária",
  description: "Indicadores da Atenção Primária à Saúde no Brasil.",
  kpis: [
    { id: 'pc-1', title: 'Atendimentos NASF', value: '4.123.456', change: '+5.2%', changeType: 'increase', description: 'Total de atendimentos NASF no ano.' },
    { id: 'pc-2', title: 'Cobertura ESF', value: '82.1%', change: '+1.5%', changeType: 'increase', description: 'Cobertura da Estratégia Saúde da Família.' },
    { id: 'pc-3', title: 'Equipes ESF', value: '48.865', change: '+3.2%', changeType: 'increase', description: 'Número de equipes ESF implantadas.' },
    { id: 'pc-4', title: 'UBS Funcionando', value: '41.234', change: '+0.8%', changeType: 'increase', description: 'Unidades Básicas de Saúde em funcionamento.' },
    { id: 'pc-5', title: 'ACS Ativos', value: '265.890', change: '+2.1%', changeType: 'increase', description: 'Agentes Comunitários de Saúde ativos.' },
    { id: 'pc-6', title: 'Consultas Médicas/Mês', value: '12.5 mi', change: '+4.3%', changeType: 'increase', description: 'Consultas médicas na APS por mês.' }
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
    { id: 'fin-1', title: 'Repasse Federal (PAB Fixo)', value: 'R$ 15.2 bi', change: '+1.1%', changeType: 'increase', description: 'Piso da Atenção Básica Fixo - repasse federal.' },
    { id: 'fin-2', title: 'Incentivo de Desempenho (Previne)', value: 'R$ 4.8 bi', change: '+3.5%', changeType: 'increase', description: 'Programa Previne Brasil - incentivo por desempenho.' },
    { id: 'fin-3', title: 'Custo Médio por Equipe ESF', value: 'R$ 75.345', change: '+0.5%', changeType: 'increase', description: 'Custo médio anual por equipe ESF.' },
    { id: 'fin-4', title: 'Execução Orçamentária Municipal', value: '95.8%', change: '-1.2%', changeType: 'decrease', description: 'Percentual de execução do orçamento municipal em saúde.' },
    { id: 'fin-5', title: 'Investimento per capita APS', value: 'R$ 298', change: '+2.8%', changeType: 'increase', description: 'Investimento per capita na Atenção Primária.' },
    { id: 'fin-6', title: 'Contrapartida Municipal (%PIB)', value: '6.2%', change: '+0.3%', changeType: 'increase', description: 'Contrapartida municipal como % do PIB local.' }
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
    { id: 'child-1', title: 'Taxa de Mortalidade Infantil', value: '8.5 /mil', change: '-0.2', changeType: 'decrease', description: 'Óbitos de menores de 1 ano por 1.000 nascidos vivos.' },
    { id: 'child-2', title: 'Cobertura Vacinal Pentavalente', value: '87.3%', change: '+2.1%', changeType: 'increase', description: 'Cobertura vacinal da pentavalente em menores de 1 ano.' },
    { id: 'child-3', title: 'Aleitamento Materno Exclusivo', value: '45.7%', change: '+1.8%', changeType: 'increase', description: 'Prevalência de aleitamento materno exclusivo até 6 meses.' },
    { id: 'child-4', title: 'Desnutrição Infantil', value: '2.9%', change: '-0.5%', changeType: 'decrease', description: 'Prevalência de desnutrição crônica em menores de 5 anos.' },
    { id: 'child-5', title: 'Consultas de Puericultura', value: '6.8', change: '+0.3', changeType: 'increase', description: 'Número médio de consultas de puericultura no primeiro ano.' },
    { id: 'child-6', title: 'Internações Evitáveis 0-4 anos', value: '12.3 /mil', change: '-1.8%', changeType: 'decrease', description: 'Internações por condições sensíveis à APS em menores de 5 anos.' }
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
    { id: 'women-1', title: 'Cobertura Pré-Natal (mín. 6 consultas)', value: '85%', change: '+1.5%', changeType: 'increase', description: 'Gestantes com pelo menos 6 consultas de pré-natal.' },
    { id: 'women-2', title: 'Partos Cesáreos na Rede Pública', value: '45%', change: '-0.8%', changeType: 'decrease', description: 'Taxa de partos cesáreos no SUS.' },
    { id: 'women-3', title: 'Mortalidade Materna', value: '57.9 /100mil', change: '-3.2%', changeType: 'decrease', description: 'Razão de mortalidade materna por 100.000 nascidos vivos.' },
    { id: 'women-4', title: 'Rastreamento Câncer Colo Útero', value: '62.8%', change: '+2.4%', changeType: 'increase', description: 'Cobertura do rastreamento do câncer do colo do útero.' },
    { id: 'women-5', title: 'Cobertura Mamografia', value: '54.7%', change: '+1.9%', changeType: 'increase', description: 'Cobertura mamográfica na faixa etária alvo.' },
    { id: 'women-6', title: 'Planejamento Familiar', value: '71.4%', change: '+3.1%', changeType: 'increase', description: 'Acesso a métodos contraceptivos na APS.' }
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
    { id: 'dengue-1', title: 'Casos Notificados (Ano)', value: '1.2 milhão', change: '+15%', changeType: 'increase', description: 'Casos prováveis de dengue notificados no SINAN.' },
    { id: 'dengue-2', title: 'Óbitos por Dengue', value: '1.094', change: '+28%', changeType: 'increase', description: 'Número de óbitos confirmados por dengue.' },
    { id: 'dengue-3', title: 'Incidência /100mil hab', value: '589.4', change: '+18%', changeType: 'increase', description: 'Taxa de incidência por 100.000 habitantes.' },
    { id: 'dengue-4', title: 'Letalidade (%)', value: '0.09%', change: '+0.02%', changeType: 'increase', description: 'Taxa de letalidade por dengue.' },
    { id: 'dengue-5', title: 'Casos Dengue Grave', value: '15.842', change: '+22%', changeType: 'increase', description: 'Casos de dengue com sinais de alarme e grave.' },
    { id: 'dengue-6', title: 'Cobertura Controle Vetorial', value: '78.3%', change: '+5.2%', changeType: 'increase', description: 'Cobertura das ações de controle do Aedes aegypti.' }
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
    { id: 'chronic-1', title: 'Hipertensos Cadastrados', value: '15.2 milhões', change: '+250k', changeType: 'increase', description: 'Hipertensos cadastrados no SisHiperdia.' },
    { id: 'chronic-2', title: 'Diabéticos Cadastrados', value: '7.8 milhões', change: '+180k', changeType: 'increase', description: 'Diabéticos cadastrados no SisHiperdia.' },
    { id: 'chronic-3', title: 'Prevalência Hipertensão', value: '24.5%', change: '+0.8%', changeType: 'increase', description: 'Prevalência de hipertensão na população adulta.' },
    { id: 'chronic-4', title: 'Prevalência Diabetes', value: '8.4%', change: '+0.6%', changeType: 'increase', description: 'Prevalência de diabetes na população adulta.' },
    { id: 'chronic-5', title: 'Controle Pressórico Adequado', value: '67.2%', change: '+3.1%', changeType: 'increase', description: 'Hipertensos com pressão controlada (<140/90mmHg).' },
    { id: 'chronic-6', title: 'Controle Glicêmico Adequado', value: '58.9%', change: '+2.4%', changeType: 'increase', description: 'Diabéticos com HbA1c <7% ou glicemia controlada.' }
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
    { id: 'oral-1', title: 'Equipes de Saúde Bucal (eSB)', value: '29.876', change: '+150', changeType: 'increase', description: 'Equipes de Saúde Bucal implantadas no país.' },
    { id: 'oral-2', title: 'CPO-D aos 12 anos', value: '1.86', change: '-0.15', changeType: 'decrease', description: 'Índice de dentes cariados, perdidos e obturados aos 12 anos.' },
    { id: 'oral-3', title: 'Cobertura ESB (%)', value: '67.2%', change: '+2.3%', changeType: 'increase', description: 'Cobertura populacional das equipes de saúde bucal.' },
    { id: 'oral-4', title: 'Exodontias em Relação aos Procedimentos', value: '8.9%', change: '-1.2%', changeType: 'decrease', description: 'Proporção de exodontias em relação aos demais procedimentos.' },
    { id: 'oral-5', title: 'Primeira Consulta Odontológica', value: '18.7%', change: '+1.8%', changeType: 'increase', description: 'Cobertura de primeira consulta odontológica programática.' },
    { id: 'oral-6', title: 'Fluoretação da Água (%)', value: '76.3%', change: '+0.9%', changeType: 'increase', description: 'Cobertura de fluoretação da água de abastecimento público.' }
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
    { id: 'elderly-1', title: 'População Idosa Acompanhada', value: '4.2 milhões', change: '+0.6%', changeType: 'increase', description: 'Idosos acompanhados pelas equipes de APS.' },
    { id: 'elderly-2', title: 'Caderneta do Idoso Implantada', value: '68.4%', change: '+4.2%', changeType: 'increase', description: 'Cobertura da Caderneta de Saúde da Pessoa Idosa.' },
    { id: 'elderly-3', title: 'Vacinação Influenza 60+', value: '89.7%', change: '+2.1%', changeType: 'increase', description: 'Cobertura vacinal contra influenza em idosos.' },
    { id: 'elderly-4', title: 'Internações Evitáveis 60+', value: '18.9 /mil', change: '-2.3%', changeType: 'decrease', description: 'Internações por condições sensíveis à APS em idosos.' },
    { id: 'elderly-5', title: 'Quedas em Idosos (Prevenção)', value: '73.2%', change: '+3.8%', changeType: 'increase', description: 'Cobertura de ações de prevenção de quedas.' },
    { id: 'elderly-6', title: 'Avaliação Multidimensional', value: '56.1%', change: '+5.4%', changeType: 'increase', description: 'Idosos com avaliação multidimensional realizada.' }
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
    { id: 'mental-1', title: 'Casos de Transtornos Mentais', value: '1.1 milhão', change: '+4%', changeType: 'increase', description: 'Estimativa de casos relatados/diagnosticados de transtornos mentais.' },
    { id: 'mental-2', title: 'Acesso a Serviços de Saúde Mental', value: '57%', change: '+2%', changeType: 'increase', description: 'Proporção da população com acesso a serviços de saúde mental.' },
    { id: 'mental-3', title: 'Atendimentos Ambulatoriais', value: '2.3 milhões', change: '+3.5%', changeType: 'increase', description: 'Total de atendimentos ambulatoriais na área de saúde mental.' },
    { id: 'mental-4', title: 'Tempo Médio de Espera', value: '14 dias', change: '-1 dia', changeType: 'decrease', description: 'Tempo médio de espera para atendimento em saúde mental.' },
    { id: 'mental-5', title: 'CAPS por 100mil hab', value: '1.15', change: '+0.08', changeType: 'increase', description: 'Número de CAPS por 100.000 habitantes.' },
    { id: 'mental-6', title: 'Leitos em Hospital Psiquiátrico', value: '25.847', change: '-8.2%', changeType: 'decrease', description: 'Redução de leitos psiquiátricos (desinstitucionalização).' }
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