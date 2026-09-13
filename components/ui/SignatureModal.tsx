'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { SignatureData } from '@/lib/sig-data';

interface SignatureModalProps {
    data: SignatureData | null;
    onClose: () => void;
}

export default function SignatureModal({ data, onClose }: SignatureModalProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Reset to the first slide (the thumbnail) every time a different
    // signature is opened, so it never opens mid-slider from a previous view.
    useEffect(() => {
        if (emblaApi && data) {
            emblaApi.scrollTo(0);
            setSelectedIndex(0);
        }
    }, [data, emblaApi]);

    // Triggers the bottom-to-top entrance animation one frame after mount,
    // and locks background scroll while the modal is open.
    useEffect(() => {
        if (!data) {
            setVisible(false);
            return;
        }
        document.body.style.overflow = 'hidden';
        const raf = requestAnimationFrame(() => setVisible(true));
        return () => {
            cancelAnimationFrame(raf);
            document.body.style.overflow = '';
        };
    }, [data]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
            {/* Glassmorphism backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                }}
            />

            {/* Panel — slides up from the bottom */}
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="signature-modal-title"
                className={`relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border transform transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{
                    backgroundColor: 'color-mix(in srgb, var(--surface) 85%, transparent)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderColor: 'var(--border)',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-10 p-2 rounded-full"
                    style={{ backgroundColor: 'var(--bg)', color: 'var(--text-heading)' }}
                >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8">
                    {/* Label above the slider — updates with the current slide */}
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                        {data.images[selectedIndex]?.label}
                    </p>

                    {/* Slider */}
                    <div className="overflow-hidden rounded-xl border mb-3" style={{ borderColor: 'var(--border)' }} ref={emblaRef}>
                        <div className="flex">
                            {data.images.map((img: any, i: any) => (
                                <div
                                    key={img.label + i}
                                    className="relative flex-[0_0_100%] aspect-[4/3]"
                                    style={{ backgroundColor: 'var(--bg-alt)' }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 600px"
                                        className="object-contain"
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prev / dots / next */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={scrollPrev}
                            aria-label="Previous image"
                            className="p-2 rounded-full border"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-heading)' }}
                        >
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="flex gap-1.5">
                            {data.images.map((_: any, i: any) => (
                                <span
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full transition-colors"
                                    style={{ backgroundColor: i === selectedIndex ? 'var(--accent)' : 'var(--border)' }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={scrollNext}
                            aria-label="Next image"
                            className="p-2 rounded-full border"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-heading)' }}
                        >
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Details — each block styled a little differently, same theme tokens throughout */}
                    <h3 id="signature-modal-title" className="text-xl font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                        {data.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-body)' }}>
                        {data.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                        {data.tags.map((tag: any) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-3 py-1 rounded-full border"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-body)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                            {data.price}
                        </span>
                        <a
                            href={data.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold underline"
                            style={{ color: 'var(--accent)' }}
                        >
                            View live signature ↗
                        </a>
                    </div>

                    <a
                        href={data.ctaHref}
                        onClick={onClose}
                        className="block text-center px-6 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02]"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
                    >
                        Get this one →
                    </a>
                </div>
            </div>
        </div>
    );
}