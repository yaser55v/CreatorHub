import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Building2, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { SocialLogin } from '@/components/ui/social-login';
import { WelcomeScreen } from '@/components/ui/welcome-screen';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  accountType: z.enum(['creator', 'business'], {
    required_error: 'Please select an account type',
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      accountType: 'creator',
    },
  });

  const accountType = watch('accountType');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast({
        title: 'Welcome to CreatorHub!',
        description: 'Your account has been created successfully.',
      });
      setShowWelcome(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github') => {
    toast({
      title: 'Coming Soon',
      description: `${provider} login will be available soon!`,
    });
  };

  if (showWelcome) {
    return <WelcomeScreen username="User" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-purple-400 hover:text-purple-300"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <SocialLogin
            onGoogleLogin={() => handleSocialLogin('google')}
            onGithubLogin={() => handleSocialLogin('github')}
          />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1A0B2E] px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {/* Account Type Selection */}
              <div className="space-y-2">
                <Label className="text-white">Account Type</Label>
                <RadioGroup
                  defaultValue="creator"
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    htmlFor="creator"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-4 ${
                      accountType === 'creator'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <RadioGroupItem value="creator" id="creator" className="sr-only" {...register('accountType')} />
                    <User className="h-5 w-5" />
                    Creator
                  </Label>
                  <Label
                    htmlFor="business"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 p-4 ${
                      accountType === 'business'
                        ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                        : 'border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    <RadioGroupItem
                      value="business"
                      id="business"
                      className="sr-only"
                      {...register('accountType')}
                    />
                    <Building2 className="h-5 w-5" />
                    Business
                  </Label>
                </RadioGroup>
              </div>

              {/* Name Input */}
              <div>
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="mt-1 border-gray-800 bg-black/50 text-white placeholder:text-gray-500"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <Label htmlFor="email" className="text-white">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="mt-1 border-gray-800 bg-black/50 text-white placeholder:text-gray-500"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="mt-1 border-gray-800 bg-black/50 text-white placeholder:text-gray-500"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>

            <p className="text-center text-xs text-gray-400">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}