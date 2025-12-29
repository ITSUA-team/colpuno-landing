import { Box, Button, Container, Typography } from '@mui/material';

interface BrainhubMainContentProps {
    onStartOnboarding: (trigger: string) => void;
}

function BrainhubMainContent({ onStartOnboarding }: BrainhubMainContentProps) {
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
                            mb: 3,
                            fontWeight: 700,
                            color: 'primary.main',
                        }}
                    >
                        A special invitation from Brainhub to all newly passed PNLE nurses
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
                        You've reached a milestone many dream of. Now let your future open up.
                        <br />
                        <br />
                        Brainhub invites you to join the <strong>COLPUNO Pioneer Group</strong> — a select circle of Filipino nurses with privileged early access to COLPUNO's career tools and over <strong>5,000 verified job openings</strong> in <strong>COLPUNO's special Beta Phase</strong>.
                        <br />
                        <br />
                        Created for Filipino nurses. Trusted by your Brainhub family. Designed to guide your next step with clarity, confidence, and care.
                        <br />
                        <br />
                        Your journey continues here. All free of charge!
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => onStartOnboarding('let-the-job-find-you')}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            mb: 4,
                        }}
                    >
                        LET THE JOB FIND YOU
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default BrainhubMainContent;

