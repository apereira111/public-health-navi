-- Add healthcare_provider role to app_role enum if not exists
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'healthcare_provider';

-- Update profiles table with additional fields for comprehensive user management
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS avatar_url text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS organization text,
ADD COLUMN IF NOT EXISTS department text,
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}';

-- Create trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();