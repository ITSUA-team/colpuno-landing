import { Box, Button, Stack, TextField, Typography, alpha } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { trackRegStarted, trackCtaUnlockJobsClicked } from '../utils/tracking';
import LandingJobPreview from './landing-job-preview';
import IconStar2 from '../../../assets/icon-components/icon-star';
import { JobBadge } from './index';
import TrustBadgesImg from '../../../assets/badges.png';

import {
    JobsTicker,
} from '../components';

function LandingHero() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isRegOpen, setIsRegOpen] = useState(false);

    const validateEmail = (emailValue: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailValue);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        trackRegStarted(email);
        trackCtaUnlockJobsClicked();
        setIsRegOpen(true);
    };

    const vacancies = [
        { flag: '🇸🇦', country: 'Saudi Arabia', count: 7259 },
        { flag: '🇺🇸', country: 'United States', count: 911 },
        { flag: '🇵🇭', country: 'Philippines', count: 451 },
        { flag: '🇮🇪', country: 'Ireland', count: 90 },
        { flag: '🇰🇼', country: 'Kuwait', count: 1187 },
        { flag: '🇶🇦', country: 'Qatar', count: 1028 },
        { flag: '🇦🇪', country: 'United Arab Emirates', count: 263 },
        { flag: '🇸🇬', country: 'Singapore', count: 2045 },
        { flag: '🇵🇬', country: 'Papua New Guinea', count: 82 },
        { flag: '🇯🇵', country: 'Japan', count: 67 },
        { flag: '🇸🇷', country: 'Suriname', count: 51 },
        { flag: '🇨🇦', country: 'Canada', count: 40 },
        { flag: '🇧🇭', country: 'Bahrain', count: 20 },
        { flag: '🇴🇲', country: 'Oman', count: 14 },
        { flag: '🇦🇺', country: 'Australia', count: 10 },
        { flag: '🇬🇺', country: 'Guam', count: 5 },
        { flag: '🇳🇱', country: 'Netherlands', count: 4 },
    ];

    return (
        <>
            <Box
                id='landing-hero'
                sx={{
                    width: '100vw',
                    position: 'relative',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    p: { xs: 2, md: 3 }
                }}
            >
                <Box
                    sx={{
                        maxWidth: 1260,
                        mx: 'auto',
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        background: (theme) => `linear-gradient(0deg, ${theme.palette.secondary.main} -54.4%, ${theme.palette.primary.main} 100%)`,
                        position: 'relative',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        overflow: 'hidden',
                    }}
                >
                    <Box sx={{ position: 'absolute', top: '29px', left: '47px' }}>
                        <IconStar2 />
                    </Box>

                    <Stack
                        direction={{ xs: 'column', lg: 'row' }}
                        sx={{
                            alignItems: { xs: 'stretch', lg: 'flex-start' },
                        }}
                    >
                        <Box
                            sx={{
                                flex: { lg: '0 0 40%' },
                                maxWidth: { lg: '40%' },
                                display: 'grid',
                                justifyContent: 'center',
                                gap: '1rem',
                                p: { xs: 2, md: 3 },
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    textAlign: 'center',
                                    mx: 'auto',
                                }}
                            >
                                {/* Module 1 — Hero: headline + subhead (spec copy) */}
                                <Typography
                                    variant='h2'
                                    sx={{
                                        fontSize: { xs: '26px', md: '34px', lg: '40px' },
                                        mb: 2,
                                        lineHeight: 1.2,
                                        color: 'common.white',
                                    }}
                                >
                                    Newly Registered Nurse? Start your career with verified opportunities.
                                </Typography>

                                <Typography
                                    variant='body1'
                                    sx={{
                                        mb: 3,
                                        fontSize: { xs: '16px', md: '18px' },
                                        color: (theme) => theme.palette.font.white60,
                                    }}
                                >
                                    A safe, nurse-only career platform for newly registered Filipino nurses. Build an employer-ready profile, apply to verified jobs faster, and get long-term support—free forever.
                                </Typography>

                                <Box sx={{
                                    flex: 1,
                                    display: 'grid',
                                    rowGap: '24px',
                                    p: { xs: 2, md: 3 },
                                    backgroundColor: 'primary.dark',
                                    borderRadius: '16px',
                                    justifyContent: 'center',
                                     }}>
                                    <Box component='form' onSubmit={handleSubmit} sx={{ maxWidth: '395px', width: '100%', textAlign: 'center' }}>

                                        {/* Email entry (starts onboarding) */}
                                        <TextField
                                            fullWidth
                                            sx={{
                                                backgroundColor: 'common.white',
                                                borderRadius: '8px',
                                            }}
                                            label='Email address'
                                            placeholder='you@example.com'
                                            type='email'
                                            variant='outlined'
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                            error={!!error}
                                            helperText={error}
                                        />
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            size='large'
                                            fullWidth
                                            sx={{
                                                mt: 2,
                                            }}
                                        >
                                            Unlock jobs
                                        </Button>
                                    </Box>
                                    <Stack spacing={1.25}>
                                        <Typography
                                            variant='body1'
                                            sx={{
                                                textAlign: 'center',
                                                color: 'common.white',
                                                fontSize: { xs: '15px', md: '16px' },
                                            }}
                                        >
                                            Already have an account?{' '}
                                            <Button
                                                variant='text'
                                                onClick={() => (window.location.href = 'https://www.colpuno.com/login')}
                                                sx={{
                                                    p: 0,
                                                    minWidth: 'auto',
                                                    fontSize: { xs: '15px', md: '16px' },
                                                    textDecoration: 'underline',
                                                    color: 'primary.lighter',
                                                    '&:hover': {
                                                        textDecoration: 'underline',
                                                        color: 'common.white',
                                                    },
                                                }}
                                            >
                                                Log in
                                            </Button>
                                        </Typography>
                                        {/* Microcopy — verification email link only */}
                                        <Typography
                                            variant='caption'
                                            sx={{
                                                textAlign: 'center',
                                                color: (theme) => theme.palette.font.white60,
                                                display: 'block',
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            By continuing, you&apos;ll receive a verification email link and updates from COLPUNO.
                                        </Typography>
                                        {/* Time reducer отдельной строкой */}
                                        <Box sx={{ textAlign: 'center', pt: 0.5 }}>
                                            <Typography
                                                variant='caption'
                                                sx={{
                                                    color: 'common.white',
                                                    fontSize: '0.8125rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                It takes 2 minutes to get started.
                                            </Typography>
                                        </Box>
                                        {/* Trust badges — текстовые (mobile) + графические (desktop) */}
                                        {/* Mobile: текстовые бейджи */}
                                        <Stack
                                            direction='row'
                                            spacing={1}
                                            justifyContent='center'
                                            flexWrap='wrap'
                                            sx={{ pt: 0.5, display: { xs: 'flex', md: 'none' } }}
                                        >
                                            {[
                                                'Free to join',
                                                'Data-protected',
                                                'Verified job listings',
                                            ].map((label) => (
                                                <Box
                                                    key={label}
                                                    sx={{
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 999,
                                                        border: '1px solid',
                                                        borderColor: (theme) =>
                                                            alpha(theme.palette.common.white, 0.18),
                                                        backgroundColor: (theme) =>
                                                            alpha(theme.palette.common.black, 0.16),
                                                    }}
                                                >
                                                    <Typography
                                                        variant='caption'
                                                        sx={{
                                                            color: (theme) => theme.palette.font.white60,
                                                            fontSize: '0.75rem',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {label}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                        {/* Desktop: стикеры‑бейджи картинкой */}
                                        <Box
                                            sx={{
                                                mt: 1.5,
                                                display: { xs: 'none', md: 'flex' },
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={typeof TrustBadgesImg === 'string' ? TrustBadgesImg : (TrustBadgesImg as any).src}
                                                alt="Free to join, data protected, verified job listings"
                                                sx={{
                                                    maxWidth: 360,
                                                    width: '100%',
                                                    height: 'auto',
                                                    borderRadius: 2,
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                mt: { xs: 4, lg: 0 },
                                p: { xs: 2, md: 3 },
                            }}
                        >
                            <Box sx={{ width: '100%', mb: 3 }}>
                                <JobBadge text="13’000+ Job Vacancies (*)" />
                            </Box>
                            <LandingJobPreview />
                        </Box>
                    </Stack>
                    <JobsTicker items={vacancies} />
                    <Typography variant='body1' sx={{ mt: 2, fontSize: '0.75rem', textAlign: 'center', color: 'white' }}>
                        *** Job openings from DMW-accredited recruiters & national top-tier hospitals verified via rocketnurse.ph or via external sources.
                    </Typography>
                </Box>
            </Box>
            <StyledModal
                open={isRegOpen}
                onClose={() => setIsRegOpen(false)}
                smallHeightModal={false}
                noCloseIcon
                style={{
                    width: { xs: '95%', sm: '90%', md: '750px', lg: '850px' },
                    maxWidth: '900px',
                    p: 0,
                    borderRadius: '16px',
                    maxHeight: { xs: '95vh', md: '90vh' },
                    overflow: 'hidden'
                }}
            >
                <AppRegistration initialEmail={email} embedded onClose={() => setIsRegOpen(false)} />
            </StyledModal>
        </>
    );
}

export default LandingHero;
