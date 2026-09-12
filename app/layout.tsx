import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-context';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Email Signatures for Real Estate Agents | Custom Design',
  description:
    'Custom email signature design for real estate agents. Credibility-building, Outlook-tested signatures that turn every email into a lead. From $35.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is needed here specifically because the
    // no-flash script below sets data-theme before React hydrates —
    // without this, React would warn about a client/server attribute
    // mismatch that is intentional, not a bug.
    <html lang="en" suppressHydrationWarning>
      <body>
        {/*
          Runs before the page becomes interactive, so the correct theme
          is applied before first paint — prevents a flash of the wrong
          theme on load, which plain React state alone can't avoid since
          it only runs after hydration.
        */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var stored = localStorage.getItem('theme');
                var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            })();
          `}
        </Script>

        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
