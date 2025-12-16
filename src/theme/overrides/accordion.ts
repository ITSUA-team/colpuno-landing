import { Theme } from '@mui/material/styles';
import { typographyClasses } from '@mui/material/Typography';
import { accordionClasses } from '@mui/material/Accordion';
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

export function accordion(theme: Theme & { customShadows?: { z8?: string } }) {
    return {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: theme.palette.primary.lighter,
                    [`&.${accordionClasses.expanded}`]: {
                        boxShadow: theme.customShadows?.z8 || 'none',
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: theme.palette.background.paper,
                    },
                    [`&.${accordionClasses.disabled}`]: {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(1),
                    padding: '8px 20px',
                    borderTopLeftRadius: theme.shape.borderRadius,
                    borderTopRightRadius: theme.shape.borderRadius,
                    color: theme.palette.text.primary,
                    [`& .${typographyClasses.root}`]: {
                        color: theme.palette.text.primary,
                    },
                    [`&.${accordionSummaryClasses.expanded}`]: {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        [`& .${typographyClasses.root}`]: {
                            color: theme.palette.common.white,
                        },
                    },
                    [`&.${accordionSummaryClasses.disabled}`]: {
                        opacity: 1,
                        color: theme.palette.action.disabled,
                        [`& .${typographyClasses.root}`]: {
                            color: 'inherit',
                        },
                    },
                },
                expandIconWrapper: {
                    color: 'inherit',
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '20px',
                },
                expandIconWrapper: {
                    color: 'inherit',
                },
            },
        },
    };
}

