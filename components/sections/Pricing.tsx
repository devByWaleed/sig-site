import Reveal from '@/components/ui/Reveal';

interface Tier {
    name: string;
    price: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    highlighted?: boolean;
    delay: number;
}

const TIERS: Tier[] = [
    {
        name: 'Starter',
        price: '$35',
        description: 'A single, clean signature. Credibility-first, no clutter.',
        features: ['Single signature', 'Mobile-safe', 'Outlook-tested', 'No banner needed'],
        ctaLabel: 'Get this one →',
        ctaHref: '#contact',
        delay: 0,
    },
    {
        name: 'Pro',
        price: '$100',
        description: 'Signature + promo banner + hands-on install for you.',
        features: [
            'Everything in Starter',
            'Includes promo banner',
            'Installed for you on Gmail, Outlook & Apple Mail',
            'Themed social icons',
        ],
        ctaLabel: 'Get this one →',
        ctaHref: '#contact',
        highlighted: true,
        delay: 120,
    },
    {
        name: 'Team',
        price: '$200+',
        description: 'Matching signatures for your whole brokerage, plus a monthly refresh.',
        features: [
            'Everything in Pro, per agent',
            'Matching signatures for the whole team',
            'Multi-agent rollout',
            'Monthly banner refresh retainer',
        ],
        ctaLabel: 'Get this team →',
        ctaHref: '#contact', // routes to Calendly, not a direct payment link — Team needs a quick call first
        delay: 240,
    },
];

export default function Pricing() {
    return (
        <section
            id="pricing"
            aria-labelledby="pricing-heading"
            className="px-6 py-20 md:py-28 border-t"
            style={{ borderColor: 'var(--border)' }}
        >
            <div className="max-w-5xl mx-auto">
                <Reveal className="text-center mb-14">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                        Pricing
                    </p>
                    <h2
                        id="pricing-heading"
                        className="mt-3 text-2xl md:text-4xl font-bold"
                        style={{ color: 'var(--text-heading)' }}
                    >
                        Pick a tier, not a headache.
                    </h2>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {TIERS.map((tier) => (
                        <Reveal key={tier.name} delay={tier.delay}>
                            <div
                                className="relative rounded-2xl border p-8 h-full flex flex-col"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    borderColor: tier.highlighted ? 'var(--accent)' : 'var(--border)',
                                    borderWidth: tier.highlighted ? '2px' : '1px',
                                }}
                            >
                                {tier.highlighted && (
                                    <span
                                        className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full"
                                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                                    >
                                        Most Popular
                                    </span>
                                )}

                                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-heading)' }}>
                                    {tier.name}
                                </h3>

                                <div className="mb-3">
                                    <span className="text-3xl font-bold" style={{ color: 'var(--text-heading)' }}>
                                        {tier.price}
                                    </span>
                                </div>

                                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-body)' }}>
                                    {tier.description}
                                </p>

                                <ul className="space-y-3 mb-8 flex-grow">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-body)' }}>
                                            <svg
                                                className="w-4 h-4 flex-shrink-0 mt-0.5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                style={{ color: 'var(--accent)' }}
                                            >
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={tier.ctaHref}
                                    className="block text-center px-5 py-3 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]"
                                    style={
                                        tier.highlighted
                                            ? { backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }
                                            : { border: '1px solid var(--border)', color: 'var(--text-heading)' }
                                    }
                                >
                                    {tier.ctaLabel}
                                </a>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}