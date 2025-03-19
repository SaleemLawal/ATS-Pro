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
    router.refresh();
  };
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
        <div className="container-tight flex items-center justify-between py-4 h-16">
          <Link href="/" className="font-bold text-xl">
            <span className="text-gradient">ATS Pro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
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

            {!user ? (
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
            ) : (
              <Button
                className="rounded-full min-w-20"
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
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
          <div className="flex inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="flex flex-col items-center gap-4 p-4 w-full">
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
                <Button
                  className="w-full mt-2 rounded-full"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}
