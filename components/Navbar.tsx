"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AuthModal from "./AuthModal";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const supabase = createClient();
  const pathName = usePathname();
  const router = useRouter();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const toggleMenu = () => setisMenuOpen((prev) => !prev);
  const closeMenu = () => setisMenuOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const avatarUrl =
    user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 shadow-sm backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between h-16 py-4 container-tight">
          <Link href="/" className="text-xl font-bold">
            <span className="text-gradient">ATS Pro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="items-center hidden gap-6 md:flex">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathName === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className={cn(
                "text-sm font-medium transition-colors hover-text-foreground/80",
                pathName === "/upload"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              Try Now
            </Link>
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={avatarUrl} alt={user.email || ""} />
                    <AvatarFallback>
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                className="rounded-full min-w-20"
                size="sm"
                onClick={() => {
                  closeMenu();
                  openAuthModal();
                }}
              >
                Sign In
              </Button>
            )}
          </nav>

          {/* Mobile menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="inset-0 z-50 flex top-16 bg-background md:hidden">
            <nav className="flex flex-col items-center w-full gap-4 p-4">
              <Link
                href="/"
                onClick={closeMenu}
                className={cn(
                  "w-full p-2 text-center text-lg font-medium rounded-md transition-colors",
                  pathName === "/"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                Home
              </Link>

              <Link
                href="/upload"
                onClick={closeMenu}
                className={cn(
                  "w-full p-2 text-center text-lg font-medium rounded-md transition-colors",
                  pathName === "/upload"
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50 hover:text-accent-foreground"
                )}
              >
                Try Now
              </Link>

              {!user ? (
                <Button
                  className="w-full mt-2 rounded-full"
                  onClick={() => {
                    closeMenu();
                    openAuthModal();
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    className={cn(
                      "w-full p-2 text-center text-lg font-medium rounded-md transition-colors",
                      pathName === "/dashboard"
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    Dashboard
                  </Link>

                  <Button
                    className="w-full mt-2 rounded-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}
