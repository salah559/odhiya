import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Link, useLocation } from "wouter";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const { user, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setLocation("/");
  };

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === "admin") return "/admin";
    if (user.role === "seller") return "/seller";
    return "/browse";
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin": return "مدير";
      case "seller": return "بائع";
      case "buyer": return "مشتري";
      default: return role;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md" data-testid="link-home">
            <img 
              src="/logo.png?v=3" 
              alt="أضحيتي" 
              className="h-14 md:h-16 w-auto object-contain"
              onError={(e) => {
                console.log('Logo failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link href={getDashboardLink() || "/"}>
                  <Button variant="ghost" data-testid="link-dashboard">
                    لوحة التحكم
                  </Button>
                </Link>
                {(user.role === "buyer" || user.role === "admin") && (
                  <Link href="/browse">
                    <Button variant="ghost" data-testid="link-browse">
                      تصفح الأغنام
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Link href="/browse">
                <Button variant="ghost" data-testid="link-browse">
                  تصفح الأغنام
                </Button>
              </Link>
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {getRoleLabel(user.role)}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} data-testid="button-signout">
                    <LogOut className="ml-2 h-4 w-4" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hidden sm:block" data-testid="link-login">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="link-register">
                    إنشاء حساب
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2">
            {user ? (
              <>
                <Link href={getDashboardLink() || "/"}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    لوحة التحكم
                  </Button>
                </Link>
                {(user.role === "buyer" || user.role === "admin") && (
                  <Link href="/browse">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      تصفح الأغنام
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/browse">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تصفح الأغنام
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="w-full justify-start sm:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
