export interface KPI {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  description: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface Chart {
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: ChartData[];
  dataKey: string;
  nameKey: string;
}

export interface PanelData {
  title: string;
  description: string;
  kpis: KPI[];
  charts: Chart[];
}

export interface IndicatorOption {
  value: string;
  label: string;
}