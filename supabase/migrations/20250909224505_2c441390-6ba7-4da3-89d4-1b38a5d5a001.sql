-- Criar tabela de relatórios salvos
CREATE TABLE public.saved_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  panel_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para saved_reports
ALTER TABLE public.saved_reports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para saved_reports
CREATE POLICY "Usuários podem ver seus próprios relatórios" 
ON public.saved_reports 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios relatórios" 
ON public.saved_reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios relatórios" 
ON public.saved_reports 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios relatórios" 
ON public.saved_reports 
FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger para updated_at
CREATE TRIGGER update_saved_reports_updated_at
  BEFORE UPDATE ON public.saved_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();