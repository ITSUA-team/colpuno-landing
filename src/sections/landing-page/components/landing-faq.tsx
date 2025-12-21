import {
    Accordion,
    AccordionDetails,
    AccordionSummary, alpha,
    Box,
    Container,
    Typography,
    Link,
    useTheme,
} from '@mui/material';
import { useState } from 'react';

import { IconAccordionExpended, IconPlus } from '../../../assets';

function LandingFAQ() {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>(false);

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
                overflow: 'hidden',
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
                        fontSize: { xs: '24px', md: '32px' },
                        fontWeight: 700,
                        mb: { xs: 4, md: 5 },
                        textAlign: 'center',
                        color: theme.palette.font.black100,
                    }}
                >
                    FAQ
                </Typography>

                <Box mb={{ xs: 6, md: 6 }}>
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

                <Typography variant='body1' mb={{ xs: 6, md: 6 }} textAlign='center'>
                    More questions? Check our full FAQs: <Link href="https://www.colpuno.com/faq">https://www.colpuno.com/faq</Link>
                </Typography>
            </Box>
        </Container>
    );
}

export default LandingFAQ;
