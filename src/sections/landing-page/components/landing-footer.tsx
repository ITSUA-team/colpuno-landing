import { Box, Link as MuiLink, Stack, Typography } from '@mui/material';

function LandingFooter() {
    return (
        <Box
            sx={{
                backgroundColor: 'primary.main',
                py: 4,
                mt: 'auto',
            }}
        >
            <Box
                sx={{
                    maxWidth: '1460px',
                    mx: 'auto',
                    px: 2,
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MuiLink href='/privacy-notice' sx={{ color: 'common.white' }}>
                        <Typography variant='body2' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                            Privacy
                        </Typography>
                    </MuiLink>
                    <Typography variant='body2' sx={{ color: 'common.white', display: { xs: 'none', sm: 'block' } }}>
                        •
                    </Typography>
                    <MuiLink href='/terms-and-conditions' sx={{ color: 'common.white' }}>
                        <Typography variant='body2' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                            Terms
                        </Typography>
                    </MuiLink>
                    <Typography variant='body2' sx={{ color: 'common.white', display: { xs: 'none', sm: 'block' } }}>
                        •
                    </Typography>
                    <MuiLink href='/data-legal' sx={{ color: 'common.white' }}>
                        <Typography variant='body2' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                            Data policy
                        </Typography>
                    </MuiLink>
                </Stack>
            </Box>
        </Box>
    );
}

export default LandingFooter;
