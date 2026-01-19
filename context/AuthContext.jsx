"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mockUsers } from "@/data/mockData";

// Create authentication context
const AuthContext = createContext();

// Provider component to wrap the app
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is logged in when page loads
  useEffect(() => {
    // Look for user data in browser storage
    const savedUser = sessionStorage.getItem("ems_user");

    if (savedUser) {
      // Restore user session
      setUser(JSON.parse(savedUser));
    }

    // Mark loading as complete
    setIsLoading(false);
  }, []);

  // Login function
  const login = (email, password, role) => {
    // For this demo, we find a user by their role
    // (In a real app, you'd check email/password against a database)
    const foundUser = mockUsers.find((user) => user.role === role);

    if (foundUser) {
      // Save user to state and storage
      setUser(foundUser);
      sessionStorage.setItem("ems_user", JSON.stringify(foundUser));

      // Redirect user to their dashboard based on role
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "team-lead") {
        router.push("/dashboard/team-lead");
      } else {
        router.push("/dashboard/employee");
      }

      return true;
    }

    // Login failed
    return false;
  };

  // Logout function
  const logout = () => {
    // Clear user data
    setUser(null);
    sessionStorage.removeItem("ems_user");

    // Redirect to login page
    router.push("/login");
  };

  // Provide authentication data to all child components
  const authData = {
    user, // Current logged-in user (or null)
    login, // Function to log in
    logout, // Function to log out
    isLoading, // Loading state (true/false)
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use authentication
export function useAuth() {
  const context = useContext(AuthContext);

  // Safety check - this hook must be used inside AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
