import { Box, Button, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { StyledModal } from '../../../components';
import { IconBriefcaseTickRed, IconMonyReceiveRed, IconMedalStarRed } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';
import { trackJobModalOpened, trackApplyClicked } from '../utils/tracking';
import JobSection from './job-section';
import JobDescription from './job-description';
import JobSalary from './job-salary';
import JobInfoHero from './job-info-hero';
import JobRequirements from './job-requirements';
import JobWorkplace from './job-workplace';
import JobAdditionalInfo from './job-additional-info';
import JobAdditionalBenefits from './job-additional-benefits';
import CompanyDetails from './company-details';

interface LandingJobDetailModalProps {
    job: Job;
    open: boolean;
    onClose: () => void;
    onApplyClick?: () => void;
}


function LandingJobDetailModal({ job, open, onClose, onApplyClick }: LandingJobDetailModalProps) {
    const user = null;
    const [mainTab, setMainTab] = useState<'job-info' | 'company-details'>('job-info');
    const [detailTab, setDetailTab] = useState<'job-details' | 'requirements' | 'workplace' | 'additional-info'>('job-details');

    useEffect(() => {
        if (open) {
            const jobId = job['@id']?.split('/').pop() || job.id;
            trackJobModalOpened(jobId);
        }
    }, [open, job]);

    const handleApply = () => {
        const jobId = job['@id']?.split('/').pop() || job.id?.toString();
        trackApplyClicked(job.id);
        if (user) {
            window.location.href = `https://www.colpuno.com/jobs/${encodeURIComponent(jobId)}?openConfirmApplication=1`;
        } else {
            // Save jobId to sessionStorage
            if (jobId) {
                sessionStorage.setItem('pendingJobApplication', jobId);
            }
            // Call onApplyClick if provided, otherwise just close
            if (onApplyClick) {
                onApplyClick();
            } else {
                onClose();
            }
        }
    };

    return (
        <StyledModal 
            open={open} 
            onClose={onClose}
            style={{
                width: { xs: '90%', sm: '90%' },
                maxWidth: '1130px',
                p: { xs: '20px', sm: '24px', md: '32px' },
            }}
        >
            <Stack spacing={3}>
                {/* Top Tabs: Job info / Company details */}
                <Tabs
                    value={mainTab}
                    onChange={(e, newValue) => setMainTab(newValue)}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                        },
                    }}
                >
                    <Tab label='Job info' value='job-info' />
                    <Tab label='Company details' value='company-details' />
                </Tabs>

                {mainTab === 'job-info' && (
                    <>
                        {/* Job Info Hero Box */}
                        <JobInfoHero job={job} onApply={handleApply} />

                        {/* Detail Tabs */}
                        <Tabs
                            value={detailTab}
                            onChange={(e, newValue) => setDetailTab(newValue)}
                            variant='scrollable'
                            scrollButtons='auto'
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                '& .MuiTab-root': {
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    minWidth: 'auto',
                                    px: 2,
                                },
                            }}
                        >
                            <Tab label='Job details' value='job-details' />
                            <Tab label='Requirements' value='requirements' />
                            <Tab label='Workplace' value='workplace' />
                            <Tab label='Additional info' value='additional-info' />
                        </Tabs>

                        {/* Detail Content */}
                        <Box
                            sx={{
                                p: { xs: '10px', sm: '15px', lg: '32px' },
                                backgroundColor: 'common.white',
                                borderRadius: '16px',
                                minHeight: 200,
                                maxHeight: '30vh',
                                overflowY: 'scroll',
                            }}
                        >
                            {detailTab === 'job-details' && (
                                <>
                                    <JobSection 
                                        title='Job Basics' 
                                        icon={<IconBriefcaseTickRed />} 
                                        content={<JobDescription job={job} />} 
                                    />
                                    {/* <Divider sx={{ my: 3 }} /> */}
                                    {/* <JobSection 
                                        title='Salary & Benefits' 
                                        icon={<IconMonyReceiveRed />} 
                                        content={<JobSalary jobOffer={job} />} 
                                    /> */}
                                    {/* {job.benefitsDescription && (
                                        <>
                                            <Divider sx={{ my: 3 }} />
                                            <JobSection 
                                                title='Additional Benefits' 
                                                icon={<IconMedalStarRed />} 
                                                content={<JobAdditionalBenefits job={job} />} 
                                            />
                                        </>
                                    )} */}
                                </>
                            )}
                            {detailTab === 'requirements' && (
                                <JobRequirements job={job} />
                            )}
                            {detailTab === 'workplace' && (
                                <JobWorkplace job={job} />
                            )}
                            {detailTab === 'additional-info' && (
                                <JobAdditionalInfo job={job} />
                            )}
                        </Box>
                    </>
                )}

                {mainTab === 'company-details' && (
                    <Box
                        sx={{
                            p: { xs: '10px', sm: '15px', lg: '32px' },
                            backgroundColor: 'common.white',
                            borderRadius: '16px',
                            minHeight: 200,
                        }}
                    >
                        <CompanyDetails job={job} />
                    </Box>
                )}

                {/* Bottom Actions */}
                <Stack direction={{xs: 'column', md: 'row'}} spacing={2}>
                    <Button 
                        variant='outlined' 
                        onClick={onClose} 
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 999,
                            px: 3,
                        }}
                    >
                        Back to jobs
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={handleApply} 
                        fullWidth
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 999,
                            px: 3,
                        }}
                    >
                        Apply
                    </Button>
                </Stack>
            </Stack>
        </StyledModal>
    );
}

export default LandingJobDetailModal;
