"use client"

import { motion } from "framer-motion"
import { Braces, Cpu, Globe, MousePointer, Code, Zap } from "lucide-react"

export function FloatingIcons() {
  const icons = [
    { Icon: Braces, delay: 0, x: "10%", y: "20%" },
    { Icon: Cpu, delay: 0.1, x: "80%", y: "15%" },
    { Icon: Globe, delay: 0.2, x: "25%", y: "75%" },
    { Icon: MousePointer, delay: 0.3, x: "70%", y: "70%" },
    { Icon: Code, delay: 0.4, x: "40%", y: "30%" },
    { Icon: Zap, delay: 0.5, x: "60%", y: "60%" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            x: item.x,
            y: item.y,
          }}
          transition={{
            delay: item.delay,
            duration: 0.5,
            opacity: { duration: 1 },
          }}
          className="absolute"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5 + index,
              ease: "easeInOut",
            }}
            className="bg-blue-900/20 backdrop-blur-sm p-3 rounded-lg border border-blue-500/20"
          >
            <item.Icon className="w-8 h-8 text-blue-400" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

