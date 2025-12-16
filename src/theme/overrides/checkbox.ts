import { Theme } from '@mui/material/styles';

export function checkbox(theme: Theme) {
    return {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    paddingRight: theme.spacing(1),
                    '&.Mui-checked': {
                        color: (props: any) =>
                            props.color === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main,
                    },
                    '.MuiSvgIcon-root': {
                        width: 19,
                        height: 19,
                        padding: 0,
                    },
                },
            },
        },
    };
}

