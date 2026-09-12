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
      <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />

      <aside
        className={`mobile-sidebar ${isOpen ? 'open' : ''}`}
        style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
      >
        <div
          className="flex items-center justify-between px-6 h-16 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>
            Menu
          </span>
          <button onClick={onClose} className="p-2" style={{ color: 'var(--text-heading)' }} aria-label="Close menu">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6 flex flex-col gap-5 text-sm font-medium" style={{ color: 'var(--text-body)' }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose} style={{ color: 'var(--text-body)' }}>
              {link.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
