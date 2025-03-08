"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check if document is available (client-side)
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)
    }
  }, [])

  const toggleTheme = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark")
      setIsDarkMode(!isDarkMode)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
    </Button>
  )
}

