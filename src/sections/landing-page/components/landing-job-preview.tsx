import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import StyledModal from '../../../components/styled-modal';
import type { Job } from '../../../interfaces';
import { JobOfferService } from '../../../services';
import { trackJobView } from '../utils/tracking';
import LandingJobsCard from './landing-jobs-card';
import LandingJobDetailModal from './landing-job-detail-modal';

function LandingJobPreview() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isRegOpen, setIsRegOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['landingPageJobs'],
        queryFn: () => JobOfferService.getJobOffers('1'),
        staleTime: 5 * 60 * 1000,
    });

    const jobs: Job[] = data?.member?.slice(0, 3) || [];

    const handleJobClick = (job: Job) => {
        trackJobView(job.id);
        setSelectedJob(job);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    rowGap: 2.5,
                    justifyItems: 'center',
                }}
            >
                {(isLoading ? [1, 2, 3] : jobs).map((jobOrIndex, index) => {
                    const job = isLoading
                        ? undefined
                        : (jobOrIndex as Job);

                    if (!job) {
                        return (
                            <Box
                                key={index}
                                sx={{ width: '100%', maxWidth: 420 }}
                            >
                                <Box
                                    sx={{
                                        width: '60%',
                                        height: 16,
                                        bgcolor: 'grey.100',
                                        borderRadius: 1,
                                        mb: 0.5,
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: '50%',
                                        height: 16,
                                        bgcolor: 'grey.100',
                                        borderRadius: 1,
                                        mb: 1,
                                    }}
                                />
                                <Box
                                    sx={{
                                        width: '40%',
                                        height: 14,
                                        bgcolor: 'grey.200',
                                        borderRadius: 999,
                                    }}
                                />
                            </Box>
                        );
                    }

                    return (
                        <Box
                            key={job.id}
                            sx={{ width: '100%' }}
                        >
                            <LandingJobsCard
                                job={job}
                                index={index}
                                onClick={() => handleJobClick(job)}
                                compact
                                variant='preview'
                            />
                        </Box>
                    );
                })}
            </Box>
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
                        setSelectedJob(null);
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
        </>
    );
}

export default LandingJobPreview;
