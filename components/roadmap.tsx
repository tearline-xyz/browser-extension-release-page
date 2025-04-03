"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/card";

const Roadmap = () => {
  const [roadmapRef, roadmapInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const roadmapItems = [
    "Multi-browser support extension",
    "More custom operation commands",
    "Workflow automation features",
    "Integration with other AI tools",
    "Enterprise-level security features",
  ];
  return (
    <div>
      <motion.section
        ref={roadmapRef}
        initial={{ opacity: 0 }}
        animate={roadmapInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-950/30 to-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={
                roadmapInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Future Roadmap
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={
                roadmapInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              We are continuously improving our product. Here are the features
              we're planning to launch
            </motion.p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <motion.div
              initial={{ height: 0 }}
              animate={roadmapInView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 transform -translate-x-1/2 "
            ></motion.div>

            <div className="space-y-16">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={
                    roadmapInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }
                  }
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className={`relative flex ${
                    index % 2 === 0
                      ? "justify-end md:justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <Card className="bg-blue-950/20 border-blue-500/20 backdrop-blur-sm overflow-hidden hover:bg-blue-900/30 transition-colors duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold">{item}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Circle on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ x: "-50%" }}
                    animate={roadmapInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 top-6 w-4 h-4 rounded-full bg-blue-500 hidden sm:block"
                  ></motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Roadmap;
