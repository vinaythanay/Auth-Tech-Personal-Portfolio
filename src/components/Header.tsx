import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear local storage used for backward compatibility
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
      
      setIsAuthenticated(false);
      
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
        duration: 3000,
      });
      
      navigate("/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
     { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-portfolio-dark-blue/95 shadow-sm backdrop-blur-sm py-3"
          : "bg-transparent dark:bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-primary ">
          Vinay<span className="text-secondary">Kumar.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium dark:text-	#0f172a-200 hover:text-portfolio-blue dark:hover:text-portfolio-light-blue transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <Button 
              onClick={handleLogout}
              className="flex items-center gap-2 btn-primary"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-portfolio-light-blue dark:hover:bg-portfolio-blue">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-white dark:bg-portfolio-dark-blue z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 pt-16">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 text-gray-700 dark:text-gray-200"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl text-gray-800 dark:text-gray-200 hover:text-portfolio-blue dark:hover:text-portfolio-light-blue transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              {link.name}
            </a>
          ))}
          
          {isAuthenticated ? (
            <Button 
              onClick={() => {
                handleLogout();
                toggleMobileMenu();
              }}
              className="bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-portfolio-light-blue dark:hover:bg-portfolio-blue"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" onClick={toggleMobileMenu}>
              <Button className="bg-portfolio-blue hover:bg-portfolio-light-blue dark:bg-portfolio-light-blue dark:hover:bg-portfolio-blue">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
