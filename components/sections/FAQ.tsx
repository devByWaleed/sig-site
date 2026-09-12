'use client';

import { useState } from 'react';
import { FAQ_ITEMS } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full flex flex-col items-center justify-center py-16 px-6 border-t"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}
    >
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center md:text-left">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
            FAQ
          </p>
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-heading)' }}>
            Questions agents actually ask
          </h2>
          <p className="text-sm max-w-md mx-auto md:mx-0" style={{ color: 'var(--text-body)' }}>
            Straight answers before you buy. No sales pitch, just what you need to know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                onClick={() => toggleFAQ(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(index);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border ${isOpen ? 'row-span-2' : ''}`}
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>
                    {faq.question}
                  </span>
                  <div
                    className="flex-shrink-0 p-1 rounded transition-colors"
                    style={{
                      color: 'var(--accent)',
                      backgroundColor: isOpen ? 'var(--bg-alt)' : 'transparent',
                    }}
                  >
                    {isOpen ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                    )}
                  </div>
                </div>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}