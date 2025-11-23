export const dashboardData = {
  stages: [
    {
      id: 1,
      description: "Onboarding & Learning",
      icon: "BookOpen",
      milestones: [
        {
          id: 1,
          description: "Join community, set up profile",
          name: "Join community, set up profile"
        },
        {
          id: 2,
          description: "Enroll in bootcamps & hands-on labs",
          name: "Enroll in bootcamps & hands-on labs"
        },
        {
          id: 3,
          description: "Work toward certifications",
          name: "Work toward certifications"
        }
      ],
      name: "Foundation"
    },
    {
      id: 2,
      description: "Real Use Cases",
      icon: "Code",
      milestones: [
        {
          id: 4,
          description: "Join hackathons & coding challenges",
          name: "Join hackathons & coding challenges"
        },
        {
          id: 5,
          description: "Work on customer use-case simulations",
          name: "Work on customer use-case simulations"
        },
        {
          id: 6,
          description: "Start building GitHub portfolio",
          name: "Start building GitHub portfolio"
        }
      ],
      name: "Practice"
    },
    {
      id: 3,
      description: "Projects & Open Source",
      icon: "GitPullRequest",
      milestones: [
        {
          id: 7,
          description: "Contribute to open source projects",
          name: "Contribute to open source projects"
        },
        {
          id: 8,
          description: "Join team incubators (cross-functional squads)",
          name: "Join team incubators (cross-functional squads)"
        },
        {
          id: 9,
          description: "Build reputation via successful contributions",
          name: "Build reputation via successful contributions"
        }
      ],
      name: "Contribution"
    },
    {
      id: 4,
      description: "Mentorship & Leadership",
      icon: "Users",
      milestones: [
        {
          id: 10,
          description: "Become a mentor for new members",
          name: "Become a mentor for new members"
        },
        {
          id: 11,
          description: "Publish blogs, give talks, advocate technologies",
          name: "Publish blogs, give talks, advocate technologies"
        },
        {
          id: 12,
          description: "Guide teams & incubators",
          name: "Guide teams & incubators"
        }
      ],
      name: "Growth"
    },
    {
      id: 5,
      description: "Career & Global Influence",
      icon: "TrendingUp",
      milestones: [
        {
          id: 13,
          description: "Land jobs or build startups",
          name: "Land jobs or build startups"
        },
        {
          id: 14,
          description: "Launch impactful community projects",
          name: "Launch impactful community projects"
        },
        {
          id: 15,
          description: "Scale contributions across industries",
          name: "Scale contributions across industries"
        }
      ],
      name: "Impact"
    }
  ],

  domains: [
    { id: "engineering", name: "Engineering & Development" },
    { id: "data-ai", name: "Data & AI" },
    { id: "security", name: "Security" },
    { id: "product-design", name: "Product & Design" },
    { id: "leadership", name: "Leadership & Strategy" },
    { id: "education", name: "Education & Community" },
  ],
  tracks: {
    engineering: [
      {
        id: "software-engineering",
        name: "Software & Application Engineering",
        profiles: [
          "Frontend Developer",
          "Backend Developer",
          "Full Stack Engineer",
          "Mobile Developer",
          "QA Automation",
        ],
        actions: [
          "Contribute to startup MVPs",
          "Join open-source projects",
          "Participate in product incubators",
        ],
      },
      {
        id: "cloud-devops",
        name: "Cloud, DevOps & Infrastructure",
        profiles: [
          "DevOps Engineer",
          "Site Reliability Engineer",
          "Cloud Architect",
        ],
        actions: [
          "Design cloud labs",
          "Support startup deployments",
          "Optimize environments",
        ],
      },
    ],
    "data-ai": [
      {
        id: "data-ai-analytics",
        name: "Data, AI & Analytics",
        profiles: ["Data Engineer", "ML Engineer", "Data Scientist"],
        actions: [
          "Participate in Kaggle competitions",
          "Deploy ML models",
          "Collaborate on AI projects",
        ],
      },
    ],
  },
};
