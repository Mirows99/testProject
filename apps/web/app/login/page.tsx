"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh" 
    }}>
      <div>
        <h1 style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "20px" }}>Some Tracking App</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">
              Email *
            </label>
            <br />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ marginTop: "5px" }}
            />
          </div>
          
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="password">
              Password *
            </label>
            <br />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ marginTop: "5px" }}
            />
          </div>
          
          <div style={{ marginBottom: "10px" }}>
            <Link href="/forgot-password" style={{ color: "blue", textDecoration: "underline", fontSize: "14px" }}>
              Forgot password?
            </Link>
          </div>
          
          <div>
            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                marginRight: "5px", 
                padding: "2px 8px", 
                backgroundColor: "#f0f0f0",
                border: "1px solid #999",
                borderRadius: "2px"
              }}
            >
              Login
            </button>
            
            <button 
              type="button" 
              onClick={() => router.push("/register")}
              style={{ 
                padding: "2px 8px", 
                backgroundColor: "#f0f0f0",
                border: "1px solid #999",
                borderRadius: "2px"
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 