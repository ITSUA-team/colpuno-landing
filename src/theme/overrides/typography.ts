import { Theme } from '@mui/material/styles';

export function typography(theme: Theme) {
    return {
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: theme.palette.font.black100,
                },
                paragraph: {
                    marginBottom: theme.spacing(2),
                },
                gutterBottom: {
                    marginBottom: theme.spacing(1),
                },
            },
        },
    };
}

