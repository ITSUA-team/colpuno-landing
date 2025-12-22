import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface JobSectionProps {
    title: string;
    icon: ReactNode;
    content: ReactNode;
}

const JobSection = ({ title, icon, content }: JobSectionProps) => (
    <Box
        sx={{
            p: '32px 0',
            display: 'flex',
            gap: { xs: '24px', md: '48px' },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            alignItems: 'start',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '240px', flexShrink: 0 }}>
            <Box
                sx={{
                    minWidth: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'secondary.lighter',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {icon}
            </Box>
            <Typography variant='subtitle1'>{title}</Typography>
        </Box>
        <Box sx={{ width: '100%' }}>
            {content}
        </Box>
    </Box>
);

export default JobSection;
