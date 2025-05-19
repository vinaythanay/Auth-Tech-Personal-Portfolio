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
    <div className="min-h-screen flex items-center justify-center bg-[#0b0c10] px-4">
  <div className="w-full max-w-md space-y-8 bg-[#161b22] p-8 rounded-2xl shadow-lg">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white">Forgot Password</h2>
      <p className="text-[#9ca3af] mt-2">
        {submitted
          ? "Check your email for reset instructions"
          : "Enter your email to receive a password reset link"}
      </p>
    </div>

    {!submitted ? (
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
          <Link to="/login">
            <Button
              type="button"
              variant="outline"
              className="w-full border border-[#8b5cf6] text-[#8b5cf6] bg-[#7c3aed]/20 hover:bg-[#8b5cf6]/30"

            >
              Back to Login
            </Button>
          </Link>
        </div>
      </form>
    ) : (
      <div className="mt-8 space-y-6">
        <p className="text-green-500 text-center">
          If an account exists with this email, you will receive password reset instructions.
        </p>
        <Link to="/login">
          <Button
            type="button"
            className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold"
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
