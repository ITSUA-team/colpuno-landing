import { FC } from 'react';

type Props = {
    text?: string;
};

const JobBadge: FC<Props> = ({ text = '5000+ Job Vacancies' }) => {
    return (
        <span style={{
            display: 'inline-block',
            backgroundColor: '#FFD700',
            color: '#003366',
            fontWeight: 700,
            fontSize: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '12px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
        }}>
      {text}
    </span>
    );
};

export default JobBadge;
