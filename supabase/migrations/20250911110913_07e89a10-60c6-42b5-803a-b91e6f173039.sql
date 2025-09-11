-- Add healthcare_provider role to the existing app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'healthcare_provider';

-- Drop existing RLS policies on health_indicators
DROP POLICY IF EXISTS "Admins can view all health indicators" ON public.health_indicators;
DROP POLICY IF EXISTS "Users can view indicators they collected" ON public.health_indicators;
DROP POLICY IF EXISTS "Authenticated users can insert health indicators" ON public.health_indicators;
DROP POLICY IF EXISTS "Users can update indicators they collected" ON public.health_indicators;

-- Create new restrictive RLS policies for health_indicators
-- Only admins and healthcare providers can view health indicators
CREATE POLICY "Only authorized personnel can view health indicators" 
ON public.health_indicators 
FOR SELECT 
USING (
  get_current_user_role() IN ('admin'::app_role, 'healthcare_provider'::app_role)
);

-- Only admins and healthcare providers can insert health indicators
CREATE POLICY "Only authorized personnel can insert health indicators" 
ON public.health_indicators 
FOR INSERT 
WITH CHECK (
  get_current_user_role() IN ('admin'::app_role, 'healthcare_provider'::app_role)
  AND auth.uid() = collected_by
);

-- Only admins and healthcare providers can update health indicators they collected
CREATE POLICY "Only authorized personnel can update their health indicators" 
ON public.health_indicators 
FOR UPDATE 
USING (
  get_current_user_role() IN ('admin'::app_role, 'healthcare_provider'::app_role)
  AND auth.uid() = collected_by
);

-- Only admins can delete health indicators (for data governance)
CREATE POLICY "Only admins can delete health indicators" 
ON public.health_indicators 
FOR DELETE 
USING (get_current_user_role() = 'admin'::app_role);