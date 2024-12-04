import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  MessageSquare,
  Video,
} from 'lucide-react';
import type { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    name: 'Total Views',
    value: '2.4M',
    change: '+12.5%',
    icon: BarChart3,
  },
  {
    name: 'Engagement Rate',
    value: '4.3%',
    change: '+2.1%',
    icon: TrendingUp,
  },
  {
    name: 'Followers',
    value: '12.5K',
    change: '+8.2%',
    icon: Users,
  },
];

const quickActions = [
  {
    name: 'Schedule Content',
    description: 'Plan your upcoming posts',
    href: '/dashboard/calendar',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Generate Ideas',
    description: 'Get AI-powered content suggestions',
    href: '/dashboard/ai-assistant',
    icon: MessageSquare,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Create Content',
    description: 'Start creating new content',
    href: '/dashboard/library',
    icon: Video,
    color: 'from-orange-500 to-red-500',
  },
];

export function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-400">
          Here's what's happening with your content today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Card className="border-gray-800 bg-black/50 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.name}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="mt-1 text-sm text-green-500">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.name}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-gray-800 bg-black/50 p-6 backdrop-blur-xl transition-colors hover:border-gray-700"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 transition-opacity group-hover:opacity-10`}
              />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-lg bg-gray-800/50 p-3">
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 font-semibold text-white">{action.name}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}