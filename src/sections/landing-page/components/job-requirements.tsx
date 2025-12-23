import { Divider, Stack, Typography } from '@mui/material';

import { IconCheckCircleRed, IconMedalStar, IconTaskFillRed, IconTeacherCapRed } from '../../../assets/icon-components';
import type { Job } from '../../../interfaces';
import JobSection from './job-section';

interface JobRequirementsProps {
    job: Job;
}

const JobRequirements = ({ job }: JobRequirementsProps) => {
    const prcLicense = job.jobRequiredLicences?.some((lic: any) =>
        lic.licence?.name?.toLowerCase().includes('prc')
    ) ? 'Required' : 'Preferred';

    const experienceRequired = job.yearsOfExperience && job.yearsOfExperience > 0
        ? `${job.yearsOfExperience} years required`
        : 'Not required';

    const shifts = job.jobShiftPatterns?.map((sp: any) => sp.shiftPattern?.name).filter(Boolean).join(', ') || 'Not specified';

    // Licenses & Certificates Content
    const licensesContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                <Typography variant='body1'>PRC License: </Typography>
                <Typography variant='body1' fontWeight={700}>
                    {prcLicense}
                </Typography>
            </Stack>

            {job.jobRequiredLicences && job.jobRequiredLicences.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Required Licenses: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobRequiredLicences.map((lic: any, index: number) => (
                            <span key={index}>
                                {lic.licence?.name || lic.name}
                                {index < job.jobRequiredLicences.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}

            {job.jobRequiredCertificates && job.jobRequiredCertificates.length > 0 && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant='body1'>Required Certificates: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.jobRequiredCertificates.map((cert: any, index: number) => (
                            <span key={index}>
                                {cert.certificate?.name || cert.name}
                                {index < job.jobRequiredCertificates.length - 1 && ', '}
                            </span>
                        ))}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );

    // Experience & Qualifications Content
    const experienceContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                <Typography variant='body1'>Experience: </Typography>
                <Typography variant='body1' fontWeight={700}>
                    {experienceRequired}
                </Typography>
            </Stack>

            {job.degreeLevel && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Degree Level: </Typography>
                    <Typography variant='body1' fontWeight={700} sx={{ textTransform: 'capitalize' }}>
                        {job.degreeLevel}
                    </Typography>
                </Stack>
            )}

            {/* {job.maxGapInPractice !== undefined && job.maxGapInPractice !== null && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Max Gap in Practice: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.maxGapInPractice} months
                    </Typography>
                </Stack>
            )} */}

            {/* {job.isLeadershipRole !== undefined && (
                <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                    <Typography variant='body1'>Leadership Role: </Typography>
                    <Typography variant='body1' fontWeight={700}>
                        {job.isLeadershipRole ? 'Yes' : 'No'}
                    </Typography>
                </Stack>
            )} */}
        </Stack>
    );

    // Shift Patterns Content
    const shiftsContent = (
        <Stack sx={{ gap: '16px', width: '100%' }}>
            <Stack sx={{ flexDirection: 'row', gap: '8px', width: '100%', alignItems: 'center' }}>
                <Typography variant='body1'>Shift: </Typography>
                <Typography variant='body1' fontWeight={700}>
                    {shifts}
                </Typography>
            </Stack>
        </Stack>
    );

    const hasShifts = shifts !== 'Not specified';

    return (
        <Stack spacing={0}>
            <JobSection 
                title='Licenses & Certificates' 
                icon={<IconCheckCircleRed />} 
                content={licensesContent} 
            />
            
            <Divider sx={{ my: 3 }} />
            
            <JobSection 
                title='Experience & Qualifications' 
                icon={<IconTeacherCapRed />} 
                content={experienceContent} 
            />

            {hasShifts && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <JobSection 
                        title='Shift Patterns' 
                        icon={<IconTaskFillRed />} 
                        content={shiftsContent} 
                    />
                </>
            )}
        </Stack>
    );
};

export default JobRequirements;
