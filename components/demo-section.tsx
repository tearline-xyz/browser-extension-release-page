import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

const DemoSection = () => {
  const demoVideos = [
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
    "/placeholder.svg?height=720&width=1280",
  ];
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <div>
      <motion.section
        ref={targetRef}
        transition={{ duration: 0.8 }}
        className="relative h-[300vh] px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-blue-950/30"
      >
        <div className="max-w-7xl mx-auto h-[100vh] sticky top-0 py-20">
          <div className="text-center mb-16">
            <motion.h2
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Use Case Demonstrations
            </motion.h2>
            <motion.p
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              See how our plugin completes complex browser tasks through simple
              prompts
            </motion.p>
          </div>

          <div className=" flex items-center ">
            <motion.div style={{ x }} className="flex gap-4">
              {demoVideos.map((demo, index) => {
                return (
                  <div key={index} className="w-[80vw] relative">
                    <img
                      src={demo}
                      alt=""
                      className="w-full h-[60vh] object-cover"
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default DemoSection;
