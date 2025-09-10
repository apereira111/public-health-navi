-- Remove the overly permissive policy that allows all users to view health indicators
DROP POLICY IF EXISTS "All authenticated users can view health indicators" ON public.health_indicators;

-- Create more restrictive policies for viewing health indicators
-- Users can only view indicators they collected themselves
CREATE POLICY "Users can view indicators they collected" 
ON public.health_indicators 
FOR SELECT 
USING (auth.uid() = collected_by);

-- Admins can view all health indicators for management purposes
CREATE POLICY "Admins can view all health indicators" 
ON public.health_indicators 
FOR SELECT 
USING (get_current_user_role() = 'admin'::app_role);

-- Optional: Allow viewing of anonymized/public indicators (uncomment if needed)
-- CREATE POLICY "Public indicators are viewable by all" 
-- ON public.health_indicators 
-- FOR SELECT 
-- USING (category = 'public' OR category = 'anonymized');