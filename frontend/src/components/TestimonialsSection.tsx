import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahcreates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    content:
      "This platform has completely transformed how I create and manage my content. The AI features are game-changing!",
    platform: "TikTok",
    followers: "2.5M",
  },
  {
    name: "Alex Rivera",
    handle: "@alexcreative",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    content:
      "The analytics tools helped me understand my audience better and grow my channel significantly.",
    platform: "YouTube",
    followers: "850K",
  },
  {
    name: "Emma Watson",
    handle: "@emmastyle",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    content:
      "I love how easy it is to plan and schedule content across all my social platforms. Highly recommended!",
    platform: "Instagram",
    followers: "1.2M",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Loved by Creators
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Join thousands of content creators who are already using our platform
            to grow their online presence.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.handle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-gray-800 bg-black/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.handle}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{testimonial.content}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                    <span>{testimonial.platform}</span>
                    <span>•</span>
                    <span>{testimonial.followers} followers</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}