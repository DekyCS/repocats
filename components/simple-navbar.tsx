"use client"

import React from "react";
import Link from "next/link";

const SimpleNavbar = () => {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.gif" alt="RepoCats Logo" className="h-6 w-6" />
              <span className="text-sm font-medium">repocats</span>
            </Link>
          </div>

          {/* Center Navigation */}
          <nav className="flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium hover:opacity-80">
              Getting Started
            </Link>
            <Link href="#" className="text-sm font-medium hover:opacity-80">
              Useful Links
            </Link>
            <Link href="#" className="text-sm font-medium hover:opacity-80">
              Mods
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center">
            <button className="bg-[#cdc7bd] text-black text-sm font-medium px-4 py-1.5 rounded-md">
              Download
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export { SimpleNavbar };
