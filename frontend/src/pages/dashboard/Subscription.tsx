import { motion } from "framer-motion";
import { Check, Zap, Rocket, Crown } from "lucide-react";
import { useSubscription } from "@/hooks/use-subscription";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic Analytics",
      "Content Calendar",
      "AI Captions (10/month)",
      "Community Access",
    ],
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for growing creators",
    features: [
      "Advanced Analytics",
      "Unlimited AI Captions",
      "Video Editor",
      "Priority Support",
      "Custom Branding",
    ],
    icon: Rocket,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For professional creators",
    features: [
      "Everything in Pro",
      "API Access",
      "Team Collaboration",
      "Custom Integrations",
      "Dedicated Support",
    ],
    icon: Crown,
    color: "from-orange-500 to-red-500",
  },
];

export function SubscriptionPage() {
  const { subscription, loading, subscribe, cancel } = useSubscription();

  const handleSubscribe = async (plan: string) => {
    try {
      const planKey = plan.toLowerCase() as "free" | "pro" | "enterprise";
      await subscribe(planKey);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  const handleCancel = async () => {
    try {
      await cancel();
    } catch (error) {
      console.error("Cancellation error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingSpinner size="lg" className="text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-white">Subscription Plans</h1>
        <p className="mt-2 text-gray-400">
          Choose the perfect plan for your content creation needs
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const isPlanActive = subscription?.plan === plan.name.toLowerCase();
          const Icon = plan.icon;

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card
                className={`relative overflow-hidden border-gray-800 bg-black/50 backdrop-blur-xl ${
                  isPlanActive ? "ring-2 ring-purple-500" : ""
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 transition-opacity group-hover:opacity-10`}
                />
                <CardHeader>
                  <div className="mb-4 inline-flex rounded-lg bg-gray-800/50 p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {plan.name}
                  </CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-gray-400">/month</span>
                  </div>
                  <CardDescription className="text-gray-400">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-8 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center text-white">
                        <Check className="mr-2 h-5 w-5 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isPlanActive ? (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancel}
                    >
                      Cancel Plan
                    </Button>
                  ) : (
                    <Button
                      className={`w-full bg-gradient-to-r ${plan.color} text-white`}
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {subscription ? "Switch Plan" : "Get Started"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}