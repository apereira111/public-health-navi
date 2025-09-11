-- Add healthcare_provider role to the app_role enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE app_role AS ENUM ('admin', 'viewer');
    END IF;
    
    -- Add healthcare_provider to existing enum
    IF NOT EXISTS (SELECT 1 FROM unnest(enum_range(NULL::app_role)) AS val WHERE val = 'healthcare_provider') THEN
        ALTER TYPE app_role ADD VALUE 'healthcare_provider';
    END IF;
END $$;

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

-- Add audit logging function for health data access
CREATE OR REPLACE FUNCTION public.log_health_data_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log access attempts could be implemented here if needed
  -- For now, just ensure proper access control
  IF get_current_user_role() NOT IN ('admin'::app_role, 'healthcare_provider'::app_role) THEN
    RAISE EXCEPTION 'Access denied: Insufficient privileges to access health data';
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;