import { Theme } from '@mui/material/styles';

export function formLabel(theme: Theme) {
    return {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.text.primary,
                    '&.Mui-focused': {
                        color: theme.palette.primary.main,
                    },
                },
            },
        },
    };
}

