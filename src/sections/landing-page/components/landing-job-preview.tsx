import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import type { Job } from '../../../interfaces';
import { JobOfferService } from '../../../services';
import { trackJobView } from '../utils/tracking';
import LandingJobsCard from './landing-jobs-card';
import LandingJobDetailModal from './landing-job-detail-modal';

function LandingJobPreview() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
                />
            )}
        </>
    );
}

export default LandingJobPreview;
