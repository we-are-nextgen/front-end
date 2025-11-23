import {DynamicIcon} from "@/components/ui/DynamicIcon";
import { getDomains } from "@/lib/controllers/restController";

export async function Domains() {
  const domains = await getDomains();
  return (
    <section className="py-1 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Choose Your <span className="text-primary">Tech Domain</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore 10 specialized career paths designed to match your skills, interests, and ambitions in the IT
            ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          {domains.map((track, index) => {
            const Icon = track.icon
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <DynamicIcon name={Icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                      {track.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{track.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-foreground/80 mb-2">Key Profiles:</h4>
                    <ul className="space-y-1">
                      {track.profiles.slice(0, 3).map((profile, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{profile.name}</span>
                        </li>
                      ))}
                      {track.profiles.length > 3 && (
                        <li className="text-sm text-muted-foreground/60 italic">+{track.profiles.length - 3} more</li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <h4 className="text-sm font-medium text-foreground/80 mb-1">In the Community:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{track.community}</p>
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}
