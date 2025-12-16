export const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

export type Color = typeof COLORS[number];

interface GetColorParams {
    primaryColor: boolean;
    secondaryColor: boolean;
    themePrimaryColor: string;
    themeSecondaryColor: string;
    fallbackColor: string;
}

export function getColor({
    primaryColor,
    secondaryColor,
    themePrimaryColor,
    themeSecondaryColor,
    fallbackColor,
}: GetColorParams): string {
    if (primaryColor) return themePrimaryColor;
    if (secondaryColor) return themeSecondaryColor;
    return fallbackColor;
}

