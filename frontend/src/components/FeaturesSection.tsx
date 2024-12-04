import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  MessageSquareText,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Smart Analytics",
    description:
      "Track your growth with detailed insights and performance metrics.",
    icon: BarChart3,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Content Calendar",
    description:
      "Plan and schedule your content across all platforms effortlessly.",
    icon: Calendar,
    gradient: "from-pink-500 to-purple-500",
  },
  {
    title: "AI Captions",
    description:
      "Generate engaging captions and hashtags powered by AI technology.",
    icon: MessageSquareText,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Trend Analysis",
    description: "Stay ahead with real-time trending topics and content ideas.",
    icon: TrendingUp,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    title: "Video Editor",
    description: "Edit and enhance your videos with professional tools.",
    icon: Video,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "AI Enhancement",
    description: "Enhance your content quality with AI-powered suggestions.",
    icon: Sparkles,
    gradient: "from-yellow-500 to-orange-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            Everything You Need to Create
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
          >
            Powerful tools to help you create, manage, and grow your content
            across all platforms.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-gray-800 bg-black/50 transition-colors hover:border-gray-700">
                <CardHeader>
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient}`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}