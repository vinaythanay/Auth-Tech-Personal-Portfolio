import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const UpdatePassword = () => {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token");
  const type = searchParams.get("type");

  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (type === "recovery" && accessToken) {
      // Set the session with the provided access_token
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: "", // optional, for this case, it might not be necessary
      }).catch((error) => {
        console.error("Session set failed:", error);
        toast({
          title: "Session Error",
          description: "Failed to set the session. Please try again.",
          variant: "destructive",
        });
      });
    }
  }, [type, accessToken, toast]);

  const handleUpdatePassword = async () => {
    if (!newPassword) return;

    setLoading(true);

    // Ensure session is set before performing update
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Updated",
        description: "You can now log in with your new password.",
      });
      // Optionally, you can redirect to login or another page
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow p-6 rounded">
        <h2 className="text-2xl font-bold mb-4">Update Your Password</h2>
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          onClick={handleUpdatePassword}
          className="mt-4 w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
};

export default UpdatePassword;
