import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Database, AlertCircle, CheckCircle } from 'lucide-react';
import { HealthDataService } from '@/services/HealthDataService';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DataCollectorProps {
  onDataUpdate?: () => void;
}

export const DataCollector: React.FC<DataCollectorProps> = ({ onDataUpdate }) => {
  console.log('DataCollector component rendering');
  
  const [isCollecting, setIsCollecting] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [status, setStatus] = useState<'idle' | 'collecting' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  const { user } = useAuth();

  const handleDataCollection = async () => {
    if (!user) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para coletar dados",
        variant: "destructive",
      });
      return;
    }

    setIsCollecting(true);
    setStatus('collecting');

    try {
      toast({
        title: "Coletando dados",
        description: "Buscando indicadores de saúde dos portais governamentais...",
      });
      
      const data = await HealthDataService.scrapeHealthData();
      
      setLastUpdate(new Date());
      setStatus('success');
      
      toast({
        title: "Dados atualizados!",
        description: `${data.length} indicadores coletados e salvos no banco de dados.`,
      });

      onDataUpdate?.();
    } catch (error) {
      setStatus('error');
      toast({
        title: "Erro na coleta",
        description: "Não foi possível coletar os dados. Usando dados de demonstração.",
        variant: "destructive",
      });
    } finally {
      setIsCollecting(false);
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'collecting':
        return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'collecting':
        return <Badge variant="secondary">Coletando...</Badge>;
      case 'success':
        return <Badge variant="default">Atualizado</Badge>;
      case 'error':
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="outline">Aguardando</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {getStatusIcon()}
              Coleta de Dados
            </CardTitle>
            <CardDescription>
              Atualizar indicadores de saúde
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p><strong>Fontes:</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>DATASUS/TabNet</li>
            <li>OpenDataSUS</li>
            <li>SISAB</li>
            <li>SINAN</li>
          </ul>
        </div>

        {lastUpdate && (
          <div className="text-sm text-muted-foreground">
            <p><strong>Última atualização:</strong></p>
            <p>{lastUpdate.toLocaleString('pt-BR')}</p>
          </div>
        )}

        <Button 
          onClick={handleDataCollection}
          disabled={isCollecting}
          className="w-full"
          variant="default"
        >
          {isCollecting ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Coletando dados...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar dados
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          Os dados são coletados automaticamente dos portais oficiais do Ministério da Saúde.
        </p>
      </CardContent>
    </Card>
  );
};