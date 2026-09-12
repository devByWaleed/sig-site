import Reveal from '@/components/ui/Reveal';

interface Step {
    number: string;
    title: string;
    description: string;
    delay: number;
}

const STEPS: Step[] = [
    {
        number: '1',
        title: 'Share your brand details',
        description:
            'Send your logo, headshot, brand colors, and preferred link (listings page, Calendly, etc.) through a short form.',
        delay: 0,
    },
    {
        number: '2',
        title: 'I build & test it',
        description:
            'Your signature is custom-designed and tested across Gmail, Outlook, and Apple Mail before it\u2019s delivered.',
        delay: 120,
    },
    {
        number: '3',
        title: 'You install in one paste',
        description: 'Open your link, copy the signature, paste it into your email settings. Done in under 2 minutes.',
        delay: 240,
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="px-6 py-20 md:py-28">
            <div className="max-w-5xl mx-auto">
                <Reveal className="text-center mb-14">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                        How It Works
                    </p>
                    <h2
                        id="how-it-works-heading"
                        className="mt-3 text-2xl md:text-4xl font-bold"
                        style={{ color: 'var(--text-heading)' }}
                    >
                        Three steps. Under a week.
                    </h2>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-8 md:gap-6">
                    {STEPS.map((step) => (
                        <Reveal key={step.number} delay={step.delay} className="text-center px-4">
                            <div
                                className="mx-auto mb-5 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                            >
                                {step.number}
                            </div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-heading)' }}>
                                {step.title}
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-body)' }}>
                                {step.description}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}