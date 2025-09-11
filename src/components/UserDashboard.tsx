import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Activity, 
  FileText, 
  BarChart3, 
  Calendar,
  Clock,
  Award,
  TrendingUp,
  Database,
  Shield
} from "lucide-react";

interface UserStats {
  collectionsCount: number;
  reportsCount: number;
  dashboardsCount: number;
  lastActivity: string;
}

interface ProfileData {
  full_name?: string;
  organization?: string;
  department?: string;
  location?: string;
  avatar_url?: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer' | 'healthcare_provider';
  created_at: string;
}

export function UserDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [stats, setStats] = useState<UserStats>({
    collectionsCount: 0,
    reportsCount: 0,
    dashboardsCount: 0,
    lastActivity: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      Promise.all([fetchProfile(), fetchStats()]).finally(() => setLoading(false));
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchStats = async () => {
    if (!user) return;

    try {
      // Fetch collections count
      const { count: collectionsCount } = await supabase
        .from('collections')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch saved reports count
      const { count: reportsCount } = await supabase
        .from('saved_reports')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch dashboard panels count
      const { count: dashboardsCount } = await supabase
        .from('dashboard_panels')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch last activity (most recent collection or report)
      const { data: lastCollection } = await supabase
        .from('collections')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const { data: lastReport } = await supabase
        .from('saved_reports')
        .select('updated_at')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      let lastActivity = '';
      if (lastCollection?.[0] || lastReport?.[0]) {
        const collectionDate = lastCollection?.[0]?.created_at;
        const reportDate = lastReport?.[0]?.updated_at;
        
        if (collectionDate && reportDate) {
          lastActivity = new Date(collectionDate) > new Date(reportDate) ? collectionDate : reportDate;
        } else if (collectionDate) {
          lastActivity = collectionDate;
        } else if (reportDate) {
          lastActivity = reportDate;
        }
      }

      setStats({
        collectionsCount: collectionsCount || 0,
        reportsCount: reportsCount || 0,
        dashboardsCount: dashboardsCount || 0,
        lastActivity
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'manager': return 'Gerente';
      case 'analyst': return 'Analista';
      case 'healthcare_provider': return 'Profissional de Saúde';
      case 'viewer': return 'Usuário';
      default: return 'Usuário';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'manager': return 'secondary';
      case 'analyst': return 'default';
      case 'healthcare_provider': return 'secondary';
      case 'viewer': return 'outline';
      default: return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Nunca';
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatJoinDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Visão Geral do Perfil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url} alt={profile?.full_name} />
              <AvatarFallback className="text-lg">
                {profile?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  {profile?.full_name || user?.email}
                </h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant={getRoleColor(profile?.role || 'viewer')}>
                  <Shield className="h-3 w-3 mr-1" />
                  {getRoleLabel(profile?.role || 'viewer')}
                </Badge>
                
                {profile?.organization && (
                  <Badge variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {profile.organization}
                  </Badge>
                )}
                
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Membro desde {formatJoinDate(profile?.created_at || '')}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {profile?.department && (
                  <div>
                    <span className="text-muted-foreground">Departamento:</span>
                    <span className="ml-2 text-foreground">{profile.department}</span>
                  </div>
                )}
                
                {profile?.location && (
                  <div>
                    <span className="text-muted-foreground">Localização:</span>
                    <span className="ml-2 text-foreground">{profile.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Coletas</p>
                <p className="text-2xl font-bold text-foreground">{stats.collectionsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-sm text-muted-foreground">Relatórios</p>
                <p className="text-2xl font-bold text-foreground">{stats.reportsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Dashboards</p>
                <p className="text-2xl font-bold text-foreground">{stats.dashboardsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-chart-4" />
              <div>
                <p className="text-sm text-muted-foreground">Última Atividade</p>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(stats.lastActivity)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Atividade Recente
            </CardTitle>
            <CardDescription>
              Suas últimas ações no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.collectionsCount > 0 ? (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm text-foreground">
                    {stats.collectionsCount} coleta{stats.collectionsCount > 1 ? 's' : ''} de dados realizada{stats.collectionsCount > 1 ? 's' : ''}
                  </span>
                </div>
              ) : null}
              
              {stats.reportsCount > 0 ? (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm text-foreground">
                    {stats.reportsCount} relatório{stats.reportsCount > 1 ? 's' : ''} criado{stats.reportsCount > 1 ? 's' : ''}
                  </span>
                </div>
              ) : null}
              
              {stats.dashboardsCount > 0 ? (
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-foreground">
                    {stats.dashboardsCount} dashboard{stats.dashboardsCount > 1 ? 's' : ''} configurado{stats.dashboardsCount > 1 ? 's' : ''}
                  </span>
                </div>
              ) : null}
              
              {stats.collectionsCount === 0 && stats.reportsCount === 0 && stats.dashboardsCount === 0 && (
                <p className="text-muted-foreground text-sm">
                  Nenhuma atividade registrada ainda. Comece explorando o sistema!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Capacidades do Sistema
            </CardTitle>
            <CardDescription>
              Funcionalidades disponíveis para seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Visualizar Dashboards</span>
                <Badge variant="outline" className="text-xs">Habilitado</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Criar Relatórios</span>
                <Badge variant="outline" className="text-xs">Habilitado</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Busca com IA</span>
                <Badge variant="outline" className="text-xs">Habilitado</Badge>
              </div>
              
              {profile?.role === 'admin' && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Gerenciar Dados</span>
                    <Badge variant="destructive" className="text-xs">Admin</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Coletar Indicadores</span>
                    <Badge variant="destructive" className="text-xs">Admin</Badge>
                  </div>
                </>
              )}
              
              {(profile?.role === 'healthcare_provider' || profile?.role === 'manager' || profile?.role === 'analyst') && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Análises Avançadas</span>
                    <Badge variant="secondary" className="text-xs">Profissional</Badge>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}