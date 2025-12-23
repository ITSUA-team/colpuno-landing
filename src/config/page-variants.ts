import type { Job } from '../interfaces';

export type PageVariant = 'fresh-grads' | 'experienced' | 'singapore' | 'middle-east';

export interface PageConfig {
    variant: PageVariant;
    title: string;
    hero: {
        headline: string;
        usp?: string;
        subhead: string;
    };
    jobs: {
        title: string;
        tabs: {
            tab1Label: string;
            tab1Value: string;
            tab2Label: string;
            tab2Value: string;
        };
        national: number[];
        international: number[];
    };
    trust: {
        title: string;
        bullets: string[];
    };
    profileMotivator: {
        title: string;
        copy: string;
    };
    faq: {
        freshGradQuestion: string;
        freshGradAnswer: string;
    };
    finalCta: {
        headline: string;
    };
}

export const PAGE_CONFIGS: Record<PageVariant, PageConfig> = {
    'fresh-grads': {
        variant: 'fresh-grads',
        title: 'COLPUNO | Start your nursing career',
        hero: {
            headline: 'Newly Registered Nurse? Start your career with verified opportunities.',
            subhead: 'COLPUNO helps newly registered Filipino nurses build an employer-ready profile and apply to verified job opportunities faster, less stress and less guessing.',
        },
        jobs: {
            title: 'Real jobs ready for newly registered nurses',
            tabs: {
                tab1Label: 'National (PH)',
                tab1Value: 'national',
                tab2Label: 'International (Preview)',
                tab2Value: 'international',
            },
            national: [121, 183],
            international: [92, 102],
        },
        trust: {
            title: 'Built for Filipino nurses. Designed for safety.',
            bullets: [
                'Verified opportunities so you don’t waste time on sketchy posts',
                'One profile. Many opportunities. Build once—use it across jobs',
                'Smart matching helps the right job find you (instead of endless scrolling)',
                'Career tools and assessments to help you stand out with confidence',
            ],
        },
        profileMotivator: {
            title: 'A stronger profile = better matches',
            copy: 'Completing your profile helps employers review you faster and improves match accuracy.',
        },
        faq: {
            freshGradQuestion: "I'm a fresh grad. Can I still apply?",
            freshGradAnswer: 'Yes. This page is built for newly registered nurses, and job requirements will show if experience is needed.',
        },
        finalCta: {
            headline: 'Ready to start your nursing career with clarity?',
        },
    },
    'experienced': {
        variant: 'experienced',
        title: 'COLPUNO | Experienced nurses',
        hero: {
            headline: 'Experienced Nurse? Get hired to verified roles that match your background.',
            usp: 'A nurse-only career platform built to support you long-term. Stays FREE - always.',
            subhead: 'COLPUNO helps experienced Filipino nurses move forward with a profile that matches you to safe and verified opportunities.',
        },
        jobs: {
            title: 'Verified roles for experienced nurses',
            tabs: {
                tab1Label: 'National (PH)',
                tab1Value: 'national',
                tab2Label: 'International (Preview)',
                tab2Value: 'international',
            },
            national: [80, 91, 109, 203, 204],
            international: [93, 104, 196, 83, 76],
        },
        trust: {
            title: 'Built for Filipino nurses. Designed for safety.',
            bullets: [
                'Verified opportunities so you don’t waste time on sketchy posts',
                'Show your experience clearly with one employer-ready profile',
                'Apply faster with repeatable profile details (less re-typing)',
                'Matching helps connect you to roles aligned with your background',
            ],
        },
        profileMotivator: {
            title: 'Your experience matters, make it visible',
            copy: 'A complete profile helps employers assess your background faster and improves match accuracy.',
        },
        faq: {
            freshGradQuestion: 'Do I need a specialty to apply?',
            freshGradAnswer: 'Not always. Each job shows whether specialty/unit experience is preferred or required.',
        },
        finalCta: {
            headline: 'Ready for your next role?',
        },
    },
    'singapore': {
        variant: 'singapore',
        title: 'COLPUNO | Experienced nurses',
        hero: {
            headline: 'Experienced Nurse? Get hired to verified roles that match your background.',
            usp: 'A nurse-only career platform built to support you long-term. Stays FREE - always.',
            subhead: 'COLPUNO helps experienced Filipino nurses move forward with a profile that matches you to safe and verified opportunities.',
        },
        jobs: {
            title: 'Verified roles for experienced nurses',
            tabs: {
                tab1Label: 'National (PH)',
                tab1Value: 'national',
                tab2Label: 'International (Preview)',
                tab2Value: 'international',
            },
            national: [],
            international: [104, 118, 196, 208, 83, 207, 263],
        },
        trust: {
            title: 'Built for Filipino nurses. Designed for safety.',
            bullets: [
                'Verified opportunities so you don’t waste time on sketchy posts',
                'Show your experience clearly with one employer-ready profile',
                'Apply faster with repeatable profile details (less re-typing)',
                'Matching helps connect you to roles aligned with your background',
            ],
        },
        profileMotivator: {
            title: 'Your experience matters, make it visible',
            copy: 'A complete profile helps employers assess your background faster and improves match accuracy.',
        },
        faq: {
            freshGradQuestion: 'Do I need a specialty to apply?',
            freshGradAnswer: 'Not always. Each job shows whether specialty/unit experience is preferred or required.',
        },
        finalCta: {
            headline: 'Ready for your next role?',
        },
    },
    'middle-east': {
        variant: 'middle-east',
        title: 'COLPUNO | Experienced nurses',
        hero: {
            headline: 'Experienced Nurse? Get hired to verified roles that match your background.',
            usp: 'A nurse-only career platform built to support you long-term. Stays FREE - always.',
            subhead: 'COLPUNO helps experienced Filipino nurses move forward with a profile that matches you to safe and verified opportunities.',
        },
        jobs: {
            title: 'Verified roles for experienced nurses',
            tabs: {
                tab1Label: 'National (PH)',
                tab1Value: 'national',
                tab2Label: 'International (Preview)',
                tab2Value: 'international',
            },
            national: [],
            international: [118, 196, 208, 83, 207, 263],
        },
        trust: {
            title: 'Built for Filipino nurses. Designed for safety.',
            bullets: [
                'Verified opportunities so you don’t waste time on sketchy posts',
                'Show your experience clearly with one employer-ready profile',
                'Apply faster with repeatable profile details (less re-typing)',
                'Matching helps connect you to roles aligned with your background',
            ],
        },
        profileMotivator: {
            title: 'Your experience matters, make it visible',
            copy: 'A complete profile helps employers assess your background faster and improves match accuracy.',
        },
        faq: {
            freshGradQuestion: 'Do I need a specialty to apply?',
            freshGradAnswer: 'Not always. Each job shows whether specialty/unit experience is preferred or required.',
        },
        finalCta: {
            headline: 'Ready for your next role?',
        },
    },
};

export const MIDDLE_EAST_COUNTRIES = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Oman',
    'Bahrain',
];