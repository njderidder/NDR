import { CVData } from '../types';

export const cvData: CVData = {
  hero: {
    name: "Nick de Ridder",
    headline: "Marketing Technology, AI Ops, and Growth",
    subheadline: "I build GTM systems, automation, and AI products that ship.",
    badges: ["HubSpot", "Make.com", "n8n", "RevOps", "Automation", "AI Agents", "GA4", "SEMrush", "Shopify", "RAG", "Vector Databases", "Python", "Webhooks", "API"]
  },
  about: {
    summary: "I am a Netherlands-based growth engineer and marketer, bridging the gap between technical implementation and strategic business goals. With over 4 years of experience across fast-growing scale-ups and agile startups, I specialize in building automated systems and integrating AI into operational workflows.",
    now: "Final month of my Master's at UvA. Currently completing my thesis on AI advisory systems.",
    image: "/NDR/nickpicture.png"
  },
  highlights: [
    { title: "AI Compliance Advisor", subtitle: "Legal Tech automation for freelance risk assessment" },
    { title: "Recruitment Automation", subtitle: "End-to-end AI agents for candidate matching" },
    { title: "MedTech Product Strategy", subtitle: "EU MDR compliance & EUDAMED registration" },
    { title: "Marketing Leadership", subtitle: "Head of Marketing at CryptoTag" }
  ],
  experience: [
    {
      id: "arc-biohacking",
      role: "Co-founder",
      company: "Arc Biohacking",
      type: "Co-founder",
      period: "Mar 2025 – Present",
      location: "Utrecht, Netherlands",
      logo: "https://images.prismic.io/boltcooling/aQIVPbpReVYa3y1o_2.png?auto=format,compress",
      bullets: [
        "Leading growth operations and product strategy for a new biohacking venture.",
        "Rapid experimentation with acquisition channels and community building."
      ]
    },
    {
      id: "helloprofs",
      role: "Growth Marketeer, Legal Tech & AI Innovation",
      company: "helloprofs.nl",
      type: "Freelance",
      period: "Feb 2025 – Present",
      location: "Aalsmeer, Netherlands (On-site)",
      logo: "https://helloprofs.nl/wp-content/uploads/2021/03/Logo-1000x300-achtergrond-transparant.png",
      bullets: [
        "Building an AI-driven compliance advisory tool to assess freelance collaboration risk under Dutch misclassification rules.",
        "Built and maintained a structured database of relevant Dutch case law and rulings.",
        "Implemented retrieval mechanisms to cite sources and ground recommendations in jurisprudence.",
        "Currently in build-and-test phase, working toward a scalable automated advisory product."
      ]
    },
    {
      id: "breedzorg",
      role: "MedTech Product and Compliance Strategist",
      company: "Breedzorg",
      type: "Freelance",
      period: "Jul 2025 – Present",
      location: "Utrecht, Netherlands (Hybrid)",
      logo: "https://breed-zorg.nl/cdn/shop/files/Breed_zorg_logo_verticaal.png?v=1724930483&width=300",
      bullets: [
        "Registering medical devices (e.g., braces) in EUDAMED ensuring EU MDR compliance.",
        "Preparing operations for stricter requirements effective Jan 1, 2026.",
        "Managing manufacturer relationships, sourcing, pricing, and product strategy."
      ]
    },
    {
      id: "cryptotag",
      role: "Head of Marketing (Part-time)",
      company: "CryptoTag",
      type: "Part-time",
      period: "Jan 2023 – Present",
      location: "Utrecht, Netherlands (On-site)",
      logo: "https://cryptotag.cdn.prismic.io/cryptotag/f5f426e6-d28e-43d9-bfe6-6849ea2eef26_cryptotag-logo.svg",
      bullets: [
        "Leading growth channels including influencer and affiliate partnerships.",
        "Managing performance marketing, brand strategy, and community engagement.",
        "Executing continuous growth experiments to optimize conversion."
      ]
    },
    {
      id: "werkgroup",
      role: "Optimization & Digital Transformation Consultant",
      company: "Werkgroup",
      type: "Freelance",
      period: "Jan 2025 – Aug 2025",
      location: "Aalsmeer, Netherlands (Hybrid)",
      logo: "https://werkgroup.nl/wp-content/uploads/2019/09/Werkgroup-logo.png",
      bullets: [
        "Modernized recruitment pipeline by integrating OTYS, Apify, and AI solutions.",
        "Built custom GPT agents for candidate-job matching and vacancy content creation.",
        "Developed transcription tooling to enrich ATS profiles from interviews.",
        "Designed automated XML feed workflows via Make.com for real-time vacancy syndication."
      ]
    },
    {
      id: "ravensbergen",
      role: "Web Developer and SEO Optimizer",
      company: "Ravensbergen Food B.V.",
      type: "Freelance",
      period: "Jun 2025 – Jul 2025",
      location: "Remote",
      logo: "https://ravensbergenfood.com/wp-content/uploads/2021/08/Haco_ravensbergen_Logo_mit_claim_cmyk_RZ.png",
      bullets: [
        "Fixed WordPress/Elementor forms and improved application routing flows.",
        "Ran a technical SEO audit resolving 280+ issues across 18 types.",
        "Improved mobile PageSpeed performance by 42% and fixed broken links."
      ]
    },
    {
      id: "evcompany",
      role: "Online Marketeer (Freelance)",
      company: "EV Company",
      type: "Freelance",
      period: "Aug 2023 – May 2024",
      location: "Remote",
      logo: "https://evcompany.eu/wp-content/uploads/2025/05/2-Logo-in-kleur-Medium-Transparant-2.webp",
      bullets: [
        "Developed digital strategy and SEO initiatives.",
        "Executed lightweight growth experiments."
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "AI Compliance Advisor",
      description: "Automated risk assessment for freelancer collaboration using Dutch case law.",
      details: {
        problem: "Companies struggle to assess misclassification risk under new Dutch 'ZZP' laws manually.",
        solution: "A RAG-based system that retrieves comparable court rulings to ground advice in actual jurisprudence.",
        tech: ["Python", "Vector DB", "OpenAI API", "Legal Data"]
      }
    },
    {
      id: "p2",
      title: "MedTech Product Finder",
      description: "Intelligent assistant for recommending medical braces and aids.",
      details: {
        problem: "Complex medical device catalog makes it hard for users to find the correct product compliance-wise.",
        solution: "Custom frontend + AI backend that interviews the user and maps needs to EUDAMED-compliant inventory.",
        tech: ["React", "Node.js", "Gemini API", "EUDAMED"]
      }
    },
    {
      id: "p3",
      title: "Recruitment Ops Suite",
      description: "Full-cycle automation for candidate matching and data enrichment.",
      details: {
        problem: "High volume of manual data entry in ATS (OTYS) and slow candidate screening.",
        solution: "Integrated Make.com workflows with custom GPT agents to parse interviews, enrich profiles, and syndicate XML feeds.",
        tech: ["Make.com", "OTYS API", "Apify", "Custom GPTs"]
      }
    }
  ],
  education: [
    {
      school: "University of Amsterdam",
      degree: "Master of Business Administration",
      period: "Feb 2025 – Jan 2026",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amsterdamuniversitylogo.svg/500px-Amsterdamuniversitylogo.svg.png",
      notes: ["Thesis on AI advisory systems", "Expected GPA: 8.0"]
    },
    {
      school: "University of Amsterdam",
      degree: "Pre-Master Business Administration",
      period: "Sep 2024 – Dec 2024",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Amsterdamuniversitylogo.svg/500px-Amsterdamuniversitylogo.svg.png"
    },
    {
      school: "Amsterdam University of Applied Sciences",
      degree: "Bachelor of Applied Science, Digital Marketing",
      period: "2020 – 2024",
      logo: "", // Fallback
      notes: ["Completed Honors Program", "Minor: Investing & Sustainability (Grade: 9, Invited Speaker at BeleggersFair)"]
    }
  ],
  certifications: [
    { name: "ESG", issuer: "Corporate Finance Institute", date: "Jan 2023" },
    { name: "Cross Border", issuer: "e-Academy.org", date: "May 2022" },
    { name: "Google Analytics for Beginners", issuer: "Google", date: "Apr 2022" },
    { name: "Conversion Rate Optimization", issuer: "e-Academy.org", date: "Issued" }
  ],
  skills: [
    {
      category: "Marketing Ops & Growth",
      skills: ["HubSpot", "Automation", "RevOps Alignment", "Reporting", "Attribution"]
    },
    {
      category: "AI & Data",
      skills: ["OpenAI API", "Gemini", "Prompt Engineering", "Custom GPTs", "Python", "Vector DBs"]
    },
    {
      category: "Web & SEO",
      skills: ["WordPress", "Elementor", "Technical SEO Audits", "Google Analytics", "Performance Optimization"]
    },
    {
      category: "Compliance",
      skills: ["EU MDR", "EUDAMED", "Medical Device Classification", "GDPR Basics"]
    }
  ],
  contact: {
    email: "ndrconsultancy@outlook.com",
    linkedin: "https://www.linkedin.com/in/nick-de-ridder-302858228/",
    whatsapp: "https://wa.me/31639308436",
    phone: "+31639308436"
  }
};
