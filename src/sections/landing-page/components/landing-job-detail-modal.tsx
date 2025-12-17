import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import AppRegistration from '../../../AppRegistration';
import { StyledModal } from '../../../components';
import type { Job } from '../../../interfaces';

interface LandingJobDetailModalProps {
    job: Job;
    open: boolean;
    onClose: () => void;
}


function LandingJobDetailModal({ job, open, onClose }: LandingJobDetailModalProps) {
    const user = null;
    const [isRegOpen, setIsRegOpen] = useState(false);

    const handleApply = () => {
        if (user) {
            const jobId = job['@id']?.split('/').pop() || job.id;
            window.location.href = `/jobs/${jobId}?openConfirmApplication=1`;
        } else {
            const jobId = job['@id']?.split('/').pop() || job.id;
            sessionStorage.setItem('pendingJobApplication', jobId.toString());
            onClose();
            setIsRegOpen(true);
        }
    };

    const facilityType = job.facilityTypeExperience?.name || 'Not specified';
    const location = job.region?.name || job.country?.name || 'Location TBD';
    const employmentType = job.jobType || 'Full-time';

    const shifts = job.jobShiftPatterns?.map((sp: any) => sp.shiftPattern?.name).filter(Boolean).join(', ') || 'Not specified';

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

    const prcLicense = job.jobRequiredLicences?.some((lic: any) =>
        lic.licence?.name?.toLowerCase().includes('prc')
    ) ? 'Required' : 'Preferred';

    const isEntryLevel = !job.yearsOfExperience || job.yearsOfExperience === 0;

    const experienceRequired = job.yearsOfExperience && job.yearsOfExperience > 0
        ? 'Required'
        : 'Not required';

    const jobSummary = job.description
        ? job.description.split('\n').slice(0, 3).join(' ').substring(0, 200) + '...'
        : 'Job details available after registration.';

    return (
        <StyledModal open={open} onClose={onClose}>
            <Stack spacing={3}>
                {/* Module 2A — Job Detail Modal (copy + structure) */}
                <Box>
                    <Typography variant='h5' sx={{ mb: 1 }}>
                        {job.title}
                    </Typography>
                    <Typography variant='body2'>
                        {location} • {facilityType} • {employmentType}
                    </Typography>
                    {isEntryLevel && (
                        <Box
                            sx={{
                                mt: 1.5,
                                display: 'inline-flex',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 999,
                                bgcolor: 'success.50',
                                color: 'success.800',
                                fontSize: 12,
                                fontWeight: 600,
                            }}
                        >
                            Entry-level friendly — no prior experience required
                        </Box>
                    )}
                </Box>

                <Divider />

                <Box>
                    <Typography variant='subtitle2' sx={{ mb: 1 }}>
                        Snapshot
                    </Typography>
                    <Typography variant='body2'>
                        {jobSummary}
                    </Typography>
                </Box>

                <Box>
                    <Typography variant='subtitle2' sx={{ mb: 1 }}>
                        Quick requirements:
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant='body2'>
                            <strong>PRC License:</strong> {prcLicense}
                        </Typography>
                        <Typography variant='body2'>
                            <strong>Experience:</strong> {experienceRequired}
                        </Typography>
                        <Typography variant='body2'>
                            <strong>Documents:</strong> CV, PRC ID (upload now or later if available)
                        </Typography>
                        {shifts !== 'Not specified' && (
                            <Typography variant='body2'>
                                <strong>Shift:</strong> {shifts}
                            </Typography>
                        )}
                        <Typography variant='body2'>
                            <strong>Start window:</strong> {startWindow}
                        </Typography>
                    </Stack>
                </Box>

                <Box
                    sx={{
                        backgroundColor: 'primary.lighter',
                        p: 2,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant='body2' sx={{ mb: 0.5 }}>
                        What happens next:
                    </Typography>
                    <Typography variant='body2'>
                        Click Apply to start onboarding. After you verify your email and create your account, you&apos;ll
                        return to confirm your application.
                    </Typography>
                </Box>

                {/* Login‑related microcopy скрываем в V1, как обсуждали */}

                <Stack direction='row' spacing={2}>
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
        </StyledModal>
    );
}

export default LandingJobDetailModal;
