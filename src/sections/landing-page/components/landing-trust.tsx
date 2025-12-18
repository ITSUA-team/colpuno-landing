import { Box, Stack, Typography } from '@mui/material';
import IconCheckCircle from 'src/assets/icon-components/icon-check-circle';

/**
 * LandingTrust component - Why COLPUNO trust block
 */
function LandingTrust() {
    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    fontWeight: 700,
                    mb: 3,
                    textAlign: 'center',
                }}
            >
                Built for Filipino nurses. Designed for safety.
            </Typography>

            <Stack spacing={3} sx={{ maxWidth: '800px', mx: 'auto' }}>
                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Verified opportunities so you don&apos;t waste time on sketchy posts
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            All job listings are managed under COLPUNO&apos;s partner network.
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            One profile. Many opportunities. Build once—use it across jobs
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Create your profile once and apply to multiple verified positions seamlessly.
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Smart matching helps the right job find you (instead of endless scrolling)
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Our algorithm matches you with opportunities that align with your skills and preferences.
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Career tools and assessments to help you stand out with confidence
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Access professional development resources and assessments to showcase your strengths.
                        </Typography>
                    </Box>
                </Stack>
            </Stack>

            {/* Trusted network placeholder */}
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant='caption' color='text.secondary' sx={{ fontStyle: 'italic' }}>
                    Trusted network: All job listings are managed under COLPUNO&apos;s partner network.
                </Typography>
            </Box>
        </Box>
    );
}

export default LandingTrust;
