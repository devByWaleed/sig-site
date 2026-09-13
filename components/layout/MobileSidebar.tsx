'use client';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: '#showcase', label: 'Samples' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <>
      {/* Backdrop overlay with blur */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[200px] sm:w-[320px] flex flex-col border-l shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{
          backgroundColor: 'var(--nav-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Header Section */}
        <div
          className="flex items-center justify-between px-6 h-16 border-b shrink-0"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="font-bold text-sm tracking-wide uppercase" style={{ color: 'var(--accent)' }}>
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-[var(--border)]/40 focus:outline-none"
            style={{ color: 'var(--text-heading)' }}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group hover:bg-[var(--accent)]/10"
              style={{ color: 'var(--text-heading)' }}
            >
              <span className="group-hover:translate-x-1 group-hover:text-[var(--accent)] transition-all duration-200">
                {link.label}
              </span>
              <svg
                className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                style={{ color: 'var(--accent)' }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </nav>

        {/* Footer CTA Section */}
        <div className="p-6 border-t mt-auto shrink-0 space-y-3" style={{ borderColor: 'var(--border)' }}>
          <a
            href="#contact"
            onClick={onClose}
            className="flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 border"
            style={{
              borderColor: 'var(--accent)',
              color: 'var(--accent)',
            }}
          >
            Get Started →
          </a>
        </div>
      </aside>
    </>
  );
}