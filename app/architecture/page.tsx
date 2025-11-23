import {
  ArrowLeft,
  Database,
  Lock,
  Server,
  Layers,
  Code,
  Palette,
  Globe,
  Users,
  Zap,
  FileCode,
  Cloud,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">NextGen Project Architecture</h1>
          <p className="text-xl text-muted-foreground">Technical stack and component interaction diagram</p>
        </div>

        {/* Architecture Diagram */}
        <div className="space-y-8">
          {/* Client Layer */}
          <Card className="p-8 border-2 border-blue-500/50 bg-blue-500/5">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="h-8 w-8 text-blue-500" />
              <h2 className="text-2xl font-bold">Client Layer (Browser)</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-background">
                <Code className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">React 19</h3>
                <p className="text-sm text-muted-foreground">UI Components, State Management, Client Interactivity</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • Journey Cards
                  <br />• Track Listings
                  <br />• Interactive Forms
                </div>
              </Card>

              <Card className="p-6 bg-background">
                <Palette className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">Tailwind CSS v4</h3>
                <p className="text-sm text-muted-foreground">Utility-first styling, Design tokens, Responsive design</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • Custom theme
                  <br />• Dark mode support
                  <br />• Mobile-first
                </div>
              </Card>

              <Card className="p-6 bg-background">
                <Layers className="h-6 w-6 text-blue-400 mb-3" />
                <h3 className="font-semibold mb-2">shadcn/ui</h3>
                <p className="text-sm text-muted-foreground">Pre-built accessible components</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • Button, Card, Tabs
                  <br />• Form components
                  <br />• Navigation
                </div>
              </Card>
            </div>
          </Card>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-0.5 bg-gradient-to-b from-blue-500 to-green-500"></div>
              <div className="text-sm text-muted-foreground">HTTP Requests / Data Fetching</div>
              <div className="h-12 w-0.5 bg-gradient-to-b from-green-500 to-purple-500"></div>
            </div>
          </div>

          {/* Application Layer */}
          <Card className="p-8 border-2 border-green-500/50 bg-green-500/5">
            <div className="flex items-center gap-3 mb-6">
              <Server className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold">Application Layer (Next.js 15)</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 bg-background">
                <FileCode className="h-6 w-6 text-green-400 mb-3" />
                <h3 className="font-semibold mb-2">App Router (RSC)</h3>
                <p className="text-sm text-muted-foreground">Server-side rendering, Routing, Layouts</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • /tracks, /incubators
                  <br />• /journey/professional
                  <br />• Server Components
                  <br />• Streaming & Suspense
                </div>
              </Card>

              <Card className="p-6 bg-background">
                <Zap className="h-6 w-6 text-green-400 mb-3" />
                <h3 className="font-semibold mb-2">API Routes & Server Actions</h3>
                <p className="text-sm text-muted-foreground">Backend logic, Data mutations, Authentication</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • User registration
                  <br />• Profile updates
                  <br />• Journey progress
                  <br />• Incubator enrollment
                </div>
              </Card>
            </div>
          </Card>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              <div className="text-sm text-muted-foreground">SQL Queries / Auth Requests</div>
              <div className="h-12 w-0.5 bg-gradient-to-b from-pink-500 to-orange-500"></div>
            </div>
          </div>

          {/* Backend Services Layer */}
          <Card className="p-8 border-2 border-purple-500/50 bg-purple-500/5">
            <div className="flex items-center gap-3 mb-6">
              <Cloud className="h-8 w-8 text-purple-500" />
              <h2 className="text-2xl font-bold">Backend Services</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 bg-background">
                <Database className="h-6 w-6 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">Database</h3>
                <p className="text-sm text-muted-foreground">Relational data storage</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>Tables:</strong>
                  <br />• users
                  <br />• profiles
                  <br />• journeys
                  <br />• incubators
                  <br />• projects
                  <br />• contributions
                </div>
              </Card>

              <Card className="p-6 bg-background">
                <Lock className="h-6 w-6 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground">User authentication & authorization</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • Email/Password
                  <br />• OAuth (LinkedIn, GitHub, Google)
                  <br />• Role-based access
                  <br />• JWT tokens
                </div>
              </Card>

              <Card className="p-6 bg-background">
                <Users className="h-6 w-6 text-purple-400 mb-3" />
                <h3 className="font-semibold mb-2">Storage & Realtime</h3>
                <p className="text-sm text-muted-foreground">Live updates & file storage</p>
                <div className="mt-3 text-xs text-muted-foreground">
                  • Live collaboration
                  <br />• Profile images
                  <br />• Project files
                  <br />• Certificates
                </div>
              </Card>
            </div>
          </Card>

          {/* Data Flow Section */}
          <Card className="p-8 border-2 border-orange-500/50 bg-orange-500/5">
            <h2 className="text-2xl font-bold mb-6">Key Data Flows</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">User Registration & Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    React Form → Next.js Server Action → Auth Service → Create User → Return Session → Store in Client
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Journey Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    User Action → Server Action → Update Database (journeys table) → Realtime broadcast → Update all
                    connected clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Incubator Enrollment</h3>
                  <p className="text-sm text-muted-foreground">
                    Browse Incubators (SSR) → Select & Enroll (Client) → Server Action → Check eligibility → Insert into
                    Database → Send confirmation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-background rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Profile & Portfolio Display</h3>
                  <p className="text-sm text-muted-foreground">
                    Request Profile Page → Next.js SSR → Query Database (user + projects + contributions) → Render HTML
                    → Send to client
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Technology Benefits */}
          <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            <h2 className="text-2xl font-bold mb-6">Why This Stack?</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3 text-blue-400">Performance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Server-side rendering for fast initial loads</li>
                  <li>✓ Automatic code splitting and lazy loading</li>
                  <li>✓ Edge caching with Vercel CDN</li>
                  <li>✓ Optimized images and fonts</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-green-400">Developer Experience</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ TypeScript for type safety</li>
                  <li>✓ Hot module replacement</li>
                  <li>✓ Built-in API routes</li>
                  <li>✓ Excellent documentation</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-purple-400">Scalability</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Serverless architecture</li>
                  <li>✓ Automatic scaling with Vercel</li>
                  <li>✓ Database handles millions of users</li>
                  <li>✓ SQL for complex queries</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-3 text-pink-400">Security</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Row Level Security policies</li>
                  <li>✓ Built-in CSRF protection</li>
                  <li>✓ Secure authentication flows</li>
                  <li>✓ Environment variable management</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
