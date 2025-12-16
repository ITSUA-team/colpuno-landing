import { Theme } from '@mui/material/styles';

export function textField(theme: Theme) {
    return {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.neutral[300],
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.primary.main,
                    },
                    '& .MuiInputLabel-root': {
                        color: theme.palette.text.secondary,
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.primary.main,
                    },
                    '& .MuiFormHelperText-root': {
                        color: theme.palette.text.secondary,
                    },
                },
            },
        },
    };
}

