import { AppBar, Box, Container, Link, Stack, Typography } from '@mui/material';
import Logo from '../../../assets/logo-white.png';

function PioneersHeader() {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'primary.main',
                boxShadow: 'none',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        py: { xs: 2, md: 3 },
                    }}
                >
                    <Box
                        component="img"
                        src={Logo.src}
                        alt="COLPUNO"
                        sx={{
                            height: { xs: 40, md: 50 },
                            objectFit: 'contain',
                        }}
                    />
                    <Stack
                        direction="row"
                        spacing={{ xs: 2, md: 3 }}
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        <Link
                            href="#home"
                            sx={{
                                color: 'common.white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Home
                        </Link>
                        <Link
                            href="https://www.colpuno.com/login"
                            target="_blank"
                            sx={{
                                color: 'common.white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Login
                        </Link>
                        <Link
                            href="https://www.colpuno.com/"
                            target="_blank"
                            sx={{
                                color: 'common.white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            About
                        </Link>
                        <Link
                            href="https://www.colpuno.com/faq"
                            target="_blank"
                            sx={{
                                color: 'common.white',
                                textDecoration: 'none',
                                fontWeight: 500,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            FAQ
                        </Link>
                    </Stack>
                </Box>
            </Container>
        </AppBar>
    );
}

export default PioneersHeader;
