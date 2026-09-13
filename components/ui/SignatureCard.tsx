'use client';

import Image from 'next/image';
import { SignatureData } from '@/lib/sig-data';

interface SignatureCardProps {
    data: SignatureData;
    onOpenModal: (id: string) => void;
}

export default function SignatureCard({ data, onOpenModal }: SignatureCardProps) {
    return (
        <div
            className="rounded-2xl border overflow-hidden flex flex-col h-full transition-transform duration-300 hover:-translate-y-1"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
            <div className="relative w-full aspect-[4/3]" style={{ backgroundColor: 'var(--bg-alt)' }}>
                <Image
                    src={data.thumbnail}
                    alt={data.thumbnailAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <span
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: 'var(--accent)' }}
                >
                    {data.name}
                </span>

                <p className="text-sm leading-relaxed mb-5 flex-grow" style={{ color: 'var(--text-body)' }}>
                    {data.description}
                </p>

                <button
                    onClick={() => onOpenModal(data.id)}
                    className="mt-auto px-4 py-2.5 rounded-full text-sm font-semibold border transition-colors cursor-pointer hover:text-(--text-heading)"
                    style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                    View Details →
                </button>
            </div>
        </div>
    );
}