import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Baby, 
  Users, 
  DollarSign, 
  Stethoscope, 
  Brain,
  ArrowRight 
} from "lucide-react";

const categories = [
  {
    title: "Saúde da Mulher",
    description: "Mortalidade materna, saúde reprodutiva, indicadores de pré-natal",
    icon: Heart,
    color: "text-chart-1",
    stats: "45 indicadores",
  },
  {
    title: "Saúde da Criança", 
    description: "Mortalidade infantil, taxas de vacinação, métricas de desenvolvimento infantil",
    icon: Baby,
    color: "text-chart-2",
    stats: "38 indicadores",
  },
  {
    title: "Saúde do Idoso",
    description: "Gestão de doenças crônicas, cuidados com idosos, métricas de qualidade de vida",
    icon: Users,
    color: "text-chart-3",
    stats: "52 indicadores",
  },
  {
    title: "Financiamento",
    description: "Custos de saúde, alocação orçamentária, análise de custo-efetividade",
    icon: DollarSign,
    color: "text-chart-4",
    stats: "29 indicadores",
  },
  {
    title: "Atenção Primária",
    description: "Acesso ao cuidado, serviços preventivos, utilização da atenção primária",
    icon: Stethoscope,
    color: "text-chart-5",
    stats: "41 indicadores",
  },
  {
    title: "Saúde Mental",
    description: "Serviços de saúde mental, taxas de suicídio, bem-estar psicológico",
    icon: Brain,
    color: "text-chart-1",
    stats: "33 indicadores",
  },
];

export const DashboardCategories = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Categorias de Painéis de Saúde
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Organize e analise dados de saúde nas principais áreas da gestão de saúde pública
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="p-6 hover:shadow-elevated transition-all duration-300 border-0 shadow-card group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-primary/10 flex items-center justify-center ${category.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {category.stats}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Ver Painel
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};