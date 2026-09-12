'use client';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLast?: boolean;
}

export default function AccordionItem({ question, answer, isOpen, onClick, isLast = false }: AccordionItemProps) {
  return (
    <div className={`faq-item ${!isLast ? 'border-b' : ''}`} style={{ borderColor: 'var(--border)' }}>
      <button
        className="faq-trigger flex items-center justify-between w-full text-left px-6 py-5"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm md:text-base" style={{ color: 'var(--text-heading)' }}>
          {question}
        </span>
        <svg
          className={`faq-icon w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          style={{ color: 'var(--accent)' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className={`faq-panel ${isOpen ? 'open' : ''}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
