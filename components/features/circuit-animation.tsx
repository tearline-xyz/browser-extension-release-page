"use client"

import { useEffect, useRef } from "react"

export default function CircuitAnimation() {
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

    // Circuit paths
    const paths: {
      points: { x: number; y: number }[]
      pulsePosition: number
      pulseSpeed: number
      width: number
      color: string
    }[] = []

    // Create circuit paths
    const createCircuits = () => {
      paths.length = 0
      const pathCount = Math.min(Math.floor(canvas.width / 100), 15)

      for (let i = 0; i < pathCount; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height

        const points = [{ x: startX, y: startY }]
        const segmentCount = 3 + Math.floor(Math.random() * 5)

        for (let j = 0; j < segmentCount; j++) {
          const lastPoint = points[points.length - 1]
          const direction = Math.floor(Math.random() * 4) // 0: right, 1: down, 2: left, 3: up
          const length = 50 + Math.random() * 150

          let newX = lastPoint.x
          let newY = lastPoint.y

          switch (direction) {
            case 0:
              newX += length
              break
            case 1:
              newY += length
              break
            case 2:
              newX -= length
              break
            case 3:
              newY -= length
              break
          }

          // Keep within bounds
          newX = Math.max(0, Math.min(canvas.width, newX))
          newY = Math.max(0, Math.min(canvas.height, newY))

          points.push({ x: newX, y: newY })
        }

        paths.push({
          points,
          pulsePosition: Math.random(),
          pulseSpeed: 0.0002 + Math.random() * 0.0005,
          width: 1 + Math.random() * 2,
          color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, 255, ${0.1 + Math.random() * 0.2})`,
        })
      }
    }

    createCircuits()

    // Animation
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw paths
      paths.forEach((path) => {
        // Update pulse position
        path.pulsePosition += path.pulseSpeed * deltaTime
        if (path.pulsePosition > 1) {
          path.pulsePosition = 0
        }

        // Draw path
        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)

        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y)
        }

        ctx.strokeStyle = path.color
        ctx.lineWidth = path.width
        ctx.stroke()

        // Calculate total path length
        let totalLength = 0
        for (let i = 1; i < path.points.length; i++) {
          const dx = path.points[i].x - path.points[i - 1].x
          const dy = path.points[i].y - path.points[i - 1].y
          totalLength += Math.sqrt(dx * dx + dy * dy)
        }

        // Draw pulse
        let currentLength = 0
        const pulseLength = totalLength * path.pulsePosition

        for (let i = 1; i < path.points.length; i++) {
          const p1 = path.points[i - 1]
          const p2 = path.points[i]

          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const segmentLength = Math.sqrt(dx * dx + dy * dy)

          if (currentLength + segmentLength >= pulseLength && currentLength <= pulseLength) {
            // Pulse is on this segment
            const segmentPosition = (pulseLength - currentLength) / segmentLength
            const pulseX = p1.x + dx * segmentPosition
            const pulseY = p1.y + dy * segmentPosition

            // Draw pulse glow
            const gradient = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 10)
            gradient.addColorStop(0, "rgba(150, 200, 255, 0.8)")
            gradient.addColorStop(1, "rgba(150, 200, 255, 0)")

            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 10, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Draw pulse point
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2)
            ctx.fillStyle = "rgba(200, 230, 255, 0.9)"
            ctx.fill()

            break
          }

          currentLength += segmentLength
        }

        // Draw nodes at corners
        path.points.forEach((point) => {
          ctx.beginPath()
          ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(100, 150, 255, 0.5)"
          ctx.fill()
        })
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full opacity-20" />
}

