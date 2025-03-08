"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Menu, X, Download } from "lucide-react"
import ThemeToggle from "@/components/theme-toggle"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollProgress, setScrollProgress] = useState(0)
  const navRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#terminal", label: "Terminal", id: "terminal" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background
      setScrolled(window.scrollY > 20)

      // Update scroll progress
      const scrollPosition = window.scrollY
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / windowHeight) * 100
      setScrollProgress(scrollPercentage)

      // Update active section
      const sections = navLinks.map((link) => document.getElementById(link.id))
      const currentSection = sections.findIndex((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection !== -1) {
        setActiveSection(navLinks[currentSection].id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)

    if (element) {
      const navHeight = navRef.current?.offsetHeight || 0
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold gradient-text">Rishmika.dev</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                activeSection === link.id ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
              }`}
              onClick={(e) => handleNavLinkClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}

          <ThemeToggle />

          <Link href="https://github.com/rishmika" target="_blank" rel="noreferrer">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          <Button size="sm" className="rounded-full group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Resume
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />

          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <nav className="container flex flex-col items-center justify-center h-full space-y-8 text-lg font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  activeSection === link.id ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
                onClick={(e) => handleNavLinkClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col space-y-4 items-center">
              <Link href="https://github.com/rishmika" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" className="rounded-full w-40">
                  <Github className="mr-2 h-5 w-5" /> GitHub
                </Button>
              </Link>

              <Button size="lg" className="rounded-full w-40">
                <Download className="mr-2 h-5 w-5" /> Resume
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

