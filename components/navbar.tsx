import Link from 'next/link';
import { HomeIcon, LayoutDashboardIcon } from 'lucide-react';
import { AuthButton } from '@/components/auth-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { createClient } from '@/lib/supabase/server';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function Navigation() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-6">
            {/* Logo */}
            <Link href="/" className="text-primary hover:text-primary/90 transition-colors">
              <div className="flex items-center justify-center">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6" />
                  <path d="m21 12-6-3-6 3-6-3" />
                  <path d="M3 12h18" />
                  <path d="m8 8 8 8" />
                  <path d="m16 8-8 8" />
                </svg>
              </div>
            </Link>
            
            {/* Navigation - only show dashboard if logged in */}
            {isLoggedIn && (
              <nav className="hidden md:flex">
                <TooltipProvider>
                  <div className="flex gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/"
                          className="flex size-9 items-center justify-center rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 ease-in-out"
                        >
                          <HomeIcon size={18} aria-hidden="true" />
                          <span className="sr-only">Home</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="px-2 py-1 text-xs bg-background/95 backdrop-blur-sm">
                        <p>Home</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/protected"
                          className="flex size-9 items-center justify-center rounded-lg hover:bg-accent/50 hover:text-accent-foreground transition-all duration-200 ease-in-out"
                        >
                          <LayoutDashboardIcon size={18} aria-hidden="true" />
                          <span className="sr-only">Dashboard</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="px-2 py-1 text-xs bg-background/95 backdrop-blur-sm">
                        <p>Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </nav>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 rounded-lg bg-accent/20 backdrop-blur-sm p-1">
              <ThemeSwitcher />
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}