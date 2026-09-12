export default function Hero() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section id="hero" aria-labelledby="hero-heading" className="px-6">
        <div className="max-w-4xl mx-auto text-center py-20 md:py-28">
          <p
            className="text-xs md:text-sm font-semibold uppercase tracking-widest"
            style={{ color: 'var(--accent)' }}
          >
            Email Signatures for Real Estate Agents
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            I help Real Estate Agents achieve{' '}
            <span style={{ color: 'var(--accent)' }}>Credibility</span> &{' '}
            <span style={{ color: 'var(--accent)' }}>Direct Lead Generation</span> via email signatures.
          </h1>

          <p className="mt-6 text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-body)' }}>
            Custom-designed, tested in Gmail and Outlook, installed in one paste.
          </p>

          <a
            href="#showcase"
            className="inline-block mt-9 px-8 py-4 rounded-full text-sm md:text-base font-semibold transition-transform hover:scale-[1.03]"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            Get a Free Sample →
          </a>
        </div>
      </section>

      {/* ================= PROBLEM STATEMENT ================= */}
      <section
        aria-label="The problem"
        className="border-t px-6"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}
      >
        <div className="max-w-3xl mx-auto text-center py-10 md:py-14">
          <p
            className="text-base md:text-xl font-medium leading-relaxed"
            style={{ color: 'var(--text-heading)' }}
          >
            Most agent signatures are missing the one thing that actually builds trust. A
            license number, one clear call-to-action, or a design that doesn&apos;t break the
            moment it&apos;s opened in Outlook.
          </p>
        </div>
      </section>
    </>
  );
}
