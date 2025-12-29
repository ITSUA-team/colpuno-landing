import { Box, Button, Container, Typography } from '@mui/material';
import { useState } from 'react';

// Video component with image placeholder
// Video file: public/videos/pioneer_vid_2.mp4 (when available)
// Placeholder image: public/videos/pioneer_vid.th.jpg

interface PioneersVideoProps {
    onStartOnboarding: () => void;
}

function PioneersVideo({ onStartOnboarding }: PioneersVideoProps) {
    const [videoError, setVideoError] = useState(false);
    
    // Video and placeholder paths
    const videoSrc = '/videos/pioneer_vid_2.mp4';
    const placeholderSrc = '/videos/pioneer_vid.th.jpg';

    return (
        <Box
            component="section"
            id="single-video"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: 'background.default',
            }}
        >
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: { xs: '24px', md: '32px' },
                            fontWeight: 700,
                            mb: 4,
                            color: 'text.primary',
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
                            borderRadius: 2,
                            mb: 4,
                            backgroundColor: 'grey.900',
                        }}
                    >
                        {/* Background image as poster */}
                        <Box
                            component="img"
                            src={placeholderSrc}
                            alt="Find out how the right job finds YOU with COLPUNO"
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: 1,
                            }}
                        />
                        {/* Video element with controls always visible */}
                        <Box
                            component="video"
                            src={videoError ? undefined : videoSrc}
                            poster={placeholderSrc}
                            controls
                            controlsList="nodownload"
                            preload="metadata"
                            playsInline
                            onLoadedData={() => {
                                setVideoError(false);
                            }}
                            onError={() => {
                                setVideoError(true);
                            }}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                zIndex: 2,
                                backgroundColor: 'transparent',
                                '&::-webkit-media-controls-panel': {
                                    display: 'flex !important',
                                    opacity: 1,
                                },
                            }}
                        />
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={onStartOnboarding}
                        sx={{
                            mt: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                            py: 1.5,
                            fontSize: { xs: '1rem', md: '1.125rem' },
                        }}
                    >
                        Complete Profile
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default PioneersVideo;
