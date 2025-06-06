import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AnimatedContainer } from '@/components/ui/animated-container';
import Logo from '@/components/shared/Logo';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }).email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export default function Login() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [, navigate] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Handle redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setIsLoading(true);
    
    try {
      const result = await login(values.username, values.password);
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        setError(result.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // If already logged in, don't render the form
  if (isAuthenticated && isAdmin) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Admin Login - Sasyamrita Organics</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-neutral-lightest p-4">
        <AnimatedContainer className="w-full max-w-md" type="fade">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <Logo className="h-16 w-16" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-primary">
              Sasyamrita Organics
            </h1>
            <p className="text-neutral-dark">Admin Portal</p>
          </div>
          
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-center">Login</h2>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            {...field} 
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <a 
              href="/" 
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              ← Return to Website
            </a>
          </div>
        </AnimatedContainer>
      </div>
    </>
  );
}
