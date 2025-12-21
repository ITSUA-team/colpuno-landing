import { Box, Link as MuiLink, Stack, Typography, useTheme } from '@mui/material';

function LandingFooter() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                py: { xs: 3, md: 4 },
                mt: 6,
            }}
        >
            <Box
                sx={{
                    maxWidth: 1460,
                    mx: 'auto',
                    px: { xs: 2, md: 3 },
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <MuiLink href="https://www.colpuno.com/terms-and-conditions" sx={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.font.white100,
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Terms & Conditions
                        </Typography>
                    </MuiLink>

                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.font.white100,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        •
                    </Typography>

                    <MuiLink href="https://www.colpuno.com/privacy-notice" sx={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.font.white100,
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Privacy Notice
                        </Typography>
                    </MuiLink>

                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.font.white100,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        •
                    </Typography>

                    <MuiLink href="https://www.colpuno.com/disclaimer" sx={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.font.white100,
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Disclaimer
                        </Typography>
                    </MuiLink>

                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.font.white100,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        •
                    </Typography>

                    <MuiLink href="https://www.colpuno.com/imprint" sx={{ textDecoration: 'none' }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: theme.palette.font.white100,
                                '&:hover': { textDecoration: 'underline' },
                            }}
                        >
                            Imprint
                        </Typography>
                    </MuiLink>
                </Stack>
            </Box>
        </Box>
    );
}

export default LandingFooter;
