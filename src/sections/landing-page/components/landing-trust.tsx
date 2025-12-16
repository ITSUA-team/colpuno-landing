import { Box, Stack, Typography } from '@mui/material';

import { IconCheckCircle } from '../../../assets';

function LandingTrust() {
    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                Built for Filipino nurses. Designed for safety.
            </Typography>

            <Stack spacing={3} sx={{ maxWidth: '800px', mx: 'auto' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <IconCheckCircle sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant='subtitle1' sx={{ mb: 0.5 }}>
                        Verified opportunities so you don&apos;t waste time on sketchy posts
                    </Typography>
                    <Typography variant='body2'>
                        All job listings are managed under COLPUNO&apos;s partner network.
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconCheckCircle sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                        One profile. Many opportunities. Build once—use it across jobs
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Create your profile once and apply to multiple verified positions seamlessly.
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconCheckCircle sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                        Smart matching helps the right job find you (instead of endless scrolling)
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Our algorithm matches you with opportunities that align with your skills and preferences.
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <IconCheckCircle sx={{ color: 'primary.main', mb: 1 }} />
                    <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                        Career tools and assessments to help you stand out with confidence
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Access professional development resources and assessments to showcase your strengths.
                    </Typography>
                </Box>
            </Stack>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant='caption' sx={{ fontStyle: 'italic' }}>
                    Trusted network: All job listings are managed under COLPUNO&apos;s partner network.
                </Typography>
            </Box>
        </Box>
    );
}

export default LandingTrust;
