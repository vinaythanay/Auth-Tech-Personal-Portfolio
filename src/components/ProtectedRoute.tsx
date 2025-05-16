
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      // Check for Supabase session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log("User authenticated via Supabase session");
        setIsAuthenticated(true);
        return;
      }
      
      // Fallback to check localStorage for backward compatibility
      const authToken = localStorage.getItem("authToken");
      const tokenExpiry = localStorage.getItem("tokenExpiry");
      const isTokenValid = authToken && tokenExpiry && parseInt(tokenExpiry) > Date.now();
      const isAuthLocalStorage = localStorage.getItem("isAuthenticated") === "true";
      
      if (isTokenValid || isAuthLocalStorage) {
        console.log("User authenticated via localStorage");
        setIsAuthenticated(true);
        return;
      }
      
      setIsAuthenticated(false);
      
      if (location.pathname !== '/login' && 
          location.pathname !== '/signup' && 
          location.pathname !== '/forgot-password' && 
          !location.hash.includes('type=recovery')) {
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    
    checkAuth();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (session) {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("authToken");
        localStorage.removeItem("tokenExpiry");
        navigate('/login');
        toast({
          title: "Signed out",
          description: "You have been signed out",
          duration: 3000,
        });
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [toast, location.pathname, location.hash, navigate]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-portfolio-blue dark:text-blue-400">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
