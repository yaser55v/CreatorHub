import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GradientButton } from "@/components/ui/gradient-button";
import { ArrowRight, Sparkles, Wand2, Brain, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaBullseye,
  FaChartLine,
  FaGoogle,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaAmazon,
  FaMicrosoft,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const featureCards = [
  {
    title: "Instant Content Ideas",
    description: "AI-powered suggestions for trending content",
    gradient: "from-purple-500 to-pink-500",
    icon: Brain,
  },
  {
    title: "Growth Analytics",
    description: "Track your performance across platforms",
    gradient: "from-blue-500 to-cyan-500",
    icon: Zap,
  },
  {
    title: "Smart Captions",
    description: "Generate engaging captions with AI",
    gradient: "from-pink-500 to-orange-500",
    icon: Wand2,
  },
];

const floatingWords = [
  { text: "Trending", icon: <FaRocket className="text-blue-500/10" /> },
  { text: "Viral", icon: <FaBullseye className="text-green-500/10" /> },
  { text: "Growth", icon: <FaChartLine className="text-purple-500/10" /> },
  { text: "Google ADs", icon: <FaGoogle className="text-red-500/10" /> },
  { text: "TikTok", icon: <FaTiktok className="text-black/60" /> },
  { text: "YouTube", icon: <FaYoutube className="text-red-600/10" /> },
  { text: "Analytics", icon: <FaChartLine className="text-indigo-500/10" /> },
  { text: "AI", icon: <FaRocket className="text-cyan-500/10" /> },
  { text: "Content", icon: <FaBullseye className="text-orange-500/10" /> },
  { text: "Facebook", icon: <FaFacebook className="text-blue-600/10" /> },
  { text: "Instagram", icon: <FaInstagram className="text-pink-500/10" /> },
  { text: "Create", icon: <FaRocket className="text-teal-500/10" /> },
  { text: "Engage", icon: <FaBullseye className="text-lime-500/10" /> },
  { text: "Social", icon: <FaChartLine className="text-sky-500/10" /> },
  { text: "Strategy", icon: <FaBullseye className="text-emerald-500/10" /> },
  { text: "Success", icon: <FaRocket className="text-yellow-500/10" /> },
  { text: "Reach", icon: <FaChartLine className="text-rose-500/10" /> },
  { text: "X", icon: <FaXTwitter className="text-black/10" /> },
  { text: "Amazon", icon: <FaAmazon className="text-orange-600/10" /> },
  { text: "Microsoft", icon: <FaMicrosoft className="text-blue-700/10" /> }
];

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-purple-950/50 to-black"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingWords.map((word, index) => (
          <motion.div
            key={`${word.text}-${index}`}
            className="absolute flex items-center text-purple-500/10 font-bold text-2xl whitespace-nowrap"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            {word.icon}
            <span className="ml-2">{word.text}</span>
          </motion.div>
        ))}
      </div>

      {/* Neural Network Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
        <motion.div
          style={{ scale, opacity }}
          className="relative pt-20 text-center"
        >
          {/* Hero Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block"
          >
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative z-10"
            >
              <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                  {t("hero.title")}
                </span>
                <span className="relative mt-2 block">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {t("hero.subtitle")}
                  </span>
                  <motion.span
                    className="absolute -inset-2 -z-10 block rounded-lg bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-blue-600/50 blur-2xl"
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </span>
              </h1>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-purple-100/80"
          >
            {t("hero.description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex items-center justify-center gap-4"
          >
            <GradientButton
              className="group relative overflow-hidden"
              onClick={() => navigate("/launchpad")}
            >
              <span className="relative z-10 flex items-center">
                {t("hero.startCreating")}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </GradientButton>
            <button className="group flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-white/10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.div>
              {t("hero.seeAiAction")}
            </button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-32 grid gap-8 pb-20 md:grid-cols-3"
          >
            {featureCards.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.2 + index * 0.2,
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-sm"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredCard === index ? 0.2 : 0.1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 inline-block rounded-lg bg-white/10 p-3"
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-16 w-[2px] rounded-full bg-gradient-to-b from-purple-500 to-transparent" />
              <span className="text-sm text-purple-300">Scroll to explore</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
