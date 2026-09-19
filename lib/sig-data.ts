export type SignatureTier = 'Starter' | 'Pro' | 'Team';

export interface SignatureImage {
    src: string;
    alt: string;
    label: string; // shown above the slider: "Thumbnail", "Gmail - Desktop", etc.
}

export interface SignatureData {
    id: string;
    tier: SignatureTier;
    name: string; // persona label, e.g. "For New Agents"
    description: string;
    tags: string[];
    price: string;
    liveUrl: string; // hosted Vercel link - separate from the modal
    ctaHref: string; // Calendly/contact anchor
    thumbnail: string; // used by the card
    thumbnailAlt: string;
    images: SignatureImage[]; // used by the modal slider - starts with the thumbnail
}

export const SIGNATURES: SignatureData[] = [
    {
        id: 'new-agent-1',
        tier: 'Starter',
        name: 'For New Agents',
        description:
            'A clean, professional signature designed for agents launching their career. Sharp, minimal, and focused on building instant trust with clients.',
        tags: ['Mobile-safe', 'Outlook-tested', 'No banner needed'],
        price: 'Starter: $35',
        liveUrl: 'https://sig-five-eosin.vercel.app/signatures/john-doe.html',
        ctaHref: '#contact',
        thumbnail: '/sign-assets/john/thumbnail.png',
        thumbnailAlt: 'Email signature design preview for a new real estate agent, Starter tier',
        images: [
            { src: '/sign-assets/john/thumbnail.png', alt: 'New Agent signature thumbnail preview', label: 'Thumbnail' },
            { src: '/sign-assets/john/gmail_desktop.png', alt: 'New Agent signature rendered in Gmail desktop', label: 'Gmail - Desktop' },
            { src: '/sign-assets/john/gmail_mobile.png', alt: 'New Agent signature rendered in the Gmail mobile app', label: 'Gmail - Mobile' },
            { src: '/sign-assets/john/outlook_desktop.png', alt: 'New Agent signature rendered in Outlook desktop', label: 'Outlook - Desktop' },
            // { src: '/sign-assets/john/outlook_mobile.png', alt: 'New Agent signature rendered in the Outlook mobile app', label: 'Outlook - Mobile' },
        ],
    },
    {
        id: 'listing-specialist-1',
        tier: 'Pro',
        name: 'For Listing Specialists',
        description:
            'A high-end layout tailored for active listing agents. Features your license details, interactive promotional banners, and custom social icons.',
        tags: ['Mobile-safe', 'Outlook-tested', 'Includes promo banner', 'Themed social icons'],
        price: 'Pro: $100',
        liveUrl: 'https://sig-five-eosin.vercel.app/signatures/ashworth.html',
        ctaHref: '#contact',
        thumbnail: '/sign-assets/devon/thumbnail.png',
        thumbnailAlt: 'Email signature design preview for a real estate listing specialist, Pro tier',
        images: [
            { src: '/sign-assets/devon/thumbnail.png', alt: 'Listing Specialist signature thumbnail preview', label: 'Thumbnail' },
            { src: '/sign-assets/devon/gmail_desktop.png', alt: 'Listing Specialist signature rendered in Gmail desktop', label: 'Gmail - Desktop' },
            { src: '/sign-assets/devon/gmail_mobile.png', alt: 'Listing Specialist signature rendered in the Gmail mobile app', label: 'Gmail - Mobile' },
            { src: '/sign-assets/devon/outlook_desktop.png', alt: 'Listing Specialist signature rendered in Outlook desktop', label: 'Outlook - Desktop' },
            // { src: '/sign-assets/devon/outlook_mobile.png', alt: 'Listing Specialist signature rendered in the Outlook mobile app', label: 'Outlook - Mobile' },
        ],
    },
    {
        id: 'team-lead-1',
        tier: 'Team',
        name: 'For Team Leads',
        description:
            'A unified signature system for your entire team. Keep branding consistent across every agent with shared banners, team stats, and monthly updates.',
        tags: ['Mobile-safe', 'Outlook-tested', 'Includes promo banner', 'Multi-agent rollout', 'Monthly refresh available'],
        price: 'Team: $200+',
        liveUrl: 'https://sig-five-eosin.vercel.app/signatures/renee.html',
        ctaHref: '#contact',
        thumbnail: '/sign-assets/renee/thumbnail.png',
        thumbnailAlt: 'Email signature design preview for a real estate team lead, Team tier',
        images: [
            { src: '/sign-assets/renee/thumbnail.png', alt: 'Team Lead signature thumbnail preview', label: 'Thumbnail' },
            { src: '/sign-assets/renee/gmail_desktop.png', alt: 'Team Lead signature rendered in Gmail desktop', label: 'Gmail - Desktop' },
            { src: '/sign-assets/renee/gmail_mobile.png', alt: 'Team Lead signature rendered in the Gmail mobile app', label: 'Gmail - Mobile' },
            { src: '/sign-assets/renee/outlook_desktop.png', alt: 'Team Lead signature rendered in Outlook desktop', label: 'Outlook - Desktop' },
            // { src: '/sign-assets/renee/outlook_mobile.png', alt: 'Team Lead signature rendered in the Outlook mobile app', label: 'Outlook - Mobile' },
        ],
    },
];