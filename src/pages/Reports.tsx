import { Reports as ReportsComponent } from "@/components/Reports";

const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Relatórios
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesse relatórios detalhados e análises dos dados de saúde
          </p>
        </div>
        <ReportsComponent />
      </div>
    </div>
  );
};

export default Reports;