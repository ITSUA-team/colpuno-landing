import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import CountUp from 'src/components/count-up/count-up';
import { getProfileProgressDescription } from 'src/utils/functions';

function LandingProfileMotivator() {
    const profileProgress = 65;
    const [animatedProgress, setAnimatedProgress] = useState(0);

    const benefits = [
        'Better visibility to employers',
        'More accurate matches',
        'Faster employer review',
    ];

    const profileStats = [
        { label: 'Profile basics', value: 100 },
        { label: 'Skills & experience', value: 70 },
        { label: 'Documents & licenses', value: 40 },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedProgress(profileProgress);
        }, 50);

        return () => clearTimeout(timeout);
    }, [profileProgress]);

    return (
        <Box sx={{ py: { xs: 4, md: 6 } }}>
            <Box
                sx={{
                    maxWidth: 960,
                    mx: 'auto',
                    px: { xs: 2, md: 0 },
                }}
            >
                <Box
                    sx={{
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'grey.200',
                        boxShadow: { xs: 1, md: 3 },
                        bgcolor: 'common.white',
                        p: { xs: 3, md: 4 },
                    }}
                >
                    <Stack
                        spacing={{ xs: 3, md: 6 }}
                        direction={{ xs: 'column', md: 'row' }}
                        alignItems={{ xs: 'stretch', md: 'center' }}
                    >
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontSize: { xs: '24px', md: '32px' },
                                    fontWeight: 700,
                                    mb: 1.5,
                                    textAlign: { xs: 'center', md: 'left' },
                                }}
                            >
                                A stronger profile = better matches
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 2.5,
                                    textAlign: 'left',
                                    color: 'text.secondary',
                                }}
                            >
                                Completing your COLPUNO profile helps employers review you faster and improves
                                match accuracy across verified opportunities.
                            </Typography>
                            <Stack spacing={1.25} sx={{ mt: 1 }}>
                                {benefits.map((text, index) => (
                                    <Stack
                                        key={index}
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                    >
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                bgcolor: 'primary.main',
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.9rem', md: '0.95rem' },
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'stretch' }}>
                            <Box
                                sx={{
                                    width: '100%',
                                    backgroundColor: 'secondary.lighter',
                                    borderRadius: '16px',
                                    padding: '28px 22.5px 28px 24px',
                                }}
                            >
                                <Typography variant="subtitle2">
                                    Your profile progress
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '24px',
                                        minHeight: '56px',
                                        mt: 1.5,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '8px',
                                            borderRadius: '30px',
                                            backgroundColor: 'common.white',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: `${animatedProgress}%`,
                                                height: '8px',
                                                background:
                                                    'linear-gradient(90deg, #173AA8 0%, #CE1127 70.5%)',
                                                borderRadius: '30px',
                                                transition: 'width 1.5s ease',
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: '-11px',
                                            width: '95px',
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            sx={{ fontWeight: 600 }}
                                        >
                                            <CountUp
                                                targetNumber={profileProgress}
                                                duration={1500}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="h3"
                                            sx={{ fontWeight: 600, mb: '-11px' }}
                                        >
                                            %
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body1" sx={{ mt: 1.5 }}>
                                    {getProfileProgressDescription(profileProgress)}
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default LandingProfileMotivator;
