import { Box, Button, Container, Typography } from '@mui/material';

interface BrainhubVideoSectionProps {
    onStartOnboarding: (trigger: string) => void;
}

function BrainhubVideoSection({ onStartOnboarding }: BrainhubVideoSectionProps) {
    return (
        <>
            {/* First Video Section */}
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
                                mb: 3,
                                fontWeight: 700,
                            }}
                        >
                            Hear directly from Alvin Andrade — your Brainhub mentor.
                        </Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                paddingBottom: '56.25%', // 16:9 aspect ratio
                                height: 0,
                                overflow: 'hidden',
                                 mb: 3,
                            }}
                        >
                            <Box
                                component="video"
                                src="/videos/brainhub_vid.mp4"
                                controls
                                preload="metadata"
                                poster="/videos/brainhub_vid.th.jpg"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                mb: 4,
                                fontWeight: 600,
                            }}
                        >
                            Why he recommends COLPUNO to all Brainhub Reviewees.
                        </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => onStartOnboarding('complete-profile-top')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                mt: 3,
                            }}
                        >
                            Complete Profile
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* Second Video Section */}
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
                                mb: 3,
                                fontWeight: 700,
                            }}
                        >
                            Find out how the right job finds YOU with COLPUNO
                        </Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                paddingBottom: '56.25%', // 16:9 aspect ratio
                                height: 0,
                                overflow: 'hidden',
                                mb: 3,
                            }}
                        >
                            <Box
                                component="video"
                                src="/videos/pioneer_vid_2.mp4"
                                controls
                                preload="metadata"
                                poster="/videos/pioneer_vid.th.jpg"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => onStartOnboarding('complete-profile-bottom')}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                mt: 3,
                            }}
                        >
                            Complete Profile
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default BrainhubVideoSection;

