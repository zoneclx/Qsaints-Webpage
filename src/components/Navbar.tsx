import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={scrollToTop} className="hover:opacity-80 transition-opacity">
            <img src={logo} alt="Qsaints co." className="h-8 sm:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/shop"
              onClick={scrollToTop}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive("/shop") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Shop
            </Link>
            <Link
              to="/collections"
              onClick={scrollToTop}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive("/collections") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Collections
            </Link>
            <Link
              to="/about"
              onClick={scrollToTop}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive("/about") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={scrollToTop}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive("/contact") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Contact
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden xl:inline">Sign Out</span>
              </Button>
            ) : (
              <Link to="/auth" onClick={scrollToTop}>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden xl:inline">Sign In</span>
                </Button>
              </Link>
            )}
            <Link to="/cart" onClick={scrollToTop}>
              <Button variant="ghost" size="icon" className="hover:bg-accent relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/cart" onClick={scrollToTop}>
              <Button variant="ghost" size="icon" className="hover:bg-accent relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    variant="destructive"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link
                    to="/shop"
                    onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                    className={cn(
                      "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                      isActive("/shop") ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    Shop
                  </Link>
                  <Link
                    to="/collections"
                    onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                    className={cn(
                      "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                      isActive("/collections") ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    Collections
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                    className={cn(
                      "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                      isActive("/about") ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}
                    className={cn(
                      "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                      isActive("/contact") ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    Contact
                  </Link>
                  <div className="border-t border-border my-4" />
                  {user ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleSignOut();
                        setMobileMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => { setMobileMenuOpen(false); scrollToTop(); }}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-5 w-5 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
