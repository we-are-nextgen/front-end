"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthWrapper from "@/components/AuthWrapper";

export function Header() {
  return (
    <SessionProvider>
      <HeaderContent />
    </SessionProvider>
  );
}

function HeaderContent() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* use h-10/h-16 to control header height */}
        <div className="flex justify-between h-10 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-blue-600">
              NextGen
            </Link>
          </div>
        {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <AuthWrapper>
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
                </Link>
            </AuthWrapper>
          </nav>

        <div className="flex items-center space-x-4">
        <AuthWrapper fallback={
             <Button onClick={() => signIn("keycloak")} size="sm">
                Sign In
              </Button>
            }>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-amber-900 hidden md:inline">{session?.user?.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
        </AuthWrapper>
        </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setIsOpen(!isOpen)}
              size="sm"
            >
              Menu
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="flex flex-col mt-2 space-y-1 md:hidden">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
} 

