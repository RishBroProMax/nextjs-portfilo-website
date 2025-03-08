"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Github, ExternalLink, X } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  longDescription?: string
  image: string
  tags: string[]
  category: string
  liveUrl: string
  githubUrl: string
  features?: string[]
  testimonial?: {
    text: string
    author: string
    role: string
  }
}

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const projectsRef = useRef<HTMLElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedProject(null)
      }
    }

    if (selectedProject) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [selectedProject])

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      longDescription:
        "This comprehensive e-commerce platform offers a seamless shopping experience with features like product filtering, user authentication, shopping cart functionality, secure checkout with Stripe integration, order history, and admin dashboard for product management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
      category: "fullstack",
      liveUrl: "https://project1.example.com",
      githubUrl: "https://github.com/alexdev/project1",
      features: [
        "User authentication and profile management",
        "Product catalog with search and filtering",
        "Shopping cart with persistent storage",
        "Secure checkout with Stripe integration",
        "Order history and tracking",
        "Admin dashboard for product management",
      ],
      testimonial: {
        text: "This platform revolutionized our online sales. The user experience is exceptional and our conversion rates have increased by 35%.",
        author: "Sarah Johnson",
        role: "E-commerce Manager",
      },
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A Kanban-style task manager with drag-and-drop functionality and real-time updates.",
      longDescription:
        "This collaborative task management application helps teams organize their workflow using a Kanban board approach. It features real-time updates, drag-and-drop task organization, team collaboration tools, customizable workflows, and detailed analytics to track productivity.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Firebase", "Styled Components", "DnD"],
      category: "frontend",
      liveUrl: "https://project2.example.com",
      githubUrl: "https://github.com/alexdev/project2",
      features: [
        "Drag-and-drop Kanban board interface",
        "Real-time updates with Firebase",
        "Team collaboration and task assignment",
        "Customizable workflows and labels",
        "Task commenting and file attachments",
        "Productivity analytics and reporting",
      ],
      testimonial: {
        text: "This tool has transformed how our team collaborates. The real-time updates and intuitive interface have made project management a breeze.",
        author: "Michael Chen",
        role: "Product Manager",
      },
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website with dark mode and animations.",
      longDescription:
        "This portfolio website showcases creative work with a focus on visual appeal and performance. It features smooth animations, dark/light mode toggle, responsive design for all devices, and an integrated blog with a custom CMS.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Three.js"],
      category: "frontend",
      liveUrl: "https://project3.example.com",
      githubUrl: "https://github.com/alexdev/project3",
      features: [
        "Responsive design for all devices",
        "Dark/light mode toggle",
        "Smooth page transitions and animations",
        "3D elements with Three.js",
        "Integrated blog with MDX",
        "Contact form with email integration",
      ],
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A weather application with location search, forecasts, and interactive maps.",
      longDescription:
        "This comprehensive weather application provides detailed forecasts and meteorological data. It includes location-based weather information, 7-day forecasts, interactive maps with weather layers, historical weather data, and severe weather alerts.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "OpenWeather API", "Mapbox", "Chart.js"],
      category: "frontend",
      liveUrl: "https://project4.example.com",
      githubUrl: "https://github.com/alexdev/project4",
      features: [
        "Location-based weather information",
        "7-day forecast with detailed hourly breakdowns",
        "Interactive maps with weather layers",
        "Historical weather data and trends",
        "Severe weather alerts and notifications",
        "Weather data visualization with charts",
      ],
      testimonial: {
        text: "The most accurate and user-friendly weather app I've used. The interactive maps and detailed forecasts are incredibly helpful.",
        author: "Emily Rodriguez",
        role: "Outdoor Tour Guide",
      },
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      description: "A comprehensive fitness application for tracking workouts, nutrition, and progress.",
      longDescription:
        "This fitness companion app helps users achieve their health goals by tracking workouts, nutrition, and overall progress. It features customizable workout plans, nutrition tracking with a food database, progress visualization, and social features for motivation.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React Native", "Node.js", "MongoDB", "Chart.js"],
      category: "mobile",
      liveUrl: "https://project5.example.com",
      githubUrl: "https://github.com/alexdev/project5",
      features: [
        "Customizable workout plans and routines",
        "Nutrition tracking with extensive food database",
        "Progress visualization with charts and graphs",
        "Goal setting and achievement tracking",
        "Social features for sharing and motivation",
        "Integration with fitness wearables",
      ],
    },
    {
      id: 6,
      title: "AI Content Generator",
      description: "An AI-powered application for generating marketing content and social media posts.",
      longDescription:
        "This innovative tool leverages AI to help marketers create compelling content quickly. It generates blog posts, social media content, email campaigns, and more based on user inputs and preferences, with tools for customization and brand voice consistency.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "OpenAI API", "Node.js", "MongoDB"],
      category: "ai",
      liveUrl: "https://project6.example.com",
      githubUrl: "https://github.com/alexdev/project6",
      features: [
        "AI-powered content generation for multiple formats",
        "Brand voice customization and consistency",
        "Content calendar and scheduling",
        "SEO optimization suggestions",
        "Performance analytics for published content",
        "Team collaboration features",
      ],
      testimonial: {
        text: "This tool has cut our content creation time in half while maintaining quality. The AI suggestions are remarkably on-brand and engaging.",
        author: "Alex Thompson",
        role: "Marketing Director",
      },
    },
  ]

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "frontend", label: "Frontend" },
    { value: "fullstack", label: "Full Stack" },
    { value: "mobile", label: "Mobile" },
    { value: "ai", label: "AI" },
  ]

  return (
    <section id="projects" ref={projectsRef} className="container py-24 md:py-32">
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <h2 className="section-heading gradient-text">My Projects</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Here are some of my recent projects. Each one was built with a focus on solving real problems with clean,
          efficient, and maintainable code.
        </p>
      </div>

      <Tabs
        defaultValue="all"
        className={`transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="flex justify-center mb-8">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((project) => category.value === "all" || project.category === category.value)
                .map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden border border-border/40 bg-secondary/20 card-hover"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
                        style={{
                          transform: hoveredProject === project.id ? "scale(1.05)" : "scale(1)",
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <div className="flex space-x-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-background/50 backdrop-blur-sm"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-5 w-5" />
                              <span className="sr-only">GitHub</span>
                            </a>
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full bg-background/50 backdrop-blur-sm"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-5 w-5" />
                              <span className="sr-only">Live Demo</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="tech" className="px-3 py-1 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="text-center mt-12">
        <Button variant="outline" className="rounded-full">
          <Github className="mr-2 h-4 w-4" />
          See More on GitHub
        </Button>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="bg-background border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="relative aspect-video">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                width={1200}
                height={675}
                className="object-cover w-full h-full rounded-t-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full bg-background/50 backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag) => (
                  <Badge key={tag} variant="tech" className="px-3 py-1">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-lg mb-6">{selectedProject.longDescription || selectedProject.description}</p>

              {selectedProject.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.testimonial && (
                <div className="mb-6 p-4 bg-secondary/20 rounded-lg border border-border/40">
                  <p className="italic mb-2">"{selectedProject.testimonial.text}"</p>
                  <p className="font-semibold">{selectedProject.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedProject.testimonial.role}</p>
                </div>
              )}

              <div className="flex space-x-4 mt-6">
                <Button asChild>
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

