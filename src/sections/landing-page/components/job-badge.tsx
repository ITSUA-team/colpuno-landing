import { Box } from '@mui/material';
import { FC } from 'react';

type Props = {
    text?: string;
};

const JobBadge: FC<Props> = ({ text = '5000+ Job Vacancies' }) => {
    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: 999,
                backgroundColor: '#FFD700',
                color: '#003366',
                fontWeight: 700,
                fontSize: { xs: '0.9rem', md: '1rem' },
                py: 1,
                px: 2,
                textAlign: 'center',
            }}
        >
            {text}
        </Box>
    );
};

export default JobBadge;
