import { Theme } from '@mui/material/styles';

export function chip(theme: Theme) {
    return {
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-outlined': {
                        borderColor: theme.palette.neutral[300],
                        color: theme.palette.text.primary,
                    },
                    '&.MuiChip-filled': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                    },
                },
            },
        },
    };
}

