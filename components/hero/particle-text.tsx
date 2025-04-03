"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ParticleTextProps {
  text: string
  className?: string
}

export function ParticleText({ text, className }: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer ${className || ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}

      {/* Particle effect on hover */}
      <AnimatedParticles active={isHovering} />
    </motion.div>
  )
}

function AnimatedParticles({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      size: number
      color: string
      opacity: number
      speed: number
    }>
  >([])

  useEffect(() => {
    if (!active) return

    // Create particles
    const newParticles = []
    const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#818CF8", "#A78BFA"]

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: 50 + Math.random() * 0,
        y: 50 + Math.random() * 0,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.3 + Math.random() * 0.7,
        speed: 0.5 + Math.random() * 1.5,
      })
    }

    setParticles(newParticles)

    // Cleanup
    return () => {
      setParticles([])
    }
  }, [active])

  if (!active || particles.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 100 - 50)}%`],
            y: [`${particle.y}%`, `${particle.y + (Math.random() * 100 - 50)}%`],
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 1.5 * particle.speed,
            ease: "easeOut",
            times: [0, 0.2, 1],
          }}
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  )
}

