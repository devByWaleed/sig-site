'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

type StatusType = 'idle' | 'sending' | 'success' | 'error';

export default function FinalCTA() {
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState<StatusType>('idle');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // stops the page-reload / URL-param behavior, same as your original

        const form = event.currentTarget;
        setStatusType('sending');
        setStatusMessage('Sending...');

        const formData = new FormData(form);
        const params = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            tier_interest: formData.get('tier_interest'),
            message: formData.get('message'),
        };

        // NEXT_PUBLIC_ prefix is required — Next.js only exposes env vars to
        // the browser bundle if they start with this. Without it, these would
        // be undefined at runtime even if set correctly in .env.local.
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

        try {
            // Passing the public key directly to send() instead of a separate
            // emailjs.init() call — avoids an extra side-effecting call on every
            // render/mount and keeps this self-contained to the submit handler.
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
            setStatusType('success');
            setStatusMessage("✅ Message sent! I'll respond within 24 hours.");
            form.reset();
        } catch (error) {
            console.error('EmailJS error:', error);
            setStatusType('error');
            setStatusMessage('❌ Failed to send. Please try again or email me directly.');
        }
    };

    const statusColor =
        statusType === 'success' ? '#2D6A4F' : statusType === 'error' ? '#DC2626' : 'var(--text-body)';

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="px-6 py-20 md:py-28 border-t"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-alt)' }}
        >
            <div className="max-w-xl mx-auto text-center">
                <h2 id="contact-heading" className="text-2xl md:text-4xl font-bold mb-3" style={{ color: 'var(--text-heading)' }}>
                    Ready to look established in every email you send?
                </h2>
                <p className="text-sm md:text-base mb-10" style={{ color: 'var(--text-body)' }}>
                    Tell me a bit about your brokerage and which tier you&apos;re interested in — I&apos;ll follow up within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="text-left space-y-5">
                    <div>
                        <label htmlFor="user_name" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-heading)' }}>
                            Name
                        </label>
                        <input
                            id="user_name"
                            name="user_name"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-heading)' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="user_email" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-heading)' }}>
                            Email
                        </label>
                        <input
                            id="user_email"
                            name="user_email"
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-heading)' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="tier_interest" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-heading)' }}>
                            Which tier interests you?
                        </label>
                        <select
                            id="tier_interest"
                            name="tier_interest"
                            required
                            defaultValue=""
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-heading)' }}
                        >
                            <option value="" disabled>
                                Select one
                            </option>
                            <option value="Starter">Starter — $35</option>
                            <option value="Pro">Pro — $100</option>
                            <option value="Team">Team — $200+</option>
                            <option value="Not sure">Not sure yet</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-heading)' }}>
                            Anything else? (optional)
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none focus:ring-2 focus:ring-[var(--accent)]"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', color: 'var(--text-heading)' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={statusType === 'sending'}
                        className="w-full px-6 py-3.5 rounded-full text-sm font-semibold transition-opacity disabled:opacity-60"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                    >
                        {statusType === 'sending' ? 'Sending...' : 'Send Message →'}
                    </button>

                    {statusMessage && (
                        <p role="status" aria-live="polite" className="text-sm text-center pt-1" style={{ color: statusColor }}>
                            {statusMessage}
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}