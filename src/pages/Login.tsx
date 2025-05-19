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

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (user) {
        navigate('/');
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      setHasUsers(users.length > 0);

      if (users.length === 0) {
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
          description: "You have been redirected to my portfolio page.",
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
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] px-4">
      <div className="w-full max-w-md space-y-8 bg-[#161b22] p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-[#9ca3af] mt-2">Log in to access my personal portfolio</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1f2937] text-white border border-[#374151]"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#1f2937] text-white border border-[#374151]"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-[#9ca3af]">Don't have an account? </span>
              <Link to="/signup" className="text-[#8b5cf6] hover:underline">
                Sign up
              </Link>
            </div>
            <Link to="/forgot-password" className="text-sm text-[#8b5cf6] hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold"
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
