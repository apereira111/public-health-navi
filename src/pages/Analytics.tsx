import { AISearch } from "@/components/AISearch";
import { DataCollector } from "@/components/DataCollector";

const Analytics = () => {
  console.log('Analytics component rendering');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Análises Avançadas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Utilize IA para análises inteligentes e coleta de dados automatizada
          </p>
        </div>
        <div className="space-y-12">
          <AISearch />
        </div>
      </div>
    </div>
  );
};

export default Analytics;