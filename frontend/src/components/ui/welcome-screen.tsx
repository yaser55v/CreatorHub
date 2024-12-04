import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ArrowRight } from 'lucide-react';
import { Button } from './button';

interface WelcomeScreenProps {
  username: string;
}

export function WelcomeScreen({ username }: WelcomeScreenProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          navigate('/dashboard');
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10"
        >
          <Bot className="h-10 w-10 text-purple-500" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-3xl font-bold text-white"
        >
          Welcome back, {username}!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-gray-400"
        >
          Preparing your dashboard...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="mx-auto mb-8 h-1 w-48 overflow-hidden rounded-full bg-purple-500/20"
        >
          <div className="h-full bg-purple-500" style={{ width: `${progress}%` }} />
        </motion.div>
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-purple-400 hover:text-purple-300"
        >
          Skip
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}