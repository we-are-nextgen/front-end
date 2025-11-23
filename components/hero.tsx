"use client";

import { Button } from "@/components/ui/button"
import { ArrowRight, Code2 } from "lucide-react"
import Image from 'next/image';
import Link from "next/link"
import AuthWrapper from "@/components/AuthWrapper";
import { SessionProvider } from "next-auth/react";

export function Hero() {
  return (    
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* added min-h-screen to make sure content is always top aligned */}  
      <div className="min-h-screen container relative z-10 px-4 py-20 md:py-5">

        <div className="mx-auto max-w-5xl text-center">
          {/* Logo/Brand */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
              <Code2 className="h-5 w-5 text-primary" />  
              <Image
                src="/logo.png"
                width={124}
                height={64}
                alt="NextGen Logo"  
              />
            </div>
          </div>

          {/* Main headline */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl text-balance">
            Build the future of <span className="text-primary">open technology</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl leading-relaxed text-pretty">
            A global ecosystem where IT professionals, startups, and recruiters collaborate to learn, innovate, and
            co-create through real-world projects.
          </p>
          {/* Call to Action Buttons */}
          <SessionProvider>
          <AuthWrapper fallback={
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base gap-2" asChild>
              <Link href="/register">
                Join as IT Professional
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/register">I'm a Recruiter</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base bg-transparent" asChild>
              <Link href="/register">I'm a Startup</Link>
            </Button>
          </div>            
            }>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base gap-2" asChild>
              <Link href="/dashboard">
                Go to you Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            </div>
          </AuthWrapper>
          </SessionProvider>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">10K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">150+</div>
              <div className="mt-1 text-sm text-muted-foreground">Startups Incubated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">200+</div>
              <div className="mt-1 text-sm text-muted-foreground">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">500+</div>
              <div className="mt-1 text-sm text-muted-foreground">Open Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
  )
}
