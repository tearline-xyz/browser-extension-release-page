"use client"

import { useEffect, useRef } from "react"

export default function BrainAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Brain nodes
    const nodes: {
      x: number
      y: number
      radius: number
      connections: number[]
      pulseTime: number
      pulseState: number
      color: string
    }[] = []

    // Create brain structure
    const createBrain = () => {
      nodes.length = 0
      const nodeCount = Math.min(Math.floor(canvas.width / 40), 30)

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const x = canvas.width * 0.2 + Math.random() * canvas.width * 0.6
        const y = canvas.height * 0.2 + Math.random() * canvas.height * 0.6
        const radius = 2 + Math.random() * 3
        const pulseTime = 2000 + Math.random() * 5000
        const pulseState = Math.random()

        nodes.push({
          x,
          y,
          radius,
          connections: [],
          pulseTime,
          pulseState,
          color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, 0.8)`,
        })
      }

      // Create connections
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const connectionCount = 2 + Math.floor(Math.random() * 3)

        // Find closest nodes
        const distances: { index: number; distance: number }[] = []

        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue

          const otherNode = nodes[j]
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          distances.push({ index: j, distance })
        }

        // Sort by distance
        distances.sort((a, b) => a.distance - b.distance)

        // Add connections to closest nodes
        for (let j = 0; j < Math.min(connectionCount, distances.length); j++) {
          node.connections.push(distances[j].index)
        }
      }
    }

    createBrain()

    // Animation
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update pulse states
      nodes.forEach((node) => {
        node.pulseState += deltaTime / node.pulseTime
        if (node.pulseState > 1) {
          node.pulseState = 0
        }
      })

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const otherNode = nodes[connectionIndex]

          // Calculate pulse position
          const pulsePosition = node.pulseState
          const pulseRadius = 2

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = "rgba(100, 150, 255, 0.2)"
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw pulse traveling along the connection
          if (pulsePosition < 1) {
            const pulseX = node.x + (otherNode.x - node.x) * pulsePosition
            const pulseY = node.y + (otherNode.y - node.y) * pulsePosition

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, pulseRadius, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(150, 200, 255, 0.8)"
            ctx.fill()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = node.color
        ctx.fill()

        // Draw glow
        const glowSize = 10 + Math.sin(time / 1000 + node.x) * 5
        const gradient = ctx.createRadialGradient(node.x, node.y, node.radius, node.x, node.y, node.radius + glowSize)
        gradient.addColorStop(0, "rgba(100, 150, 255, 0.4)")
        gradient.addColorStop(1, "rgba(100, 150, 255, 0)")

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + glowSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-64 opacity-40" />
}

