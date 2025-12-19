import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { SyntheticEvent, useState } from 'react';

import type { Job } from '../../../interfaces';
import { MOCK_JOBS } from '../../../mock';
import { trackJobView } from '../utils/tracking';
import LandingJobsCard from './landing-jobs-card';
import LandingJobDetailModal from './landing-job-detail-modal';

function LandingJobs() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    // Simple tabs per spec: National (PH) | International (Preview)
    const [tab, setTab] = useState<'national' | 'international'>('national');
    const allJobs: Job[] = MOCK_JOBS;

    // Backend note: в реальных данных различие National/International будет по country.name или похожему полю.
    const nationalJobs: Job[] = allJobs.filter(
        (job) => job.country?.name === 'Philippines',
    ).slice(0, 10);

    let internationalJobs: Job[] = allJobs.filter(
        (job) => job.country && job.country.name !== 'Philippines',
    ).slice(0, 10);

    // Mock‑fallback: если нет реальных international в моках, показываем "preview" как вторую выборку из того же списка
    if (internationalJobs.length === 0 && allJobs.length > 0) {
        const half = Math.floor(allJobs.length / 2) || 1;
        internationalJobs = allJobs.slice(half, half + 10);
    }

    const currentJobs: Job[] = (tab === 'national' ? nationalJobs : internationalJobs).slice(0, 10);

    const handleTabChange = (_e: SyntheticEvent, value: 'national' | 'international') => {
        setTab(value);
        setSelectedJob(null);
    };

    const handleJobClick = (job: Job) => {
        trackJobView(job.id);
        setSelectedJob(job);
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
                Real jobs ready for newly registered nurses
            </Typography>
            <Tabs
                value={tab}
                onChange={handleTabChange}
                centered
                sx={{ mb: 2 }}
            >
                <Tab
                    label='National (PH)'
                    value='national'
                    sx={{ textTransform: 'none' }}
                />
                <Tab
                    label='International (Preview)'
                    value='international'
                    sx={{ textTransform: 'none' }}
                />
            </Tabs>
            {/* Module 2 — Jobs Preview on Page (copy from spec) */}
            <Typography variant='body1' sx={{ mb: 2, textAlign: 'center' }}>
                Start onboarding to unlock full details and apply.
            </Typography>
            <Typography variant='body2' sx={{ mb: 4, textAlign: 'center' }}>
                Tap any job to view details. Tap Apply to continue after signup.
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
                                            More jobs are available after signup
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
                                            variant='contained'
                                            color='primary'
                                            size='small'
                                            sx={{
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                            onClick={() => {
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

            {selectedJob && (
                <LandingJobDetailModal
                    job={selectedJob}
                    open={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </Box>
    );
}

export default LandingJobs;
