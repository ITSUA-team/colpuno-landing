import { Theme } from '@mui/material/styles';

export function stepper(theme: Theme) {
    return {
        MuiStep: {
            styleOverrides: {
                horizontal: {
                    padding: '0px',
                },
            },
        },
        MuiStepConnector: {
            styleOverrides: {
                root: {
                    top: '15px',
                },
                line: {
                    borderColor: theme.palette.grey[300],
                    width: '100%',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'center',
                },
            },
        },
        MuiStepLabel: {
            styleOverrides: {
                label: {
                    color: theme.palette.text.secondary,
                    '&.Mui-active': {
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                    },
                    '&.Mui-completed': {
                        color: theme.palette.text.primary,
                    },
                },
                iconContainer: {
                    paddingRight: '0px',
                },
            },
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    border: '1px solid',
                    borderRadius: '50%',
                    fill: 'transparent',
                    borderColor: theme.palette.grey[300],
                    width: '32px',
                    height: '32px',
                    color: theme.palette.text.secondary,
                    '&.Mui-active': {
                        borderColor: theme.palette.primary.main,
                        fill: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '& .MuiStepIcon-text': {
                            fill: theme.palette.common.white,
                        },
                    },
                    '&.Mui-completed': {
                        borderColor: theme.palette.primary.main,
                        fill: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '& .MuiStepIcon-text': {
                            fill: theme.palette.common.white,
                        },
                    },
                },
            },
        },
    };
}

