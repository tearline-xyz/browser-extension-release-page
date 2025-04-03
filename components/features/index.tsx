import React from "react";
import { motion } from "framer-motion";
import CircuitAnimation from "@/components/features/circuit-animation";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Lock, Sparkles, Zap } from "lucide-react";

const FeatureSection = () => {
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Ready to Use",
      description:
        "No code to write, no configuration to change. Experience intelligent browser control instantly.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "No API Keys Required",
      description:
        "No need to manage complex LLM API keys. All you need is a Tearline account.",
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Data Privacy Guaranteed",
      description:
        "Your data is under your control. All operations happen locally, ensuring privacy and security.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Unlimited Possibilities",
      description:
        "The possibilities are endless. The only limit is your imagination.",
    },
  ];
  return (
    <div>
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="absolute inset-0 z-0">
          <CircuitAnimation />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={
                featuresInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Key Highlights
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={
                featuresInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Our plugin provides an unprecedented browser control experience
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="bg-blue-950/20 border-blue-500/20 backdrop-blur-sm hover:bg-blue-900/30 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>

                    {/* Animated corner accent */}
                    <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-500 to-transparent opacity-20"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-blue-400"></div>
                      <div className="absolute bottom-0 right-0 h-6 w-[1px] bg-blue-400"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default FeatureSection;
