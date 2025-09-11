import html2canvas from 'html2canvas';

export interface ChartExportResult {
  dataUrl: string;
  title: string;
}

export const exportChartsAsImages = async (): Promise<ChartExportResult[]> => {
  const chartElements = document.querySelectorAll('.chart-container');
  const results: ChartExportResult[] = [];
  
  for (let i = 0; i < chartElements.length; i++) {
    const element = chartElements[i] as HTMLElement;
    const titleElement = element.querySelector('.chart-title');
    const title = titleElement?.textContent || `Gráfico ${i + 1}`;
    
    try {
      // Wait a bit to ensure chart is fully rendered
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2, // High quality
        height: element.offsetHeight,
        width: element.offsetWidth,
        useCORS: true,
        allowTaint: false,
      });
      
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      results.push({ dataUrl, title });
    } catch (error) {
      console.warn(`Erro ao exportar gráfico "${title}":`, error);
    }
  }
  
  return results;
};