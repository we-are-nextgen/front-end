import { Code2, Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">NextGen Project</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building a global ecosystem for IT professionals, startups, and recruiters to collaborate and innovate.
            </p>
          </div>

          {/* For Professionals */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Professionals</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/register" className="hover:text-foreground transition-colors">
                  Join Community
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Browse Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Learning Paths
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Recruiters</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Talent Pool
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Sponsor Programs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Host Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-foreground transition-colors">
                  Architecture
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 NextGen Project. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
