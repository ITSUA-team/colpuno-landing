import { Box, Stack, Typography, useTheme } from '@mui/material';
import { IconCheckCircle } from '../../../assets';

function LandingTrust() {
    const theme = useTheme();

    const bullets = [
        {
            title: "Verified opportunities so you don't waste time on sketchy posts",
            subtitle: "All job listings are managed under COLPUNO's partner network.",
        },
        {
            title: "One profile. Many opportunities. Build once—use it across jobs",
            subtitle: "Create your profile once and apply to multiple verified positions seamlessly.",
        },
        {
            title: "Smart matching helps the right job find you (instead of endless scrolling)",
            subtitle: "Our algorithm matches you with opportunities that align with your skills and preferences.",
        },
        {
            title: "Career tools and assessments to help you stand out with confidence",
            subtitle: "Access professional development resources and assessments to showcase your strengths.",
        },
    ];

    return (
        <Box sx={{ py: { xs: 4, md: 8 } }}>
            <Typography
                variant="h4"
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    mb: { xs: 4, md: 6 },
                    textAlign: 'center',
                    fontWeight: 600,
                    color: theme.palette.font.black100,
                }}
            >
                Built for Filipino nurses. Designed for safety.
            </Typography>

            <Stack spacing={{ xs: 4, md: 6 }} sx={{ maxWidth: 800, mx: 'auto' }}>
                {bullets.map((item, index) => (
                    <Box key={index} sx={{ textAlign: 'center' }}>
                        <IconCheckCircle sx={{ color: theme.palette.primary.main, fontSize: 32, mb: 1 }} />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                mb: 0.5,
                                fontWeight: 600,
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                color: theme.palette.font.black100,
                            }}
                        >
                            {item.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.font.black60,
                                fontSize: { xs: '0.875rem', md: '0.95rem' },
                            }}
                        >
                            {item.subtitle}
                        </Typography>
                    </Box>
                ))}
            </Stack>

            <Box sx={{ mt: { xs: 3, md: 4 }, textAlign: 'center' }}>
                <Typography
                    variant="caption"
                    sx={{
                        fontStyle: 'italic',
                        color: theme.palette.font.black60,
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                    }}
                >
                    Trusted network: All job listings are managed under COLPUNO&apos;s partner network.
                </Typography>
            </Box>
        </Box>
    );
}

export default LandingTrust;
