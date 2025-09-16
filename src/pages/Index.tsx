import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { DashboardCategories } from "@/components/DashboardCategories";
import { DashboardSelector } from "@/components/DashboardSelector";
import { AISearch } from "@/components/AISearch";
import { Reports } from "@/components/Reports";
import { DataCollector } from "@/components/DataCollector";

const Index = () => {
  console.log("🏠 Index.tsx: Rendering Index page");
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <DashboardCategories />
      <div id="demonstracao">
        <DashboardSelector />
      </div>
    </div>
  );
};

export default Index;
