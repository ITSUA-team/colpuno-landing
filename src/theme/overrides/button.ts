import { alpha, Theme } from '@mui/material/styles';
import { ButtonProps, buttonClasses } from '@mui/material/Button';
import { getColor, COLORS } from '../../utils/colorsUtils';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        soft: true;
        gradient: true;
    }
}

export function button(theme: Theme) {
    const lightMode = theme.palette.mode === 'light';

    const rootStyles = (ownerState: ButtonProps) => {
        const containedVariant = ownerState.variant === 'contained';
        const textVariant = ownerState.variant === 'text';
        const softVariant = ownerState.variant === 'soft';
        const outlinedVariant = ownerState.variant === 'outlined';
        const gradientVariant = ownerState.variant === 'gradient';
        const smallSize = ownerState.size === 'small';
        const mediumSize = ownerState.size === 'medium';
        const largeSize = ownerState.size === 'large';
        const primaryColor = ownerState.color === 'primary';
        const secondaryColor = ownerState.color === 'secondary';

        const defaultStyle = {
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },

            ...(softVariant && {
                color: theme.palette.text.primary,
                backgroundColor: alpha(theme.palette.grey[500], 0.08),
                '&:hover': {
                    backgroundColor: alpha(theme.palette.grey[500], 0.24),
                },
            }),

            ...(gradientVariant && {
                color: theme.palette.common.white,
                background: `linear-gradient(270deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 33%, ${theme.palette.secondary.main} 66%, ${theme.palette.primary.main} 100%)`,
                backgroundSize: '300% 300%',
                transition: 'background 0.3s ease',
                '@keyframes gradientShift': {
                    '0%': {
                        backgroundPosition: '0% 50%',
                    },
                    '50%': {
                        backgroundPosition: '100% 50%',
                    },
                    '100%': {
                        backgroundPosition: '0% 50%',
                    },
                },
                '&:hover': {
                    animation: 'gradientShift 5s ease infinite',
                },
            }),

            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
        };

        const colorStyle = COLORS.map(color => ({
            ...(ownerState.color === color && {
                ...(containedVariant && {
                    backgroundColor: getColor({
                        primaryColor,
                        secondaryColor,
                        themePrimaryColor: theme.palette.primary.main,
                        themeSecondaryColor: theme.palette.secondary.main,
                        fallbackColor: theme.palette.primary.main,
                    }),
                    '&:hover': {
                        backgroundColor: getColor({
                            primaryColor,
                            secondaryColor,
                            themePrimaryColor: theme.palette.primary.dark,
                            themeSecondaryColor: theme.palette.secondary.dark,
                            fallbackColor: theme.palette.primary.main,
                        }),
                    },
                }),
                ...(softVariant && {
                    color: theme.palette[color][lightMode ? 'dark' : 'light'],
                    backgroundColor: alpha(theme.palette[color].main, 0.16),
                    '&:hover': {
                        backgroundColor: alpha(theme.palette[color].main, 0.32),
                    },
                }),
                ...(textVariant && {
                    color: getColor({
                        primaryColor,
                        secondaryColor,
                        themePrimaryColor: theme.palette.neutral[500],
                        themeSecondaryColor: theme.palette.primary.main,
                        fallbackColor: theme.palette[color].main,
                    }),
                    '&:hover': {
                        backgroundColor: getColor({
                            primaryColor,
                            secondaryColor,
                            themePrimaryColor: alpha(theme.palette.neutral[600], 0.16),
                            themeSecondaryColor: alpha(theme.palette.primary.main, 0.16),
                            fallbackColor: alpha(theme.palette[color].main, 0.16),
                        }),
                    },
                }),
            }),
        }));

        const disabledState = {
            [`&.${buttonClasses.disabled}`]: {
                color: theme.palette.neutral[400],
                ...(containedVariant && {
                    backgroundColor: theme.palette.neutral[300],
                }),
                ...(outlinedVariant && {
                    borderColor: theme.palette.neutral[400],
                }),
            },
        };

        const size = {
            ...(smallSize && {
                height: 32,
                fontSize: 14,
                fontWeight: 600,
                paddingLeft: 12,
                paddingRight: 12,
                minWidth: 64,
                borderRadius: 16,
            }),
            ...(mediumSize && {
                height: 36,
                paddingLeft: 14,
                paddingRight: 14,
                fontSize: 14,
                fontWeight: 600,
                minWidth: 72,
                borderRadius: 18,
            }),
            ...(largeSize && {
                height: 44,
                fontSize: 14,
                fontWeight: 600,
                paddingLeft: 14,
                paddingRight: 14,
                minWidth: 88,
                borderRadius: 24,
            }),
        };

        return { ...defaultStyle, ...size, ...colorStyle, ...disabledState };
    };

    return {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }: { ownerState: ButtonProps }) => ({
                    ...rootStyles(ownerState),
                }),
            },
        },
    };
}

