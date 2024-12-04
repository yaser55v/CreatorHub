import { motion } from "framer-motion";
import { useState } from "react";
import {
  Rocket,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Youtube,
  Instagram,
  Music2,
  Mic,
  Loader2,
  Share2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { generateContentStrategy } from "@/services/aiService";

const platforms = [
  {
    value: "tiktok",
    label: "TikTok",
    icon: Music2,
    color: "from-[#ff0050] to-[#00f2ea]",
    activeColor: "border-[#00f2ea]",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: Instagram,
    color: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    activeColor: "border-[#FD1D1D]",
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: Youtube,
    color: "from-[#FF0000] to-[#282828]",
    activeColor: "border-[#FF0000]",
  },
  {
    value: "podcasts",
    label: "Podcasts",
    icon: Mic,
    color: "from-[#8940FA] to-[#6B48FF]",
    activeColor: "border-[#8940FA]",
  },
];

const goals = [
  {
    value: "increase_followers",
    label: "Increase Followers",
    icon: TrendingUp,
    description: "Grow your audience and reach more people",
  },
  {
    value: "boost_engagement",
    label: "Boost Engagement",
    icon: Sparkles,
    description: "Increase likes, comments, and shares",
  },
  {
    value: "monetize",
    label: "Monetize Content",
    icon: Target,
    description: "Turn your content into revenue",
  },
];

export function Launchpad() {
  const [form, setForm] = useState({
    platform: "tiktok",
    niche: "",
    goal: "increase_followers",
  });
  const [strategy, setStrategy] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);

  const handleSubmit = async () => {
    if (!form.niche.trim()) {
      alert("Please enter your content niche");
      return;
    }

    setIsLoading(true);
    try {
      const aiStrategy = await generateContentStrategy(form);
      setStrategy(aiStrategy);
      setIsStrategyModalOpen(true);
    } catch (error) {
      alert("Failed to generate strategy. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0A0118] via-[#1A0B2E] to-[#261445]">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white bg-[length:50px_50px] opacity-[0.02]" />
        <div className="absolute -left-1/4 top-0 h-96 w-96 animate-orbit bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 animate-orbit-reverse bg-gradient-to-r from-blue-500/20 to-teal-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-purple-400/30 bg-white/5 px-7 py-2 backdrop-blur transition-all hover:border-purple-400/50 hover:bg-white/10">
            <Rocket className="h-5 w-5 text-purple-400" />
            <p className="text-sm font-medium text-purple-300">
              AI-Powered Content Strategy
            </p>
          </div>

          <h1 className="animate-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Content Launchpad
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Get personalized content strategies powered by AI to skyrocket your
            social media presence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <Card className="border-gray-800/50 bg-black/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Create Your Strategy
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details below to generate your personalized content
                plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Platform Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-300">
                  Choose Your Platform
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.map((platform) => (
                    <motion.button
                      key={platform.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setForm({ ...form, platform: platform.value })
                      }
                      className={`relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-lg border-2 transition-all ${
                        form.platform === platform.value
                          ? `${platform.activeColor} bg-gradient-to-r ${platform.color}`
                          : "border-gray-800 bg-white/5 hover:border-gray-700"
                      }`}
                    >
                      <platform.icon
                        className={`h-5 w-5 ${
                          form.platform === platform.value
                            ? "text-white"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          form.platform === platform.value
                            ? "text-white"
                            : "text-gray-300"
                        }`}
                      >
                        {platform.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Niche Input */}
              <div className="space-y-3">
                <Label
                  htmlFor="niche"
                  className="text-sm font-medium text-gray-300"
                >
                  Your Content Niche
                </Label>
                <Input
                  id="niche"
                  placeholder="e.g., Travel, Gaming, Fashion"
                  value={form.niche}
                  onChange={(e) => setForm({ ...form, niche: e.target.value })}
                  className="border-gray-800 bg-white/5 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              {/* Goals Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-300">
                  Select Your Goal
                </Label>
                <div className="grid gap-4">
                  {goals.map((goal) => (
                    <motion.button
                      key={goal.value}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setForm({ ...form, goal: goal.value })}
                      className={`flex h-auto items-center justify-start gap-4 rounded-lg border-2 p-4 transition-all ${
                        form.goal === goal.value
                          ? "border-purple-500 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                          : "border-gray-800 bg-white/5 hover:border-gray-700"
                      }`}
                    >
                      <goal.icon
                        className={`h-5 w-5 ${
                          form.goal === goal.value
                            ? "text-purple-600"
                            : "text-gray-600"
                        }`}
                      />
                      <div className="text-left">
                        <div
                          className={`font-semibold ${
                            form.goal === goal.value
                              ? "text-purple-500"
                              : "text-gray-500"
                          }`}
                        >
                          {goal.label}
                        </div>
                        <div className="text-sm text-gray-500">
                          {goal.description}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-4 font-medium text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating Strategy...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Generate AI Strategy
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Strategy Dialog */}
      <Dialog open={isStrategyModalOpen} onOpenChange={setIsStrategyModalOpen}>
        <DialogContent className="max-w-2xl border-gray-800/50 bg-black/95 text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Your AI-Generated Content Strategy
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-invert max-h-[60vh] overflow-y-auto rounded-lg bg-white/5 p-6">
            <ReactMarkdown>{strategy}</ReactMarkdown>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setIsStrategyModalOpen(false)}
              variant="secondary"
              className="bg-white/10 text-gray-300 hover:bg-white/20"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(strategy);
                alert("Strategy copied to clipboard!");
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Strategy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
