"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { ParticleText } from "./particle-text";
import { FloatingIcons } from "./floating-icons";
import BrainAnimation from "./brain-animation";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const headerY = useTransform(scrollY, [0, 300], [0, -100]);
  return (
    <div>
      <motion.section
        style={{ opacity: headerOpacity, y: headerY }}
        className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8"
      >
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-purple-700/30 to-blue-700/20 blur-3xl"></div>
          <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-l from-cyan-700/30 to-blue-700/20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-20"
          >
            <div className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              GhostDriver
            </div>

            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 mb-8">
              Let your Web operations fly automatically !
            </p>
            <div className="flex flex-wrap justify-center">
              <Button
                size="lg"
                onClick={() =>
                  window.open(
                    "https://github.com/tearline-xyz/GhostDriver",
                    "_blank"
                  )
                }
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 relative overflow-hidden group"
              >
                <span className="relative z-10">Install Now</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -inset-x-1 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
              </Button>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-950/30 relative overflow-hidden group"
              >
                <span className="relative z-10">Learn More</span>
                <span className="absolute -inset-x-1 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
              </Button> */}
            </div>
          </motion.div>

          {/* Floating star elements */}
          <div className="absolute top-10 left-10 animate-float z-0 opacity-60">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#starGradient1)"
                stroke="rgba(59, 130, 246, 0.5)"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient
                  id="starGradient1"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="21.02"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#3B82F6" />
                  <stop offset="1" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute top-3/4 right-20 animate-float-delay z-0 opacity-40">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#starGradient2)"
                stroke="rgba(139, 92, 246, 0.5)"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient
                  id="starGradient2"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="21.02"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#60A5FA" />
                  <stop offset="1" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float z-0 opacity-30">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="url(#starGradient3)"
                stroke="rgba(96, 165, 250, 0.5)"
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient
                  id="starGradient3"
                  x1="2"
                  y1="2"
                  x2="22"
                  y2="21.02"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#38BDF8" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Brain animation */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <BrainAnimation />
        </div>

        {/* Floating tech icons */}
        <FloatingIcons />
      </motion.section>
      {/* Additional star elements that won't block text */}
      <div className="fixed top-1/3 right-1/3 animate-float-delay z-0 opacity-20">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="url(#starGradient4)"
            stroke="rgba(96, 165, 250, 0.5)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id="starGradient4"
              x1="2"
              y1="2"
              x2="22"
              y2="21.02"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#38BDF8" />
              <stop offset="1" stopColor="#818CF8" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="fixed top-2/3 left-1/5 animate-float z-0 opacity-15">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="url(#starGradient5)"
            stroke="rgba(139, 92, 246, 0.5)"
            strokeWidth="0.5"
          />
          <defs>
            <linearGradient
              id="starGradient5"
              x1="2"
              y1="2"
              x2="22"
              y2="21.02"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
