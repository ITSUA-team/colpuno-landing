import { Theme } from '@mui/material/styles';

export function radio(theme: Theme) {
    return {
        MuiRadio: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.secondary,
                    '&.Mui-checked': {
                        color: theme.palette.primary.main,
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    color: theme.palette.text.primary,
                },
            },
        },
    };
}

