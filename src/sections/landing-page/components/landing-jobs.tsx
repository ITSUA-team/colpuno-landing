import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import type { Job } from '../../../interfaces';
import { MOCK_JOBS } from '../../../mock';
import { trackJobView } from '../utils/tracking';
import LandingJobsCard from './landing-jobs-card';
import LandingJobDetailModal from './landing-job-detail-modal';

function LandingJobs() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const currentJobs: Job[] = MOCK_JOBS.slice(0, 10);

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
                    mb: 1,
                    textAlign: 'center',
                }}
            >
                Real jobs ready for newly registered nurses
            </Typography>
            <Typography variant='body1' sx={{ mb: 2, textAlign: 'center' }}>
                These are example Colpuno-style jobs to demonstrate how your listings will look.
            </Typography>
            <Typography variant='body2' sx={{ mb: 4, textAlign: 'center' }}>
                Tap any job to view details. Tap Apply to confirm after signup.
            </Typography>

            <Stack
                direction='column'
                sx={{
                    mb: 3,
                    rowGap: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {currentJobs.map((job, index) => (
                    <Box
                        key={job.id}
                        sx={{
                            width: { xs: '100%', md: '100%' },
                            maxWidth: { xs: '100%', md: '600px' },
                            display: 'flex',
                        }}
                    >
                        <LandingJobsCard
                            job={job}
                            index={index}
                            onClick={() => handleJobClick(job)}
                        />
                    </Box>
                ))}
            </Stack>

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
