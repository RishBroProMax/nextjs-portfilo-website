"use client"

import { useState, useRef, useEffect } from "react"
import { Code, Database, Globe, Layout, Server, PenToolIcon as Tool, Wand2 } from "lucide-react"
import Terminal from "@/components/terminal"

const skillCategories = [
  {
    id: "frontend",
    name: "Frontend",
    icon: <Layout className="h-6 w-6" />,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Redux",
      "Zustand",
      "React Query",
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "Python",
      "Django",
      "GraphQL",
      "REST API",
      "WebSockets",
      "Microservices",
      "API Design",
      "Authentication",
      "Authorization",
    ],
  },
  {
    id: "database",
    name: "Database",
    icon: <Database className="h-6 w-6" />,
    skills: [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Prisma",
      "Mongoose",
      "SQL",
      "NoSQL",
      "Database Design",
      "Data Modeling",
      "Caching Strategies",
      "Query Optimization",
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    icon: <Tool className="h-6 w-6" />,
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Vercel",
      "CI/CD",
      "Jest",
      "Cypress",
      "Testing Library",
      "Webpack",
      "Vite",
      "ESLint",
      "Prettier",
      "GitHub Actions",
      "Terraform",
    ],
  },
  {
    id: "design",
    name: "Design",
    icon: <Wand2 className="h-6 w-6" />,
    skills: [
      "Figma",
      "Adobe XD",
      "UI/UX",
      "Responsive Design",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Accessibility",
      "Color Theory",
      "Typography",
      "Animation",
      "User Research",
    ],
  },
  {
    id: "other",
    name: "Other",
    icon: <Globe className="h-6 w-6" />,
    skills: [
      "SEO",
      "Performance Optimization",
      "Accessibility",
      "PWA",
      "Internationalization",
      "Content Management",
      "Technical Writing",
      "Agile Methodologies",
      "Scrum",
      "Project Management",
      "Mentoring",
    ],
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("frontend")
  const [isVisible, setIsVisible] = useState(false)
  const [visibleSkills, setVisibleSkills] = useState<Record<string, boolean[]>>({})
  const skillsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  // Initialize visible skills for each category
  useEffect(() => {
    const initialVisibleSkills: Record<string, boolean[]> = {}

    skillCategories.forEach((category) => {
      initialVisibleSkills[category.id] = category.skills.map(() => false)
    })

    setVisibleSkills(initialVisibleSkills)
  }, [])

  // Animate skills appearing when category is active and section is visible
  useEffect(() => {
    if (isVisible && activeCategory) {
      const category = skillCategories.find((c) => c.id === activeCategory)
      if (!category) return

      const newVisibleSkills = { ...visibleSkills }

      category.skills.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSkills((prev) => {
            const newState = { ...prev }
            if (newState[activeCategory]) {
              newState[activeCategory][index] = true
            }
            return newState
          })
        }, index * 50) // Stagger the appearance
      })
    }
  }, [isVisible, activeCategory])

  // Reset visible skills when changing category
  useEffect(() => {
    // Reset all skills to invisible
    const resetVisibleSkills: Record<string, boolean[]> = {}

    skillCategories.forEach((category) => {
      resetVisibleSkills[category.id] = category.skills.map(() => false)
    })

    setVisibleSkills(resetVisibleSkills)

    // Then animate the new category's skills
    if (isVisible) {
      const category = skillCategories.find((c) => c.id === activeCategory)
      if (!category) return

      category.skills.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSkills((prev) => {
            const newState = { ...prev }
            if (newState[activeCategory]) {
              newState[activeCategory][index] = true
            }
            return newState
          })
        }, index * 50) // Stagger the appearance
      })
    }
  }, [activeCategory])

  return (
    <section id="skills" ref={skillsRef} className="container py-24 md:py-32 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <h2 className="section-heading gradient-text">Skills & Expertise</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          I've worked with a variety of technologies and tools throughout my career. Here's a snapshot of my technical
          expertise.
        </p>
      </div>

      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        {skillCategories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
              activeCategory === category.id
                ? "bg-primary/20 border border-primary/50"
                : "bg-secondary/20 border border-border/40 hover:bg-primary/10"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <div className={`mb-2 ${activeCategory === category.id ? "text-primary" : "text-muted-foreground"}`}>
              {category.icon}
            </div>
            <span className={activeCategory === category.id ? "font-medium" : "text-muted-foreground"}>
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div
        className={`bg-secondary/20 border border-border/40 rounded-lg p-8 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skillCategories
            .find((c) => c.id === activeCategory)
            ?.skills.map((skill, index) => (
              <div
                key={skill}
                className={`flex items-center p-3 rounded-lg bg-background/50 border border-border/40 hover:border-primary/40 transition-all duration-500 ${
                  visibleSkills[activeCategory]?.[index]
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-4"
                }`}
              >
                <Code className="h-4 w-4 mr-2 text-primary" />
                <span>{skill}</span>
              </div>
            ))}
        </div>
      </div>

      <div
        id="terminal"
        className={`mt-24 transition-all duration-1000 delay-400 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Interactive Terminal</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Try out the interactive terminal below to learn more about me and my projects. Type{" "}
            <span className="text-primary font-mono">help</span> to see available commands or try{" "}
            <span className="text-primary font-mono">ls</span>, <span className="text-primary font-mono">cd</span>,{" "}
            <span className="text-primary font-mono">cat</span>, and other Unix-like commands.
          </p>
        </div>

        <Terminal />
      </div>
    </section>
  )
}

