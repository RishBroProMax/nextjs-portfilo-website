"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Award, BookOpen, Briefcase } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

type TimelineItem = {
  year: string
  title: string
  company: string
  description: string
}

type EducationItem = {
  year: string
  degree: string
  institution: string
  description: string
}

type SkillItem = {
  name: string
  level: number
}

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [])

  const workExperience: TimelineItem[] = [
    {
      year: "2021 - Present",
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      description:
        "Lead the development of a SaaS platform using Next.js and TypeScript. Implemented CI/CD pipelines and mentored junior developers.",
    },
    {
      year: "2019 - 2021",
      title: "Full-Stack Developer",
      company: "Digital Solutions LLC",
      description:
        "Built RESTful APIs with Node.js and Express. Developed responsive web applications with React and Redux.",
    },
    {
      year: "2017 - 2019",
      title: "Web Developer",
      company: "Creative Agency",
      description:
        "Created custom WordPress themes and plugins. Collaborated with designers to implement pixel-perfect websites.",
    },
  ]

  const education: EducationItem[] = [
    {
      year: "2013 - 2017",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      description: "Graduated with honors. Specialized in web development and software engineering.",
    },
    {
      year: "2020",
      degree: "Advanced React & GraphQL",
      institution: "Online Certification",
      description: "Completed an intensive course on advanced React patterns and GraphQL implementation.",
    },
    {
      year: "2022",
      degree: "AWS Certified Developer",
      institution: "Amazon Web Services",
      description: "Earned certification for designing and developing AWS cloud-based applications.",
    },
  ]

  const skills: SkillItem[] = [
    { name: "React/Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "GraphQL", level: 80 },
    { name: "AWS", level: 75 },
    { name: "Docker", level: 70 },
  ]

  const achievements = [
    "Best Developer Award 2022 - Tech Innovators Inc.",
    "Open Source Contributor - 500+ contributions on GitHub",
    "Speaker at React Conference 2021",
    "Published 15+ technical articles on web development",
    "Mentor for 20+ junior developers",
  ]

  return (
    <section id="about" ref={aboutRef} className="container py-24 md:py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div
        className={`transition-all duration-1000 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="section-heading gradient-text">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate full-stack developer with 5+ years of experience creating modern web applications. My
            journey in tech started when I built my first website at 15, and I've been hooked ever since.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-secondary/20 border border-border/40 hover:border-primary/40 transition-all duration-300 transform hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-primary" /> Professional Background
              </h3>
              <p className="text-muted-foreground">
                I specialize in React, Next.js, Node.js, and TypeScript, with a strong focus on creating performant,
                accessible, and visually appealing user interfaces. I'm constantly learning and exploring new
                technologies to stay at the cutting edge of web development.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-secondary/20 border border-border/40 hover:border-primary/40 transition-all duration-300 transform hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" /> Learning Philosophy
              </h3>
              <p className="text-muted-foreground">
                I believe in continuous learning and sharing knowledge with the community. I regularly contribute to
                open-source projects, write technical articles, and mentor junior developers. My approach to
                problem-solving is methodical, creative, and focused on delivering exceptional user experiences.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-secondary/20 border border-border/40 hover:border-primary/40 transition-all duration-300 transform hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" /> Achievements
              </h3>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg">
              When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new cooking
              recipes. I'm passionate about creating technology that makes a positive impact on people's lives.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <h4 className="font-bold text-2xl gradient-text">5+</h4>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <h4 className="font-bold text-2xl gradient-text">50+</h4>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <h4 className="font-bold text-2xl gradient-text">20+</h4>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <h4 className="font-bold text-2xl gradient-text">500+</h4>
                <p className="text-sm text-muted-foreground">GitHub Contributions</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button size="lg" className="rounded-full group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Download Resume
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button variant="outline" size="lg" className="rounded-full">
                <ExternalLink className="mr-2 h-4 w-4" /> View LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mt-24 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-10"
        }`}
      >
        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-8">
            <div className="relative border-l-2 border-primary/30 pl-8 ml-4">
              {workExperience.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  {/* Timeline dot */}
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[2.55rem] top-1.5"></div>

                  <div className="bg-secondary/20 rounded-lg p-6 border border-border/40 hover:border-primary/40 transition-colors">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-4">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-accent">{item.company}</p>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-8">
            <div className="relative border-l-2 border-primary/30 pl-8 ml-4">
              {education.map((item, index) => (
                <div key={index} className="mb-12 relative">
                  {/* Timeline dot */}
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[2.55rem] top-1.5"></div>

                  <div className="bg-secondary/20 rounded-lg p-6 border border-border/40 hover:border-primary/40 transition-colors">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary mb-4">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold">{item.degree}</h3>
                    <p className="text-accent">{item.institution}</p>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">Technical Skills</h3>

                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold">Soft Skills</h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Team Leadership",
                    "Problem Solving",
                    "Communication",
                    "Time Management",
                    "Adaptability",
                    "Creativity",
                    "Critical Thinking",
                    "Collaboration",
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 rounded-lg bg-secondary/20 border border-border/40"
                    >
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mt-8">Languages</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>English</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${i <= 5 ? "bg-primary" : "bg-secondary"}`}></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Spanish</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${i <= 3 ? "bg-primary" : "bg-secondary"}`}></div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>French</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-4 h-4 rounded-full ${i <= 2 ? "bg-primary" : "bg-secondary"}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

