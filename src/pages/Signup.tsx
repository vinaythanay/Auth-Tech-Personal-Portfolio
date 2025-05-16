
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Set email from location state if available (redirected from login)
  useEffect(() => {
    if (location.state?.email) {
      setFormData(prev => ({
        ...prev,
        email: location.state.email
      }));
    }
  }, [location.state]);

  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear password error when user types
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
  };

  const validatePassword = (password: string) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, 
    // one lowercase letter, one number, and one special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) {
      return "Password must be at least 8 characters long";
    }
    
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter";
    }
    
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter";
    }
    
    if (!hasNumbers) {
      return "Password must contain at least one number";
    }
    
    if (!hasSpecialChar) {
      return "Password must contain at least one special character";
    }
    
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation
      if (!formData.username || !formData.email || !formData.password) {
        throw new Error("All fields are required");
      }

      // Password validation
      const passwordValidationError = validatePassword(formData.password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        throw new Error(passwordValidationError);
      }

      if (formData.password !== formData.confirmPassword) {
        setPasswordError("Passwords don't match");
        throw new Error("Passwords don't match");
      }

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
          emailRedirectTo: window.location.origin + '/login',
        },
      });

      if (error) {
        throw error;
      }

      // For backward compatibility, still store user in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({
        username: formData.username,
        email: formData.email,
        // In a real application, only store the hashed password, never the plain text
        password: await simulatePasswordHash(formData.password),
      });
      localStorage.setItem("users", JSON.stringify(users));

      toast({
        title: "Account created!",
        description: "Please check your email for verification. Once verified, you can log in.",
        duration: 5000,
      });

      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred during signup.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // This is a simplified demonstration of password hashing
  // In a real application, this would be done securely on the server side
  const simulatePasswordHash = async (password: string) => {
    // This is just for demonstration - never implement hashing on the client side
    // In a real application, use bcrypt or a similar library on the server
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-light-gray dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="heading-md text-portfolio-dark-blue dark:text-white">Create an Account</h2>
          <p className="text-portfolio-gray dark:text-gray-300 mt-2">Sign up to create your portfolio</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username" className="dark:text-white">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Your username"
                value={formData.username}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="dark:text-white">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
              {passwordError && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Password must be at least 8 characters long and contain uppercase, lowercase, 
                number, and special character.
              </p>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="dark:text-white">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                required
              />
            </div>
          </div>

          <div className="text-sm">
            <span className="text-portfolio-gray dark:text-gray-300">Already have an account? </span>
            <Link to="/login" className="text-portfolio-blue dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
