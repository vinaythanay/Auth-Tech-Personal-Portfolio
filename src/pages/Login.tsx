import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUsers, setHasUsers] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Improved: Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user) {
        navigate('/');
        return;
      }

      // Check for users in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      setHasUsers(users.length > 0);

      if (users.length === 0) {
        // Check Supabase profiles table
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        if (count === 0) {
          toast({
            title: "Welcome to the portfolio!",
            description: "Please sign up to create your account.",
            duration: 3000,
          });
          navigate('/signup');
        } else {
          setHasUsers(true);
        }
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }

      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          const { data: userExists } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', email)
            .maybeSingle();

          if (!userExists) {
            toast({
              title: "Account not found",
              description: "This email is not registered. Please sign up first.",
              variant: "destructive",
              duration: 3000,
            });
            navigate("/signup", { state: { email } });
            return;
          } else {
            throw new Error("Invalid password. Please try again.");
          }
        } else {
          throw error;
        }
      }

      if (data.session) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);

        toast({
          title: "Login successful",
          description: "You have been redirected to your portfolio page.",
          duration: 3000,
        });

        navigate("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasUsers) {
    return null; // Redirect will occur in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-light-gray dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="heading-md text-portfolio-dark-blue dark:text-white">Welcome Back</h2>
          <p className="text-portfolio-gray dark:text-gray-300 mt-2">Log in to access your portfolio</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="dark:text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-portfolio-gray dark:text-gray-300">Don't have an account? </span>
              <Link to="/signup" className="text-portfolio-blue dark:text-blue-400 hover:underline">
                Sign up
              </Link>
            </div>
            <Link to="/forgot-password" className="text-sm text-portfolio-blue dark:text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
