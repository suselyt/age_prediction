"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">
          Age Guesser
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden gap-6 md:flex">
          <Link href="/" className="hover:text-emerald-700">
            Home
          </Link>
          <Link href="/about" className="hover:text-emerald-700">
            About
          </Link>
          <Link href="/quiz" className="hover:text-emerald-700">
            Quiz
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="flex size-8 items-center justify-center md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link
              href="/"
              className="hover:text-emerald-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-emerald-700"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/quiz"
              className="hover:text-emerald-700"
              onClick={() => setMenuOpen(false)}
            >
              Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}