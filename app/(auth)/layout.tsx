import React from "react";
import '@/app/globals.css'
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen w-full">{children}</div>
  );
}
