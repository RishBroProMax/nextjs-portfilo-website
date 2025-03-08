"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CommandType = {
  command: string
  output: string | JSX.Element
}

type FileSystemItem = {
  name: string
  type: "file" | "directory"
  content?: string
  children?: Record<string, FileSystemItem>
}

export default function Terminal() {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<CommandType[]>([
    {
      command: "help",
      output: (
        <div>
          <p>Available commands:</p>
          <ul className="ml-4 mt-1">
            <li>
              <span className="text-primary">help</span> - Show available commands
            </li>
            <li>
              <span className="text-primary">about</span> - Learn about me
            </li>
            <li>
              <span className="text-primary">skills</span> - View my technical skills
            </li>
            <li>
              <span className="text-primary">projects</span> - List my projects
            </li>
            <li>
              <span className="text-primary">contact</span> - Get my contact information
            </li>
            <li>
              <span className="text-primary">clear</span> - Clear the terminal
            </li>
            <li>
              <span className="text-primary">ls</span> - List directory contents
            </li>
            <li>
              <span className="text-primary">cd</span> - Change directory
            </li>
            <li>
              <span className="text-primary">pwd</span> - Print working directory
            </li>
            <li>
              <span className="text-primary">cat</span> - Display file contents
            </li>
            <li>
              <span className="text-primary">date</span> - Display current date and time
            </li>
            <li>
              <span className="text-primary">whoami</span> - Display current user
            </li>
            <li>
              <span className="text-primary">echo</span> - Display a message
            </li>
            <li>
              <span className="text-primary">uname</span> - Display system information
            </li>
            <li>
              <span className="text-primary">neofetch</span> - Display system info with logo
            </li>
          </ul>
        </div>
      ),
    },
  ])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentDirectory, setCurrentDirectory] = useState<string[]>([])

  // File system simulation
  const fileSystem: Record<string, FileSystemItem> = {
    "about.txt": {
      name: "about.txt",
      type: "file",
      content:
        "Hi, I'm Rishmika Sandanu!\nI'm a passionate full-stack developer with 5+ years of experience.\nI specialize in React, Next.js, TypeScript, and Node.js.\nWhen not coding, I enjoy hiking, reading sci-fi, and cooking.",
    },
    "skills.txt": {
      name: "skills.txt",
      type: "file",
      content:
        "Technical Skills:\n- Frontend: React, Next.js, TypeScript, Tailwind CSS\n- Backend: Node.js, Express, NestJS, GraphQL\n- Database: MongoDB, PostgreSQL, Redis\n- DevOps: Docker, AWS, Vercel, CI/CD",
    },
    "contact.txt": {
      name: "contact.txt",
      type: "file",
      content:
        "Email: rishmika@example.com\nGitHub: github.com/rishmika\nLinkedIn: linkedin.com/in/rishmika\nTwitter: @rishmika\n\nFeel free to reach out for collaborations or opportunities!",
    },
    projects: {
      name: "projects",
      type: "directory",
      children: {
        "ecommerce.txt": {
          name: "ecommerce.txt",
          type: "file",
          content:
            "E-Commerce Platform\n\nA full-featured online store with cart, checkout, and payment integration.\n\nTechnologies: Next.js, TypeScript, Tailwind CSS, Stripe\nURL: https://project1.example.com",
        },
        "taskmanager.txt": {
          name: "taskmanager.txt",
          type: "file",
          content:
            "Task Management App\n\nA Kanban-style task manager with drag-and-drop functionality and real-time updates.\n\nTechnologies: React, Firebase, Styled Components\nURL: https://project2.example.com",
        },
        "portfolio.txt": {
          name: "portfolio.txt",
          type: "file",
          content:
            "Portfolio Website\n\nA modern, responsive portfolio website with dark mode and animations.\n\nTechnologies: Next.js, Framer Motion, Tailwind CSS\nURL: https://project3.example.com",
        },
      },
    },
    resume: {
      name: "resume",
      type: "directory",
      children: {
        "education.txt": {
          name: "education.txt",
          type: "file",
          content:
            "Education:\n\n2013-2017: Bachelor of Science in Computer Science, University of Technology\n2020: Advanced React & GraphQL, Online Certification\n2022: AWS Certified Developer, Amazon Web Services",
        },
        "experience.txt": {
          name: "experience.txt",
          type: "file",
          content:
            "Work Experience:\n\n2021-Present: Senior Frontend Developer, Tech Innovators Inc.\n2019-2021: Full-Stack Developer, Digital Solutions LLC\n2017-2019: Web Developer, Creative Agency",
        },
      },
    },
  }

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  useEffect(() => {
    // Focus input when terminal is clicked
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [])

  // Get current directory contents
  const getCurrentDirectoryContents = () => {
    let current: Record<string, FileSystemItem> | undefined = fileSystem

    for (const dir of currentDirectory) {
      const item = current[dir]
      if (item && item.type === "directory") {
        current = item.children
      } else {
        return null
      }
    }

    return current
  }

  // Get file or directory from path
  const getItemFromPath = (
    path: string,
  ): { item: FileSystemItem | null; parentDir: Record<string, FileSystemItem> | null } => {
    // Handle absolute paths
    const pathParts = path.startsWith("/")
      ? path.slice(1).split("/").filter(Boolean)
      : [...currentDirectory, ...path.split("/").filter(Boolean)]

    // Handle '..' in path
    const normalizedPath: string[] = []
    for (const part of pathParts) {
      if (part === "..") {
        normalizedPath.pop()
      } else if (part !== ".") {
        normalizedPath.push(part)
      }
    }

    let current: Record<string, FileSystemItem> | undefined = fileSystem
    let parent: Record<string, FileSystemItem> | null = null

    // Navigate to the parent directory of the target
    for (let i = 0; i < normalizedPath.length - 1; i++) {
      const dir = normalizedPath[i]
      const item = current[dir]

      if (!item || item.type !== "directory") {
        return { item: null, parentDir: null }
      }

      parent = current
      current = item.children

      if (!current) {
        return { item: null, parentDir: null }
      }
    }

    // Get the target item
    const targetName = normalizedPath[normalizedPath.length - 1]
    if (!targetName) {
      return { item: null, parentDir: current }
    }

    const item = current[targetName] || null
    return { item, parentDir: current }
  }

  const formatPath = (path: string[]): string => {
    return path.length === 0 ? "/" : "/" + path.join("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const command = input.trim()
    setCommandHistory((prev) => [command, ...prev])
    setHistoryIndex(-1)

    let output: string | JSX.Element = "Command not found. Type 'help' for available commands."
    const args = command.split(" ")
    const cmd = args[0].toLowerCase()

    switch (cmd) {
      case "help":
        output = (
          <div>
            <p>Available commands:</p>
            <ul className="ml-4 mt-1">
              <li>
                <span className="text-primary">help</span> - Show available commands
              </li>
              <li>
                <span className="text-primary">about</span> - Learn about me
              </li>
              <li>
                <span className="text-primary">skills</span> - View my technical skills
              </li>
              <li>
                <span className="text-primary">projects</span> - List my projects
              </li>
              <li>
                <span className="text-primary">contact</span> - Get my contact information
              </li>
              <li>
                <span className="text-primary">clear</span> - Clear the terminal
              </li>
              <li>
                <span className="text-primary">ls</span> - List directory contents
              </li>
              <li>
                <span className="text-primary">cd</span> - Change directory
              </li>
              <li>
                <span className="text-primary">pwd</span> - Print working directory
              </li>
              <li>
                <span className="text-primary">cat</span> - Display file contents
              </li>
              <li>
                <span className="text-primary">date</span> - Display current date and time
              </li>
              <li>
                <span className="text-primary">whoami</span> - Display current user
              </li>
              <li>
                <span className="text-primary">echo</span> - Display a message
              </li>
              <li>
                <span className="text-primary">uname</span> - Display system information
              </li>
              <li>
                <span className="text-primary">neofetch</span> - Display system info with logo
              </li>
            </ul>
          </div>
        )
        break
      case "about":
        output = (
          <div>
            <p>Hi, I'm Rishmika Sandanu!</p>
            <p className="mt-1">I'm a passionate full-stack developer with 5+ years of experience.</p>
            <p className="mt-1">I specialize in React, Next.js, TypeScript, and Node.js.</p>
            <p className="mt-1">When not coding, I enjoy hiking, reading sci-fi, and cooking.</p>
            <p className="mt-2 text-muted-foreground">
              Tip: Try <span className="text-primary">cat about.txt</span> for the same information.
            </p>
          </div>
        )
        break
      case "skills":
        output = (
          <div>
            <p className="font-bold">Technical Skills:</p>
            <p className="mt-1">
              <span className="text-primary">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS
            </p>
            <p>
              <span className="text-primary">Backend:</span> Node.js, Express, NestJS, GraphQL
            </p>
            <p>
              <span className="text-primary">Database:</span> MongoDB, PostgreSQL, Redis
            </p>
            <p>
              <span className="text-primary">DevOps:</span> Docker, AWS, Vercel, CI/CD
            </p>
            <p className="mt-2 text-muted-foreground">
              Tip: Try <span className="text-primary">cat skills.txt</span> for the same information.
            </p>
          </div>
        )
        break
      case "projects":
        output = (
          <div>
            <p className="font-bold">Recent Projects:</p>
            <ul className="ml-4 mt-1">
              <li>
                <span className="text-primary">E-Commerce Platform</span> - Next.js, TypeScript, Stripe
              </li>
              <li>
                <span className="text-primary">Task Management App</span> - React, Firebase, Styled Components
              </li>
              <li>
                <span className="text-primary">Portfolio Website</span> - Next.js, Framer Motion, Tailwind CSS
              </li>
              <li>
                <span className="text-primary">Weather Dashboard</span> - React, OpenWeather API, Mapbox
              </li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              Tip: Try <span className="text-primary">cd projects</span> and then{" "}
              <span className="text-primary">ls</span> to explore project files.
            </p>
          </div>
        )
        break
      case "contact":
        output = (
          <div>
            <p>
              <span className="text-primary">Email:</span> rishmika@example.com
            </p>
            <p>
              <span className="text-primary">GitHub:</span>{" "}
              <a href="https://github.com/rishmika" className="text-accent underline">
                github.com/rishmika
              </a>
            </p>
            <p>
              <span className="text-primary">LinkedIn:</span>{" "}
              <a href="https://linkedin.com/in/rishmika" className="text-accent underline">
                linkedin.com/in/rishmika
              </a>
            </p>
            <p>
              <span className="text-primary">Twitter:</span>{" "}
              <a href="https://twitter.com/rishmika" className="text-accent underline">
                @rishmika
              </a>
            </p>
            <p className="mt-1">Feel free to reach out for collaborations or opportunities!</p>
            <p className="mt-2 text-muted-foreground">
              Tip: Try <span className="text-primary">cat contact.txt</span> for the same information.
            </p>
          </div>
        )
        break
      case "clear":
        setHistory([])
        setInput("")
        return
      case "ls":
        const targetPath = args[1] || ""
        let dirContents: Record<string, FileSystemItem> | null

        if (targetPath) {
          const { item, parentDir } = getItemFromPath(targetPath)
          if (!item) {
            output = `ls: cannot access '${targetPath}': No such file or directory`
            break
          }
          if (item.type !== "directory") {
            output = `ls: cannot access '${targetPath}': Not a directory`
            break
          }
          dirContents = item.children || {}
        } else {
          dirContents = getCurrentDirectoryContents()
        }

        if (!dirContents) {
          output = "ls: cannot access directory"
          break
        }

        output = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(dirContents).map((item, index) => (
              <div key={index} className="flex items-center">
                <span className={item.type === "directory" ? "text-accent font-bold" : "text-muted-foreground"}>
                  {item.name}
                  {item.type === "directory" ? "/" : ""}
                </span>
              </div>
            ))}
          </div>
        )
        break
      case "cd":
        const dirPath = args[1] || ""

        if (!dirPath || dirPath === "~" || dirPath === "/") {
          setCurrentDirectory([])
          output = ""
          break
        }

        if (dirPath === "..") {
          if (currentDirectory.length > 0) {
            setCurrentDirectory((prev) => prev.slice(0, -1))
            output = ""
          } else {
            output = ""
          }
          break
        }

        const { item } = getItemFromPath(dirPath)

        if (!item) {
          output = `cd: ${dirPath}: No such file or directory`
          break
        }

        if (item.type !== "directory") {
          output = `cd: ${dirPath}: Not a directory`
          break
        }

        // Handle absolute paths
        if (dirPath.startsWith("/")) {
          const parts = dirPath.slice(1).split("/").filter(Boolean)
          setCurrentDirectory(parts)
        } else {
          // Handle relative paths
          const parts = dirPath.split("/").filter(Boolean)
          const newPath = [...currentDirectory]

          for (const part of parts) {
            if (part === "..") {
              if (newPath.length > 0) {
                newPath.pop()
              }
            } else if (part !== ".") {
              newPath.push(part)
            }
          }

          setCurrentDirectory(newPath)
        }

        output = ""
        break
      case "pwd":
        output = formatPath(currentDirectory)
        break
      case "cat":
        if (!args[1]) {
          output = "cat: missing file operand"
          break
        }

        const { item: fileItem } = getItemFromPath(args[1])

        if (!fileItem) {
          output = `cat: ${args[1]}: No such file or directory`
          break
        }

        if (fileItem.type !== "file") {
          output = `cat: ${args[1]}: Is a directory`
          break
        }

        output = <div className="whitespace-pre-wrap font-mono text-xs">{fileItem.content}</div>
        break
      case "date":
        output = new Date().toString()
        break
      case "whoami":
        output = "rishmika"
        break
      case "echo":
        output = args.slice(1).join(" ")
        break
      case "uname":
        output = "Portfolio OS v1.0.0"
        break
      case "neofetch":
        output = (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="text-primary font-mono whitespace-pre">
              {`
   _____         __  __ 
  / ____|       / _|/ _|
 | (___   ___ | |_| |_ 
  \\___ \\ / _ \\|  _|  _|
  ____) | (_) | | | |  
 |_____/ \\___/|_| |_|  
                       
                       `}
            </div>
            <div>
              <p>
                <span className="text-primary font-bold">OS:</span> Portfolio OS v1.0.0
              </p>
              <p>
                <span className="text-primary font-bold">Host:</span> Vercel Cloud
              </p>
              <p>
                <span className="text-primary font-bold">Kernel:</span> Next.js 14.0.0
              </p>
              <p>
                <span className="text-primary font-bold">Uptime:</span> {Math.floor(Math.random() * 100)} days
              </p>
              <p>
                <span className="text-primary font-bold">Packages:</span> npm ({Math.floor(Math.random() * 1000)})
              </p>
              <p>
                <span className="text-primary font-bold">Shell:</span> portfolio-sh v1.0.0
              </p>
              <p>
                <span className="text-primary font-bold">Resolution:</span> Responsive x Adaptive
              </p>
              <p>
                <span className="text-primary font-bold">DE:</span> React 18
              </p>
              <p>
                <span className="text-primary font-bold">WM:</span> Tailwind CSS
              </p>
              <p>
                <span className="text-primary font-bold">Terminal:</span> portfolio-term
              </p>
              <p>
                <span className="text-primary font-bold">CPU:</span> TypeScript @ 5.0GHz
              </p>
              <p>
                <span className="text-primary font-bold">Memory:</span> {Math.floor(Math.random() * 16)}GB / 16GB
              </p>
            </div>
          </div>
        )
        break
      default:
        if (cmd.startsWith("./")) {
          output = `bash: ${cmd}: Permission denied`
        } else if (cmd.includes("/")) {
          output = `bash: ${cmd}: No such file or directory`
        }
    }

    setHistory((prev) => [...prev, { command, output }])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()

      // Basic command completion
      const commands = [
        "help",
        "about",
        "skills",
        "projects",
        "contact",
        "clear",
        "ls",
        "cd",
        "pwd",
        "cat",
        "date",
        "whoami",
        "echo",
        "uname",
        "neofetch",
      ]

      // If input is empty or just a command, complete the command
      if (!input.includes(" ")) {
        const matchingCommands = commands.filter((cmd) => cmd.startsWith(input.toLowerCase()))
        if (matchingCommands.length === 1) {
          setInput(matchingCommands[0])
        }
        return
      }

      // If input has a command and arguments, try to complete the path
      const parts = input.split(" ")
      const cmd = parts[0].toLowerCase()
      const currentArg = parts[parts.length - 1]

      if (["cd", "ls", "cat"].includes(cmd) && currentArg) {
        // Get the directory part of the path
        const lastSlashIndex = currentArg.lastIndexOf("/")
        const dirPath = lastSlashIndex >= 0 ? currentArg.substring(0, lastSlashIndex) : ""
        const prefix = lastSlashIndex >= 0 ? currentArg.substring(lastSlashIndex + 1) : currentArg

        // Get the directory contents
        let dirContents: Record<string, FileSystemItem> | null

        if (dirPath) {
          const { item } = getItemFromPath(dirPath)
          if (item && item.type === "directory") {
            dirContents = item.children || {}
          } else {
            return
          }
        } else {
          dirContents = getCurrentDirectoryContents()
        }

        if (!dirContents) return

        // Find matching items
        const matchingItems = Object.values(dirContents)
          .filter((item) => item.name.startsWith(prefix))
          .map((item) => item.name + (item.type === "directory" ? "/" : ""))

        if (matchingItems.length === 1) {
          const newPath = dirPath ? `${dirPath}/${matchingItems[0]}` : matchingItems[0]

          setInput(`${cmd} ${newPath}`)
        }
      }
    }
  }

  return (
    <div className="relative rounded-lg border border-border/40 bg-black/90 text-white font-mono text-sm overflow-hidden">
      <div className="flex items-center px-4 py-2 bg-secondary/20 border-b border-border/40">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="mx-auto text-xs text-muted-foreground">rishmika@portfolio:{formatPath(currentDirectory)} ~</div>
      </div>

      <div
        ref={terminalRef}
        className="p-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
      >
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center">
              <span className="text-accent">rishmika@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-primary">{formatPath(currentDirectory)}</span>
              <span className="text-muted-foreground">$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            <div className={cn("ml-2 mt-1", typeof item.output === "string" ? "" : "space-y-1")}>{item.output}</div>
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <div className="flex items-center">
            <span className="text-accent">rishmika@portfolio</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary">{formatPath(currentDirectory)}</span>
            <span className="text-muted-foreground">$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 ml-2 bg-transparent outline-none border-none"
            autoFocus
          />
        </form>
      </div>

      <div className="px-4 py-2 bg-secondary/20 border-t border-border/40 text-xs text-muted-foreground">
        <span>
          Type <span className="text-primary">'help'</span> for available commands
        </span>
        <div className="flex flex-wrap gap-2 mt-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => {
              setInput("help")
              if (inputRef.current) inputRef.current.focus()
            }}
          >
            help
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => {
              setInput("ls")
              if (inputRef.current) inputRef.current.focus()
            }}
          >
            ls
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => {
              setInput("pwd")
              if (inputRef.current) inputRef.current.focus()
            }}
          >
            pwd
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => {
              setInput("neofetch")
              if (inputRef.current) inputRef.current.focus()
            }}
          >
            neofetch
          </Button>
        </div>
      </div>
    </div>
  )
}

