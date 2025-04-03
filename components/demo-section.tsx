"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

  // 计算当前滚动位置对应的图片索引
  const currentIndex = useTransform(scrollYProgress, (value) => {
    // 将滚动进度转换为图片索引 (0 到 demoVideos.length-1)
    console.log(Math.floor(value * demoVideos.length));

    return Math.min(
      demoVideos.length - 1,
      Math.floor(value * demoVideos.length)
    );
  });

  console.log(currentIndex.get());

  // 计算吸附位置
  const snapPosition = useTransform(currentIndex, (index) => {
    // 计算每个图片对应的滚动位置百分比
    return `${-index * 25}%`;
  });

  // 使用spring添加平滑过渡效果
  const smoothX = useSpring(snapPosition, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div>
      <motion.section
        ref={targetRef}
        transition={{ duration: 0.8 }}
        className="relative h-[300vh] px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-blue-950/30"
      >
        <div className="w-[80vw] mx-auto h-[100vh] sticky top-0 py-20">
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

          <div className="flex items-center overflow-hidden">
            <motion.div style={{ x: smoothX }} className="flex">
              {demoVideos.map((demo, index) => {
                return (
                  <motion.div
                    key={index}
                    className="w-[80vw] relative perspective-1000"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      rotateY: 45,
                      y: 100,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      rotateY: 0,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.02,
                      rotateY: -5,
                      transition: { duration: 0.3 },
                    }}
                  >
                    <motion.img
                      src={demo}
                      alt=""
                      className="w-full h-[60vh] object-cover rounded-xl"
                      initial={{ filter: "brightness(0.5) blur(10px)" }}
                      whileInView={{
                        filter: "brightness(1) blur(0px)",
                      }}
                      transition={{
                        duration: 1,
                        delay: index * 0.2 + 0.3,
                      }}
                      style={{
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.6 }}
                    />

                    {/* 添加当前活跃图片指示器 */}
                    <motion.div
                      className="absolute bottom-4 left-1/2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0, x: "-50%" }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
                    >
                      <p className="text-white font-medium">
                        Demo {index + 1} / {demoVideos.length}
                      </p>
                    </motion.div>
                  </motion.div>
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
