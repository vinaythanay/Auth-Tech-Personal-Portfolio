import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:8080/update-password',
      });

      if (error) {
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Recovery email sent",
        description: "Check your inbox for password reset instructions.",
        duration: 5000,
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-light-gray dark:bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="heading-md text-portfolio-dark-blue dark:text-white">Forgot Password</h2>
          <p className="text-portfolio-gray dark:text-gray-300 mt-2">
            {submitted
              ? "Check your email for reset instructions"
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

            <div className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-blue-600 dark:hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <Link to="/login">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue/10 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-900/20"
                >
                  Back to Login
                </Button>
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <p className="text-green-600 dark:text-green-400 text-center">
              If an account exists with this email, you will receive password reset instructions.
            </p>
            <Link to="/login">
              <Button
                type="button"
                className="w-full bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default ForgotPassword;