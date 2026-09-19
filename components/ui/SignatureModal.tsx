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

    // Reset to the first slide every time a different signature opens
    useEffect(() => {
        if (emblaApi && data) {
            emblaApi.scrollTo(0);
            setSelectedIndex(0);
        }
    }, [data, emblaApi]);

    // Entrance animation, background scroll lock, and ESC key listener
    useEffect(() => {
        if (!data) {
            setVisible(false);
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        const raf = requestAnimationFrame(() => setVisible(true));

        return () => {
            cancelAnimationFrame(raf);
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [data, onClose]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                role="button"
                tabIndex={-1}
                aria-label="Close modal backdrop"
                className={`absolute inset-0 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                }}
            />

            {/* Modal Dialog Panel */}
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
                {/* Close Button */}
                <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-4 right-4 z-10 p-2 rounded-full cursor-pointer transition-opacity hover:opacity-80"
                    style={{ backgroundColor: 'var(--bg)', color: 'var(--text-heading)' }}
                >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                </button>

                <div className="p-6 sm:p-8">
                    {/* Active Slide Label */}
                    <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                        {data.images[selectedIndex]?.label}
                    </p>

                    {/* Image Carousel */}
                    <div className="overflow-hidden rounded-xl border mb-3" style={{ borderColor: 'var(--border)' }} ref={emblaRef}>
                        <div className="flex">
                            {data.images.map((img, i) => (
                                <div
                                    key={`${img.label}-${i}`}
                                    className="relative flex-[0_0_100%] aspect-[4/3]"
                                    style={{ backgroundColor: 'var(--bg-alt)' }}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt || img.label}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 600px"
                                        className="object-contain"
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={scrollPrev}
                            aria-label="Previous image"
                            className="p-2 rounded-full border transition-opacity hover:opacity-80 cursor-pointer"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-heading)' }}
                        >
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>

                        <div className="flex gap-1.5">
                            {data.images.map((_, i) => (
                                <span
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
                                    style={{ backgroundColor: i === selectedIndex ? 'var(--accent)' : 'var(--border)' }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={scrollNext}
                            aria-label="Next image"
                            className="p-2 rounded-full border transition-opacity hover:opacity-80 cursor-pointer"
                            style={{ borderColor: 'var(--border)', color: 'var(--text-heading)' }}
                        >
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>

                    {/* Signature Details */}
                    <h3 id="signature-modal-title" className="text-xl font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                        {data.name}
                    </h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-body)' }}>
                        {data.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {data.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs font-medium px-3 py-1 rounded-full border"
                                style={{ borderColor: 'var(--border)', color: 'var(--text-body)' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Pricing & External Link */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                        <span className="text-2xl font-bold" style={{ color: 'var(--text-heading)' }}>
                            {data.price}
                        </span>
                        <a
                            href={data.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-semibold underline hover:opacity-80 transition-opacity"
                            style={{ color: 'var(--accent)' }}
                        >
                            View live signature ↗
                        </a>
                    </div>

                    {/* Primary CTA Button */}
                    <a
                        href={data.ctaHref}
                        onClick={onClose}
                        className="block w-full text-center py-3 px-6 rounded-xl font-semibold transition-opacity hover:opacity-90"
                        style={{
                            backgroundColor: 'var(--accent)',
                            color: 'var(--bg)',
                        }}
                    >
                        Get Signature Template
                    </a>
                </div>
            </div>
        </div>
    );
}