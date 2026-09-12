import ThemeToggle from '@/components/ui/ThemeToggle';

const EXPLORE_LINKS = [
  { href: '#showcase', label: 'Samples' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export default function Footer() {
  // Computed at render time on the server — no client JS needed to keep
  // this current. It auto-updates on every rebuild/redeploy without any
  // code change; it just won't tick over mid-visit on Jan 1st at midnight,
  // which doesn't matter for a copyright year.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}>
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Email Signatures <span style={{ color: 'var(--accent)' }}>for Agents</span>
          </div>
          <p className="mt-3 text-sm max-w-xs" style={{ color: 'var(--text-body)' }}>
            Custom-designed, Outlook-tested email signatures that make real estate agents look
            established and turn every email into a lead.
          </p>

          <div className="mt-5">
            <ThemeToggle variant="labeled" />
          </div>
        </div>

        {/* Explore links */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-heading)' }}>
            Explore
          </div>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-body)' }}>
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:underline" style={{ color: 'var(--text-body)' }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--text-heading)' }}>
            Get in Touch
          </div>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-body)' }}>
            <li>
              <a href="mailto:hello@example.com" className="hover:underline" style={{ color: 'var(--text-body)' }}>
                hello@example.com
              </a>
            </li>
            <li>
              <a
                href="#"
                className="inline-block mt-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
              >
                Book a Call →
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div
          className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs"
          style={{ color: 'var(--text-body)' }}
        >
          <span>© {year} Email Signatures for Agents. All rights reserved.</span>
          <span>Built for real estate agents.</span>
        </div>
      </div>
    </footer>
  );
}
