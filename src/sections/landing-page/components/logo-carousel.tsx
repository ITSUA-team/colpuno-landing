import { useEffect, useRef } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

import logo0 from '../../../public/carousel/logo0.png';
import logo1 from '../../../public/carousel/logo1.png';
import logo2 from '../../../public/carousel/logo2.jpeg';
import logo3 from '../../../public/carousel/logo3.png';
import logo4 from '../../../public/carousel/logo4.png';
import logo5 from '../../../public/carousel/logo5.png';
import logo6 from '../../../public/carousel/logo6.png';
import logo7 from '../../../public/carousel/logo7.jpg';
import logo8 from '../../../public/carousel/logo8.jpg';
import logo9 from '../../../public/carousel/logo9.png';
import logo10 from '../../../public/carousel/logo10.png';
import logo11 from '../../../public/carousel/logo11.png';
import logo12 from '../../../public/carousel/logo12.png';
import logo13 from '../../../public/carousel/logo13.png';
import logo14 from '../../../public/carousel/logo14.jpg';
import logo15 from '../../../public/carousel/logo15.jpeg';
import logo16 from '../../../public/carousel/logo16.png';
import logo17 from '../../../public/carousel/logo17.png';
import logo18 from '../../../public/carousel/logo18.jpg';
import logo19 from '../../../public/carousel/logo19.png';
import logo20 from '../../../public/carousel/logo20.png';
import logo21 from '../../../public/carousel/logo21.jpg';
import logoS1 from '../../../public/carousel/logo_s1.png';
import logoS2 from '../../../public/carousel/logo_s2.jpg';
import logoS3 from '../../../public/carousel/logo_s3.jpg';
import logoS4 from '../../../public/carousel/logo_s4.jpg';
import logoS5 from '../../../public/carousel/logo_s5.png';
import logoS6 from '../../../public/carousel/logo_s6.jpg';

const MOCK_LOGOS: string[] = [
    logo0.src, logo1.src, logo2.src, logo3.src, logo4.src, logo5.src,
    logo6.src, logo7.src, logo8.src, logo9.src, logo10.src, logo11.src,
    logo12.src, logo13.src, logo14.src, logo15.src, logo16.src, logo17.src,
    logo18.src, logo19.src, logo20.src, logo21.src, logoS1.src, logoS2.src,
    logoS3.src, logoS4.src, logoS5.src, logoS6.src,
];

type Props = {
    logos?: string[];
    speedPxPerSec?: number;
};

export default function LogoCarousel({ logos = MOCK_LOGOS, speedPxPerSec = 60 }: Props) {
    const theme = useTheme();
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const lastTsRef = useRef<number>(0);
    const offsetRef = useRef<number>(0);
    const loopWidthRef = useRef<number>(0);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;
        if (!wrapper || !track || logos.length === 0) return;

        const ensureLength = () => {
            const minWidth = wrapper.clientWidth * 3;
            let safety = 0;
            while (track.scrollWidth < minWidth && safety < 20) {
                Array.from(track.children).slice(0, logos.length).forEach((node) => {
                    track.appendChild(node.cloneNode(true));
                });
                safety++;
            }
        };

        const computeLoopWidth = () => {
            if (track.children.length < logos.length) return;
            const first = track.children[0] as HTMLElement;
            const last = track.children[logos.length - 1] as HTMLElement;
            loopWidthRef.current = Math.max(
                1,
                last.getBoundingClientRect().right - first.getBoundingClientRect().left
            );
        };

        ensureLength();
        computeLoopWidth();
        lastTsRef.current = performance.now();

        const step = (ts: number) => {
            const dt = (ts - lastTsRef.current) / 1000;
            offsetRef.current -= speedPxPerSec * dt;

            if (Math.abs(offsetRef.current) >= loopWidthRef.current) {
                offsetRef.current += loopWidthRef.current;
            }

            track.style.transform = `translateX(${offsetRef.current}px)`;
            lastTsRef.current = ts;
            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [logos, speedPxPerSec]);

    return (
        <Box
            component="section"
            aria-label="Trusted by Leaders"
            sx={{
                py: { xs: 4, md: 6 },
            }}
        >
            <Container maxWidth="lg">
                <Box textAlign="center" mb={{ xs: 3, md: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                            mb: 1,
                        }}
                    >
                        Trusted by Leaders
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            color: theme.palette.text.secondary,
                        }}
                    >
                        We’re proud to collaborate with some of the most respected names in career & job development for Filipino nurses.
                    </Typography>
                </Box>

                <Box
                    ref={wrapperRef}
                    sx={{
                        overflow: 'hidden',
                        width: '100%',
                    }}
                >
                    <Box
                        ref={trackRef}
                        sx={{
                            display: 'flex',
                            gap: { xs: 2, md: 4 },
                            flexWrap: 'nowrap',
                            alignItems: 'center',
                            willChange: 'transform',
                        }}
                    >
                        {logos.map((logo, i) => (
                            <Box
                                key={`a-${i}`}
                                component="img"
                                src={logo}
                                alt={`Logo ${i + 1}`}
                                sx={{
                                    height: { xs: 40, sm: 56, md: 64 },
                                    objectFit: 'contain',
                                    filter: 'grayscale(0.2)',
                                    opacity: 0.9,
                                    transition: 'transform 0.2s, opacity 0.2s, filter 0.2s',
                                    '&:hover': {
                                        opacity: 1,
                                        filter: 'grayscale(0)',
                                        transform: 'scale(1.03)',
                                    },
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                        {logos.map((logo, i) => (
                            <Box
                                key={`b-${i}`}
                                component="img"
                                src={logo}
                                alt={`Logo ${i + 1}`}
                                sx={{
                                    height: { xs: 40, sm: 56, md: 64 },
                                    objectFit: 'contain',
                                    filter: 'grayscale(0.2)',
                                    opacity: 0.9,
                                    transition: 'transform 0.2s, opacity 0.2s, filter 0.2s',
                                    '&:hover': {
                                        opacity: 1,
                                        filter: 'grayscale(0)',
                                        transform: 'scale(1.03)',
                                    },
                                    flexShrink: 0,
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
