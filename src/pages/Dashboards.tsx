import { DashboardCategories } from "@/components/DashboardCategories";
import { DashboardSelector } from "@/components/DashboardSelector";

const Dashboards = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Painéis de Controle
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore nossos painéis interativos com dados de saúde em tempo real
          </p>
        </div>
        <DashboardSelector />
      </div>
    </div>
  );
};

export default Dashboards;