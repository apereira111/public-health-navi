import type { PanelData } from "@/types";

// Cria um elemento de relatório simplificado, sem efeitos visuais do app
export function createPrintableReport(
  panelData: PanelData,
  options: {
    date: string;
    executiveSummary: string;
    insights: string[];
    recommendations: string[];
    widthPx?: number; // default 720
    baseFontPx?: number; // default 18
  }
): HTMLElement {
  const widthPx = options.widthPx ?? 720; // ~190mm em 96DPI
  const baseFontPx = options.baseFontPx ?? 18;

  const container = document.createElement("div");
  Object.assign(container.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${widthPx}px`,
    maxWidth: `${widthPx}px`,
    background: "#ffffff",
    color: "#000000",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    fontSize: `${baseFontPx}px`,
    lineHeight: "1.65",
  } as CSSStyleDeclaration);

  const sectionStyle = "margin-bottom: 18px;";
  const h2Style = "font-size: 1.6em; font-weight: 700; margin: 0 0 8px;";
  const h3Style = "font-size: 1.2em; font-weight: 700; margin: 12px 0 8px;";
  const pStyle = "margin: 0 0 8px;";
  const listStyle = "margin: 0; padding-left: 20px;";

  container.innerHTML = `
    <section style="${sectionStyle}">
      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:16px;">
        <div>
          <h2 style="${h2Style}">${escapeHtml(panelData.title)}</h2>
          <p style="${pStyle}; color:#333;">${escapeHtml(panelData.description)}</p>
        </div>
        <div style="text-align:right; min-width: 160px;">
          <div style="font-size:0.9em; color:#555;">${escapeHtml(options.date)}</div>
          <div style="display:inline-block; margin-top:6px; font-size:0.8em; color:#222; border:1px solid #ddd; padding:2px 6px; border-radius:6px;">Relatório Automático</div>
        </div>
      </div>
    </section>

    <section style="${sectionStyle}">
      <h3 style="${h3Style}">Resumo Executivo</h3>
      <p style="${pStyle}">${escapeHtml(options.executiveSummary)}</p>
    </section>

    <section style="${sectionStyle}">
      <h3 style="${h3Style}">Indicadores Principais</h3>
      ${panelData.kpis
        .map(
          (kpi) => `
          <p style="${pStyle}"><strong>${escapeHtml(kpi.title)}:</strong> ${escapeHtml(kpi.value)} — ${escapeHtml(kpi.change)} ${
            kpi.changeType === "increase" ? "(↑)" : "(↓)"
          }</p>`
        )
        .join("")}
    </section>

    <section style="${sectionStyle}">
      <h3 style="${h3Style}">Insights e Análises</h3>
      <ul style="${listStyle}">
        ${options.insights.map((i) => `<li style="${pStyle}">${escapeHtml(i)}</li>`).join("")}
      </ul>
    </section>

    <section style="${sectionStyle}">
      <h3 style="${h3Style}">Recomendações</h3>
      <ul style="${listStyle}">
        ${options.recommendations.map((r) => `<li style="${pStyle}">${escapeHtml(r)}</li>`).join("")}
      </ul>
    </section>
  `;

  return container;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
