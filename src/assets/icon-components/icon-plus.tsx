import { SvgIcon } from '@mui/material';

const IconPlus = ({ color = '#102977', ...props }: any) => (
    <SvgIcon {...props} viewBox='0 0 24 24' sx={{ color }}>
        <path d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' fill='currentColor' />
    </SvgIcon>
);

export default IconPlus;

