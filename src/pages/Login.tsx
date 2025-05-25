
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - would connect to Firebase Auth in production
    if (email && password) {
      toast({
        title: isLogin ? "Login successful!" : "Account created!",
        description: "Welcome to imbue.app",
      });
      navigate('/dashboard');
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-matte p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center space-y-2 mb-8">
          <div className="relative mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-tr from-royal-light via-royal to-royal-dark flex items-center justify-center">
              <span className="text-xl font-bold text-pearl tracking-tight">IA</span>
            </div>
            <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-400 ring-2 ring-background"></div>
          </div>
          <h1 className="text-2xl font-semibold text-pearl">Welcome to imbue.app</h1>
          <p className="text-muted-foreground text-center max-w-sm">
            AI-powered financial insights for modern investors
          </p>
        </div>
        
        <div className="animate-fadeIn animate-delay-100">
          <Card className="bg-matte-light border-matte-lighter">
            <CardHeader>
              <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Enter your credentials to access your account' 
                  : 'Sign up for a new invest.app account'}
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-matte border-matte-lighter focus-visible:ring-royal"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    {isLogin && (
                      <a href="#" className="text-xs text-royal hover:underline">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <Input 
                    id="password" 
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-matte border-matte-lighter focus-visible:ring-royal"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button type="submit" className="w-full bg-royal hover:bg-royal-light">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
                <div className="text-center text-sm">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-royal hover:underline focus:outline-none"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} imbue.app • All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
