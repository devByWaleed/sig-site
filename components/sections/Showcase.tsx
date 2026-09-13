'use client';

import { useState } from 'react';
import SignatureCard from '@/components/ui/SignatureCard';
import SignatureModal from '@/components/ui/SignatureModal';
import { SIGNATURES, SignatureTier } from '@/lib/sig-data';

const TIER_GROUPS: Array<{ key: SignatureTier; label: string; blurb: string }> = [
    {
        key: 'Starter',
        label: 'Starter',
        blurb: 'Clean, credibility-first designs for agents building their client base.',
    },
    {
        key: 'Pro',
        label: 'Pro',
        blurb: 'Premium, editorial designs for agents actively closing listings.',
    },
    {
        key: 'Team',
        label: 'Team',
        blurb: 'Brokerage-wide designs with shared branding across the whole roster.',
    },
];

export default function Showcase() {
    const [openId, setOpenId] = useState<string | null>(null);
    const openSignature = SIGNATURES.find((s) => s.id === openId) ?? null;

    return (
        <section
            id="showcase"
            aria-labelledby="showcase-heading"
            className="px-6 py-20 md:py-28 border-t"
            style={{ borderColor: 'var(--border)' }}
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                        Signature Showcase
                    </p>
                    <h2 id="showcase-heading" className="mt-3 text-2xl md:text-4xl font-bold" style={{ color: 'var(--text-heading)' }}>
                        Pick the one that fits where you are.
                    </h2>
                </div>

                <div className="space-y-16">
                    {TIER_GROUPS.map((tier) => {
                        const tierSignatures = SIGNATURES.filter((s) => s.tier === tier.key);
                        if (tierSignatures.length === 0) return null;

                        return (
                            <div key={tier.key}>
                                <div className="mb-6 flex items-baseline  flex-wrap gap-2">
                                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-heading)' }}>
                                        {tier.label}
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-body)' }}>
                                        {tier.blurb}
                                    </p>
                                </div>

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tierSignatures.map((sig) => (
                                        <SignatureCard key={sig.id} data={sig} onOpenModal={setOpenId} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <SignatureModal data={openSignature} onClose={() => setOpenId(null)} />
        </section>
    );
}