"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, ArrowLeft } from "lucide-react"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/onboarding"
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleKeycloakRegister = () => {
    const keycloakBase = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || "http://localhost:9090/realms/myrealm";
    const clientId = "nextjs-frontend";
    const redirectUri = encodeURIComponent("http://localhost:3000/api/auth/callback/keycloak?callbackUrl=/");
    const registerUrl = `${keycloakBase}/protocol/openid-connect/registrations?client_id=${clientId}&response_type=code&scope=openid+profile+email&redirect_uri=${redirectUri}`;
    window.location.href = registerUrl;
  };

  const handleGitHubSignup = () => {
    const keycloakBase = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || "http://localhost:9090/realms/myrealm";
    const clientId = "nextjs-frontend";
    const redirectUri = encodeURIComponent("http://localhost:3000/dashboard");
    // 👇 use kc_idp_hint to go directly to GitHub IdP
    const loginUrl = `${keycloakBase}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&scope=openid+profile+email&redirect_uri=${redirectUri}&kc_idp_hint=github`;
    window.location.href = loginUrl;
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(provider);
    if (provider === "github") {
      await signIn("keycloak", {
        callbackUrl: "/dashboard", // redirect back to home or another page
        authorizationParams: {
          screen_hint: "signup", // 👈 this tells Keycloak to open registration
        },
      });
    }
  };

  const handleSocialSignup1 = async (provider: string) => {
    setIsLoading(provider)
    setError(null)

    console.log("[v0] Starting signup with provider:", provider)
    console.log("[v0] Callback URL:", callbackUrl)
    console.log("[v0] Calling signIn with keycloak provider...")

    try {
      const result = await signIn("keycloak", {
        callbackUrl,
        redirect: true, // Explicitly enable redirect
      })

      console.log("[v0] signIn result:", result)

      // If we reach here without redirect, something went wrong
      if (result?.error) {
        console.error("[v0] Signup error from NextAuth:", result.error)
        setError(`Authentication failed: ${result.error}`)
        setIsLoading(null)
      }
    } catch (error) {
      console.error("[v0] Signup exception:", error)
      setError("Failed to connect to authentication service. Please check your configuration.")
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="border-border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Choose your preferred method to sign up and join the NextGen community 
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <Button
              variant="outline"
              className="w-full gap-2 h-11 text-base bg-transparent"
              onClick={handleGitHubSignup}
              disabled={isLoading !== null}
            >
              <Github className="h-5 w-5" />
              {isLoading === "github" ? "Connecting..." : "Continue with GitHub"}
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2 h-11 text-base bg-transparent"
              onClick={() => handleSocialSignup("linkedin")}
              disabled={isLoading !== null}
            >
              <Linkedin className="h-5 w-5" />
              {isLoading === "linkedin" ? "Connecting..." : "Continue with LinkedIn"}
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2 h-11 text-base bg-transparent"
              onClick={() => handleSocialSignup("google")}
              disabled={isLoading !== null}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading === "google" ? "Connecting..." : "Continue with Google"}
            </Button>

            <Button
              variant="outline"
              className="w-full gap-2 h-11 text-base bg-transparent"
              onClick={() => handleSocialSignup("microsoft")}
              disabled={isLoading !== null}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
              </svg>
              {isLoading === "microsoft" ? "Connecting..." : "Continue with Microsoft"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            <Button
              variant="default"
              className="w-full gap-2 h-11 text-base"
              onClick={handleKeycloakRegister}
              disabled={isLoading !== null}
            >
              <Mail className="h-5 w-5" />
              {isLoading === "email" ? "Connecting..." : "Continue with Email"}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
          By continuing, you agree to NextGen Project's{" "}
          <Link href="/terms" className="underline hover:text-foreground">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-foreground">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
