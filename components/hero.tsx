"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Full-Stack Developer"
  const [showCursor, setShowCursor] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }

    // Blink cursor after typing is complete
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [typedText])

  useEffect(() => {
    setIsVisible(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  const technologies = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"]

  return (
    <section
      id="home"
      ref={heroRef}
      className="container flex min-h-[calc(100vh-4rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32 relative"
    >
      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Email - Vertical */}
      <div className="fixed right-8 bottom-0 hidden lg:flex flex-col items-center space-y-6 after:content-[''] after:w-px after:h-24 after:bg-border">
        <a
          href="mailto:rishmika@example.com"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 [writing-mode:vertical-rl] tracking-widest text-sm"
        >
          rishmika@example.com
        </a>
      </div>

      <div
        className={`space-y-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <p className="text-accent font-medium">Hello, I'm</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="gradient-text">Rishmika Sandanu</span>
        </h1>
        <div className="h-8 sm:h-10">
          <p className="text-xl sm:text-2xl text-muted-foreground">
            {typedText}
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
          </p>
        </div>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mt-4">
          Crafting beautiful, functional, and user-friendly digital experiences with modern web technologies.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {technologies.map((tech, index) => (
            <Badge
              key={tech}
              variant="tech"
              className="px-3 py-1 text-sm"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: "fadeIn 0.5s ease-in-out forwards",
                opacity: 0,
              }}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div
        className={`flex gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <Button
          size="lg"
          className="rounded-full group relative overflow-hidden"
          onClick={() => {
            const projectsSection = document.getElementById("projects")
            if (projectsSection) {
              const navHeight = document.querySelector("header")?.offsetHeight || 0
              const elementPosition = projectsSection.getBoundingClientRect().top + window.scrollY
              const offsetPosition = elementPosition - navHeight

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              })
            }
          }}
        >
          <span className="relative z-10 flex items-center">
            View My Work <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="rounded-full"
          onClick={() => {
            const contactSection = document.getElementById("contact")
            if (contactSection) {
              const navHeight = document.querySelector("header")?.offsetHeight || 0
              const elementPosition = contactSection.getBoundingClientRect().top + window.scrollY
              const offsetPosition = elementPosition - navHeight

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              })
            }
          }}
        >
          Contact Me
        </Button>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll down"
        onClick={(e) => {
          e.preventDefault()
          const aboutSection = document.getElementById("about")
          if (aboutSection) {
            const navHeight = document.querySelector("header")?.offsetHeight || 0
            const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - navHeight

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })
          }
        }}
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </a>

      {/* Animated Gradient Orb */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/20 to-accent/20 filter blur-[100px] opacity-50" />
      </div>
    </section>
  )
}

