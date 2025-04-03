"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Star = {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
}

export function ClickEffect() {
  const [stars, setStars] = useState<Star[]>([])
  const [nextId, setNextId] = useState(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newStars: Star[] = []
      const colors = ["#3B82F6", "#60A5FA", "#93C5FD", "#818CF8", "#A78BFA"]

      // Create 5-8 stars per click
      const starCount = 5 + Math.floor(Math.random() * 4)

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: nextId + i,
          x: e.clientX,
          y: e.clientY,
          size: 10 + Math.random() * 15,
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      setStars((prev) => [...prev, ...newStars])
      setNextId((prev) => prev + starCount)

      // Remove stars after animation
      setTimeout(() => {
        setStars((prev) => prev.filter((star) => !newStars.includes(star)))
      }, 1000)
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [nextId])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              opacity: 1,
              scale: 0,
              x: star.x - star.size / 2,
              y: star.y - star.size / 2,
              rotate: star.rotation,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              x: star.x - star.size / 2 + (Math.random() * 100 - 50),
              y: star.y - star.size / 2 + (Math.random() * 100 - 50),
              rotate: star.rotation + (Math.random() * 180 - 90),
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: star.size,
              height: star.size,
            }}
          >
            <svg
              width={star.size}
              height={star.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill={star.color}
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

