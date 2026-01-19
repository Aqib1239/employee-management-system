"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Users, Shield, UserCheck, Briefcase } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(email, password, role);
    if (!success) {
      setError("Invalid credentials");
    }
    setIsLoading(false);
  };

  const roleIcons = {
    admin: <Shield className="h-4 w-4" />,
    "team-lead": <UserCheck className="h-4 w-4" />,
    employee: <Briefcase className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-md bg-gray-100 border border-gray-300 shadow-md rounded-lg">
        <div className="p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-black">
              Employee Management
            </h2>
            <p className="text-sm text-blue-400 italic">
              Sign in to access your dashboard
            </p>
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-black text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 shadow-md rounded-md px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/70"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-black text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 shadow-md rounded-md px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/70"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-black text-sm font-medium">
                Role (Demo)
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-gray-300 shadow-md rounded-md px-3 py-2 text-sm text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black/70"
                >
                  <option value="admin">Admin (Owner)</option>
                  <option value="team-lead">Team Lead</option>
                  <option value="employee">Employee</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-black/60">
                Select a role to demo different dashboards
              </p>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 cursor-pointer transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-400">
            <p className="text-xs text-black/60 text-center">
              This is a demo application. Any credentials will work.
              <br />
              Select a role above to access different dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
