import {
    Accordion,
    AccordionDetails,
    AccordionSummary, alpha,
    Box,
    Button,
    Container,
    Link,
    Typography,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { IconAccordionExpended, IconPlus } from '../../../assets';

function LandingFAQ() {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [isRegOpen, setIsRegOpen] = useState(false);

    const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const renderAccordion = (title: string, content: any, panel: string) => (
        <Accordion
            expanded={expanded === panel}
            onChange={handleChange(panel)}
            sx={{
                mb: 2,
                boxShadow: 2,
                borderRadius: 2,
                '&:before': { display: 'none' },
            }}
        >
            <AccordionSummary
                expandIcon={
                    expanded === panel ? (
                        <IconAccordionExpended />
                    ) : (
                        <IconPlus color={theme.palette.primary.main} />
                    )
                }
                sx={{
                    bgcolor: expanded === panel ? alpha(theme.palette.primary.main, 0.08) : theme.palette.grey[100],
                    borderRadius: 2,
                    px: { xs: 2, md: 3 },
                    py: { xs: 1.5, md: 2 },
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 600,
                        color: theme.palette.font.black100,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                    }}
                >
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    px: { xs: 2, md: 3 },
                    py: { xs: 1.5, md: 2 },
                    bgcolor: theme.palette.background.neutral,
                    borderTop: `1px solid ${theme.palette.grey[200]}`,
                }}
            >
                {content}
            </AccordionDetails>
        </Accordion>
    );

    return (
        <Container maxWidth="md">
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        mb: { xs: 4, md: 5 },
                        textAlign: 'center',
                        color: theme.palette.font.black100,
                    }}
                >
                    FAQ
                </Typography>

                <Box mb={{ xs: 6, md: 10 }}>
                    {renderAccordion(
                        'Is COLPUNO a recruitment agency?',
                        <Typography variant="body2" sx={{ color: theme.palette.font.black60 }}>
                            No. COLPUNO is a tech platform and career mentor that helps you build your profile and connect to verified opportunities.
                        </Typography>,
                        'panel0'
                    )}
                    {renderAccordion(
                        'Is this free?',
                        <Typography variant="body2" sx={{ color: theme.palette.font.black60 }}>
                            Yes. Registration is absolutely free.
                        </Typography>,
                        'panel1'
                    )}
                    {renderAccordion(
                        "I'm a fresh grad. Can I still apply?",
                        <Typography variant="body2" sx={{ color: theme.palette.font.black60 }}>
                            Yes. This page is built for newly registered nurses, and job requirements will show if experience is needed.
                        </Typography>,
                        'panel2'
                    )}
                    {renderAccordion(
                        'Why do I need to verify my email?',
                        <Typography variant="body2" sx={{ color: theme.palette.font.black60 }}>
                            To protect your account and keep one profile per person.
                        </Typography>,
                        'panel3'
                    )}
                </Box>

                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        gap: 3,
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            color: theme.palette.font.black100,
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', md: '0.95rem' },
                        }}
                    >
                        Join COLPUNO today and be part of the future of nursing!
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => setIsRegOpen(true)}
                        sx={{
                            width: '100%',
                            fontWeight: 600,
                            fontSize: { xs: '0.875rem', md: '0.95rem' },
                            textTransform: 'none',
                            bgcolor: theme.palette.primary.main,
                            '&:hover': { bgcolor: theme.palette.primary.dark },
                        }}
                    >
                        Get started
                    </Button>

                    <Typography variant="body2" sx={{ color: theme.palette.font.black60 }}>
                        If you have any questions, feel free to contact us:{' '}
                        <Link
                            sx={{ textDecoration: 'none', color: theme.palette.primary.main }}
                            href="mailto:info@colpuno.com"
                        >
                            info@colpuno.com
                        </Link>
                    </Typography>
                </Box>

                <StyledModal
                    open={isRegOpen}
                    onClose={() => setIsRegOpen(false)}
                    smallHeightModal={false}
                    style={{
                        width: { xs: '95%', sm: '90%', md: '750px', lg: '850px' },
                        maxWidth: '900px',
                        p: { xs: 2, sm: 3, md: 3.5 },
                        borderRadius: '16px',
                        maxHeight: { xs: '95vh', md: '90vh' },
                    }}
                >
                    <AppRegistration initialEmail="" embedded />
                </StyledModal>
            </Box>
        </Container>
    );
}

export default LandingFAQ;
