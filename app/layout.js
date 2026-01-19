'use client';
import  React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/AuthContext";

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

// export const metadata = {
//   title: "Employee Management System",
//   description: "Enterprise-grade HR management solution"
// }

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
