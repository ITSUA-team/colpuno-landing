import { Box, Button, Container, Typography } from '@mui/material';
import pciNpcSealImg from '../../../assets/pci-npc-seal.png';

interface BrainhubCTAProps {
    onStartOnboarding: (trigger: string) => void;
}

function BrainhubCTA({ onStartOnboarding }: BrainhubCTAProps) {
    return (
        <Box
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: '#ffffff',
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            mb: 2,
                            fontWeight: 700,
                            color: 'text.primary',
                        }}
                    >
                        Become a COLPUNO Pioneer today - just like thousands of Brainhub nurses!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            mb: 4,
                            fontSize: '1.1rem',
                            lineHeight: 1.8,
                            color: 'text.primary',
                        }}
                    >
                        Join the exclusive group of COLPUNO Pioneers and complete your profile to claim your exclusive pioneer status, and explore 5,000+ verified nursing opportunities with trusted recruiters and local employers. Don't miss your chance — <strong>spots are limited!</strong>
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onStartOnboarding('join-the-pioneers')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 3,
                        }}
                    >
                        Join the Pioneers
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                            fontSize: '0.9rem',
                        }}
                    >
                        <Typography component="span">✓ Free & easy</Typography>
                        <Typography component="span">✓ Smart Job Matching</Typography>
                        <Typography component="span">✓ Safe & secure</Typography>
                        <Box
                            component="a"
                            href={pciNpcSealImg.src}
                            target="_blank"
                            rel="noopener"
                            aria-label="View privacy seal (PCI NPC)"
                            sx={{ display: 'inline-flex', alignItems: 'center' }}
                        >
                            <Box
                                component="img"
                                src={pciNpcSealImg.src}
                                alt="Privacy Seal (PCI NPC)"
                                sx={{
                                    height: '30px',
                                    width: 'auto',
                                    ml: 1,
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default BrainhubCTA;

