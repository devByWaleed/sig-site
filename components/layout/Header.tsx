'use client';

import { useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileSidebar from '@/components/layout/MobileSidebar';

const NAV_LINKS = [
  { href: '#showcase', label: 'Samples' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 backdrop-blur border-b"
        style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Email Signatures <span style={{ color: 'var(--accent)' }}>for Agents</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:opacity-70 transition-opacity"
                style={{ color: 'var(--text-body)' }}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2"
              style={{ color: 'var(--text-heading)' }}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
