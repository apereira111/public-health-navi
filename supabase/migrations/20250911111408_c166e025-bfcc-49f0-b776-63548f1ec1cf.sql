-- Drop existing RLS policies on health_indicators
DROP POLICY IF EXISTS "Admins can view all health indicators" ON public.health_indicators;
DROP POLICY IF EXISTS "Users can view indicators they collected" ON public.health_indicators;
DROP POLICY IF EXISTS "Authenticated users can insert health indicators" ON public.health_indicators;
DROP POLICY IF EXISTS "Users can update indicators they collected" ON public.health_indicators;

-- Create new restrictive RLS policies for health_indicators
-- Only admins can view health indicators (addresses the security concern)
CREATE POLICY "Only admins can view health indicators" 
ON public.health_indicators 
FOR SELECT 
USING (get_current_user_role() = 'admin'::app_role);

-- Only admins can insert health indicators
CREATE POLICY "Only admins can insert health indicators" 
ON public.health_indicators 
FOR INSERT 
WITH CHECK (
  get_current_user_role() = 'admin'::app_role
  AND auth.uid() = collected_by
);

-- Only admins can update health indicators
CREATE POLICY "Only admins can update health indicators" 
ON public.health_indicators 
FOR UPDATE 
USING (
  get_current_user_role() = 'admin'::app_role
  AND auth.uid() = collected_by
);

-- Only admins can delete health indicators
CREATE POLICY "Only admins can delete health indicators" 
ON public.health_indicators 
FOR DELETE 
USING (get_current_user_role() = 'admin'::app_role);