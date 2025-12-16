import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
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

    const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const renderAccordion = (title: string, content: any, panel: string) => (
        <Accordion
            expanded={expanded === panel}
            onChange={handleChange(panel)}
        >
            <AccordionSummary
                expandIcon={expanded === panel ? <IconAccordionExpended /> : <IconPlus color={theme.palette.primary.dark} />}
            >
                <Typography variant='body1'>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{content}</AccordionDetails>
        </Accordion>
    );

    return (
        <Container maxWidth='md'>
            <Box sx={{ maxWidth: '548px', margin: '0 auto 80px' }}>
                <Typography variant='h3' sx={{ mb: 5 }}>
                    FAQ
                </Typography>
                <Box mb={10}>
                    {renderAccordion(
                        'Is COLPUNO a recruitment agency?',
                        <Typography variant='body1'>
                            No. COLPUNO is a tech platform and career mentor that helps you build your profile and connect to verified opportunities.
                        </Typography>,
                        'panel0',
                    )}
                    {renderAccordion(
                        'Is this free?',
                        <Typography variant='body1'>
                            Yes. Registration is absolutely free.
                        </Typography>,
                        'panel1',
                    )}
                    {renderAccordion(
                        'I\'m a fresh grad. Can I still apply?',
                        <Typography variant='body1'>
                            Yes. This page is built for newly registered nurses, and job requirements will show if experience is needed.
                        </Typography>,
                        'panel2',
                    )}
                    {renderAccordion(
                        'Why do I need to verify my email?',
                        <Typography variant='body1'>
                            To protect your account and keep one profile per person.
                        </Typography>,
                        'panel3',
                    )}
                </Box>
                <Box
                    sx={{
                        textAlign: 'center',
                        display: 'flex',
                        gap: '24px',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant='subtitle2'>
                        Join COLPUNO today and be part of the future of nursing!
                    </Typography>
                    <Button
                        variant='contained'
                        size='large'
                        onClick={() => setIsRegOpen(true)}
                        sx={{
                            width: '100%',
                        }}
                    >
                        Get started
                    </Button>
                    <Typography variant='body1'>
                        If you have any questions, feel free to contact us:{' '}
                        <Link
                            sx={{
                                textDecoration: 'none',
                            }}
                            href='mailto:info@colpuno.com'
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
                    p: { xs: 1.5, sm: 2, md: 2.5 },
                    borderRadius: '16px',
                    maxHeight: { xs: '95vh', md: '90vh' },
                }}
            >
                <AppRegistration initialEmail='' embedded />
            </StyledModal>
        </Box>
        </Container>
    );
}

export default LandingFAQ;
