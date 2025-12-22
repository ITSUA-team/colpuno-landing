import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';

import type { PageConfig } from '../../../config';
import type { Job } from '../../../interfaces';
import { MOCK_JOBS } from '../../../mock';
import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import { trackJobView, trackCtaUnlockJobsClicked, trackApplyClicked } from '../utils/tracking';
import LandingJobsCard from './landing-jobs-card';
import LandingJobDetailModal from './landing-job-detail-modal';

interface LandingJobsProps {
    config: PageConfig;
}

function LandingJobs({ config }: LandingJobsProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [tab, setTab] = useState<string>(config.jobs.tabs.tab1Value);
    const allJobs: Job[] = MOCK_JOBS;

    // Filter jobs based on page variant and tab
    const getJobsForTab = (tabValue: string): Job[] => {
        let filteredJobs;
        
        if (tabValue === 'national') {
            filteredJobs = allJobs.filter(job => config.jobs.national.includes(job.id));
        } else {
            filteredJobs = allJobs.filter(job => config.jobs.international.includes(job.id));
        }
        
        return filteredJobs;
    };

    const currentJobs = getJobsForTab(tab);

    const handleTabChange = (_e: SyntheticEvent, value: string) => {
        setTab(value);
        setSelectedJob(null);
    };

    const handleJobClick = (job: Job) => {
        trackJobView(job.id);
        setSelectedJob(job);
    };

    const handleApplyClick = (job: Job) => {
        const jobId = job['@id']?.split('/').pop() || job.id?.toString();
        trackApplyClicked(job.id);
        // Save jobId to sessionStorage so AppRegistration can read it
        if (jobId) {
            window.sessionStorage.setItem('pendingJobApplication', jobId);
        }
        setIsRegOpen(true);
    };

    const formatJobCard = (job: Job) => {
        const facilityType = job.facilityTypeExperience?.name || 'Not specified';
        const location = job.region?.name || job.country?.name || 'Location TBD';
        const shifts = job.jobShiftPatterns?.map((sp: any) => sp.shiftPattern?.name).filter(Boolean).join(', ') || null;

        const startDate = job.startDate;
        let startWindow = 'TBD';
        if (startDate) {
            const date = new Date(startDate);
            const now = new Date();
            const diffMonths = (date.getFullYear() - now.getFullYear()) * 12 + (date.getMonth() - now.getMonth());
            if (diffMonths <= 0) {
                startWindow = 'Immediate';
            } else if (diffMonths <= 1) {
                startWindow = 'This month';
            } else if (diffMonths <= 3) {
                startWindow = 'Q1';
            }
        }

        return { facilityType, location, shifts, startWindow };
    };

    return (
        <Box>
            <Typography
                variant='h4'
                sx={{
                    fontSize: { xs: '24px', md: '32px' },
                    fontWeight: 700,
                    mb: 1,
                    textAlign: 'center',
                }}
            >
                {config.jobs.title}
            </Typography>
            <Tabs
                value={tab}
                onChange={handleTabChange}
                centered
                sx={{
                    mb: 2,
                    maxWidth: {xs: '90vw', md: 'inherit'}
                }}
            >
                <Tab
                    label={config.jobs.tabs.tab1Label}
                    value={config.jobs.tabs.tab1Value}
                    sx={{ textTransform: 'none' }}
                />
                <Tab
                    label={config.jobs.tabs.tab2Label}
                    value={config.jobs.tabs.tab2Value}
                    sx={{ textTransform: 'none' }}
                />
            </Tabs>
            {/* Module 2 — Jobs Preview on Page (copy from spec) */}
            <Typography variant='body1' sx={{ mb: 2, textAlign: 'center' }}>
                Start onboarding to unlock full details and apply.
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                    position: 'relative',
                    minHeight: 400,
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: '100%',
                            maxWidth: '1200px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { 
                                    xs: '1fr', 
                                    sm: 'repeat(2, 1fr)', 
                                    md: 'repeat(2, 1fr)' 
                                },
                                gap: { xs: 2, sm: 2.5, md: 3 },
                                width: '100%',
                            }}
                        >
                            {currentJobs.map((job, index) => (
                                <Box key={job.id}>
                                    <LandingJobsCard
                                        job={job}
                                        index={index}
                                        onClick={() => handleJobClick(job)}
                                        onApplyClick={() => handleApplyClick(job)}
                                    />
                                </Box>
                            ))}
                            
                            {/* Teaser card - контейнер на всю ширину с заблюренной карточкой внутри */}
                            <Box
                                sx={{
                                    gridColumn: { 
                                        xs: '1 / -1', 
                                        sm: '1 / -1', 
                                        md: '1 / -1' 
                                    },
                                    position: 'relative',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 200,
                                }}
                            >
                                {/* Заблюренная карточка джобы обычного размера (центрированная) */}
                                <Box
                                    sx={{
                                        filter: 'blur(3px)',
                                        pointerEvents: 'none',
                                        opacity: 0.6,
                                        width: '100%',
                                        maxWidth: {
                                            xs: '100%',
                                            sm: 'calc(50% - 12px)',
                                            md: 'calc(50% - 18px)',
                                        },
                                    }}
                                >
                                    {currentJobs.length > 0 && (
                                        <LandingJobsCard
                                            job={currentJobs[currentJobs.length - 1]}
                                            index={currentJobs.length - 1}
                                            onClick={() => {}}
                                        />
                                    )}
                                </Box>
                                
                                {/* Оверлей с тизером */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        px: { xs: 1.5, md: 2 },
                                        pointerEvents: 'none',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            maxWidth: 420,
                                            width: '100%',
                                            borderRadius: 2,
                                            bgcolor: 'common.white',
                                            boxShadow: 4,
                                            p: { xs: 2, md: 2.5 },
                                            textAlign: 'center',
                                            pointerEvents: 'auto',
                                        }}
                                    >
                                        <Typography
                                            variant='subtitle1'
                                            sx={{
                                                fontWeight: 600,
                                                mb: 1,
                                            }}
                                        >
                                            More jobs are available after signup (*)
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            sx={{
                                                mb: 2,
                                            }}
                                        >
                                            Register to unlock more listings and apply faster.
                                        </Typography>
                                        <Button
                                            type='submit'
                                            variant='contained'
                                            size='small'
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                            onClick={() => {
                                                trackCtaUnlockJobsClicked();
                                                const hero = document.getElementById('landing-hero');
                                                if (hero) {
                                                    hero.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    window.location.href = '/register';
                                                }
                                            }}
                                        >
                                            Unlock jobs
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </motion.div>
                </AnimatePresence>
            </Box>

            <Typography variant='body1' sx={{ mb: 2, fontSize: '0.75rem', textAlign: 'center' }}>
                *** Job openings from DMW-accredited recruiters & national top-tier hospitals verified via rocketnurse.ph or via external sources.
            </Typography>

            {selectedJob && (
                <LandingJobDetailModal
                    job={selectedJob}
                    open={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                    onApplyClick={() => {
                        const jobId = selectedJob['@id']?.split('/').pop() || selectedJob.id?.toString();
                        if (jobId) {
                            window.sessionStorage.setItem('pendingJobApplication', jobId);
                        }
                        // Close job detail modal first
                        setSelectedJob(null);
                        // Then open registration modal with a small delay to ensure smooth transition
                        setTimeout(() => {
                            setIsRegOpen(true);
                        }, 100);
                    }}
                />
            )}

            <StyledModal
                open={isRegOpen}
                onClose={() => {
                    setIsRegOpen(false);
                }}
                smallHeightModal={false}
                noCloseIcon
                style={{
                    width: { xs: 'calc(100vw - 32px)', sm: '90%', md: '750px', lg: '850px' },
                    maxWidth: '900px',
                    p: 0,
                    borderRadius: '16px',
                    height: { xs: '95vh', md: 'auto' },
                    maxHeight: { xs: '95vh', md: '90vh' },
                    overflow: 'hidden',
                    backgroundColor: 'transparent',
                }}
            >
                <AppRegistration initialEmail="" embedded onClose={() => setIsRegOpen(false)} />
            </StyledModal>
        </Box>
    );
}

export default LandingJobs;
