import { Box, Button, Container, Typography } from '@mui/material';

interface PioneersCTAProps {
    onStartOnboarding: () => void;
}

function PioneersCTA({ onStartOnboarding }: PioneersCTAProps) {
    return (
        <Box
            component="section"
            className="cta-section"
            sx={{
                py: { xs: 6, md: 8 },
                backgroundColor: 'primary.main',
                color: 'common.white',
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: '28px', md: '36px' },
                            fontWeight: 700,
                            mb: 3,
                            color: 'common.white',
                        }}
                    >
                        Become a COLPUNO Pioneer today!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            mb: 4,
                            color: 'common.white',
                            lineHeight: 1.7,
                        }}
                    >
                        Join the exclusive group of COLPUNO Pioneers and complete your profile to claim your exclusive pioneer status, and explore 5,000+ verified nursing opportunities with trusted recruiters and local employers. Don't miss your chance — <strong>spots are limited!</strong>
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={onStartOnboarding}
                        sx={{
                            mb: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                            backgroundColor: 'common.white',
                            color: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'grey.100',
                            },
                        }}
                    >
                        Join the Pioneers
                    </Button>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'common.white',
                            fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                    >
                        ✓ Free &amp; easy &nbsp;&nbsp;✓ Smart Job Matching &nbsp;&nbsp;✓ Safe &amp; secure
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default PioneersCTA;
