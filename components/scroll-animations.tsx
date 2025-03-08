"use client"

import { useEffect, useState } from "react"

export default function ScrollAnimations() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated gradient background that moves with scroll */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% ${50 + scrollY * 0.02}%, rgba(168, 85, 247, 0.15), transparent 80%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${Math.sin((scrollY + i * 100) / 500) * 50}px)`,
              opacity: 0.5 + Math.sin((scrollY + i * 100) / 1000) * 0.5,
              transition: "transform 0.5s ease-out",
            }}
          />
        ))}

        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i + 20}
            className="absolute rounded-full bg-accent/10"
            style={{
              width: `${Math.random() * 15 + 8}px`,
              height: `${Math.random() * 15 + 8}px`,
              right: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              transform: `translateY(${Math.cos((scrollY + i * 100) / 500) * 50}px)`,
              opacity: 0.5 + Math.cos((scrollY + i * 100) / 1000) * 0.5,
              transition: "transform 0.5s ease-out",
            }}
          />
        ))}
      </div>

      {/* Horizontal lines that move with scroll */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full"
            style={{
              top: `${20 + i * 20}%`,
              transform: `translateX(${Math.sin((scrollY + i * 200) / 1000) * 20}%)`,
              opacity: 0.3 + Math.sin((scrollY + i * 200) / 1000) * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

