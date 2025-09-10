import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Sparkles, TrendingUp, Calendar, MapPin, Building2, CalendarDays } from "lucide-react";

export const AISearch = () => {
  console.log('AISearch component rendering');
  
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  const states = [
    { value: "SP", label: "São Paulo" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "MG", label: "Minas Gerais" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "PR", label: "Paraná" }
  ];

  const municipalities = [
    { value: "sao-paulo", label: "São Paulo" },
    { value: "rio-de-janeiro", label: "Rio de Janeiro" },
    { value: "salvador", label: "Salvador" },
    { value: "brasilia", label: "Brasília" },
    { value: "fortaleza", label: "Fortaleza" }
  ];

  const years = Array.from({ length: 7 }, (_, i) => 2024 - i);

  const sampleQueries = [
    "Crie um gráfico de série temporal mostrando mortalidade infantil",
    "Compare taxas de vacinação entre diferentes faixas etárias",
    "Mostre correlação entre financiamento da saúde e resultados",
    "Gere painel de saúde do idoso dos últimos 5 anos"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4" />
            Análises com IA
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Peça para a IA Criar Seu Painel
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use linguagem natural para buscar indicadores de saúde e criar visualizações personalizadas
          </p>
        </div>

        <div className="space-y-6">
          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Estado
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os Estados</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Município
              </label>
              <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o município" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os Municípios</SelectItem>
                  {municipalities.map((municipality) => (
                    <SelectItem key={municipality.value} value={municipality.value}>
                      {municipality.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Ano
              </label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os Anos</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Campo de busca */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Peça para a IA criar painéis, gráficos ou analisar dados de saúde..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching}
              className="h-12 px-6"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                  Buscando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Buscar
                </>
              )}
            </Button>
          </div>

          {/* Exemplos de consultas */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Exemplos de consultas:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQueries.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(sample)}
                  className="text-left p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados mockados durante pesquisa */}
        {isSearching && (
          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-medium">IA está analisando dados de saúde...</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <TrendingUp className="h-5 w-5 text-chart-1" />
                  <div>
                    <div className="text-sm font-medium">15 indicadores encontrados</div>
                    <div className="text-xs text-muted-foreground">Em 3 categorias</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <Calendar className="h-5 w-5 text-chart-2" />
                  <div>
                    <div className="text-sm font-medium">Dados 2018-2024</div>
                    <div className="text-xs text-muted-foreground">7 anos de cobertura</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                  <Search className="h-5 w-5 text-chart-3" />
                  <div>
                    <div className="text-sm font-medium">Criando gráficos</div>
                    <div className="text-xs text-muted-foreground">Séries temporais e tendências</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};