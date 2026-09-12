export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Will this work in Outlook?',
    answer:
      "Yes. Every signature is built with Outlook's rendering quirks in mind and tested before delivery, not just designed to look good in Gmail.",
  },
  {
    question: 'Can I update it later?',
    answer:
      'Yes. Pro and Team signatures link to a hosted banner that can be refreshed any time. No need to reinstall the whole signature.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Most signatures are delivered within 2-3 business days of receiving your brand details.',
  },
  {
    question: "Do you need my brokerage's logo or brand guidelines?",
    answer:
      'If you have them, great. If not, I can work from your existing marketing materials or a couple of reference examples you like.',
  },
];
