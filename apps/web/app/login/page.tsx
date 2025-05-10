"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement actual authentication logic
    setTimeout(() => {
      console.log("Login with:", email, password);
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">Coolify</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email <span className="text-yellow-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-900 border-gray-800 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password <span className="text-yellow-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-900 border-gray-800 text-white"
            />
          </div>
          
          <div className="text-sm">
            <Link href="/forgot-password" className="text-gray-400 hover:text-gray-300">
              Forgot password?
            </Link>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gray-800 hover:bg-gray-700 text-white"
            disabled={isLoading}
          >
            Login
          </Button>
          
          <Button
            type="button"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
} 