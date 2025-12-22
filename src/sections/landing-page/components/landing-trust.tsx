import { Box, Stack, Typography } from '@mui/material';
import IconCheckCircle from 'src/assets/icon-components/icon-check-circle';
import type { PageConfig } from '../../../config';

interface LandingTrustProps {
    config: PageConfig;
}

/**
 * LandingTrust component - Why COLPUNO trust block
 */
function LandingTrust({ config }: LandingTrustProps) {
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
                {config.trust.title}
            </Typography>

            <Stack spacing={3} sx={{ maxWidth: '800px', mx: 'auto' }}>
                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Verified opportunities—shared only in a nurse-only, protected space
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            All roles are vetted through COLPUNO’s partner network, so you can apply with confidence (no sketchy posts).
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            One nurse profile for your whole career. Build once, apply anywhere
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Create your profile once (CV, credentials, preferences) and use it to apply to multiple verified roles in minutes.
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Jobs find you. Smart matching based on your profile and preferences
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Instead of endless scrolling, COLPUNO matches you with opportunities aligned to your skills, location, and goals.
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' spacing={2} alignItems='flex-start'>
                    <IconCheckCircle sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }} />
                    <Box>
                        <Typography variant='subtitle1' fontWeight={600} sx={{ mb: 0.5 }}>
                            Long-term career support to help you grow and stand out
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            Use career tools and assessments to strengthen your profile, showcase your strengths, and plan your next steps.
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
