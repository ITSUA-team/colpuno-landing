import { alpha } from '@mui/material/styles';

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'text';

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        neutral: string;
    }
    interface SimplePaletteColorOptions {
        lighter: string;
        darker: string;
    }
    interface PaletteColor {
        lighter: string;
        darker: string;
    }

    interface Palette {
        neutral: { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string };
        font: {
            black100: string;
            black60: string;
            black30: string;
            white100: string;
            white60: string;
        };
        accent: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
            darker: string;
            contrastText: string;
        };
    }

    interface PaletteOptions {
        neutral?: { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string };
        font?: {
            black100: string;
            black60: string;
            black30: string;
            white100: string;
            white60: string;
        };
        accent?: {
            lighter: string;
            light: string;
            main: string;
            dark: string;
            darker: string;
            contrastText: string;
        };
    }
}

const GREY = {
    0: '#FFFFFF',
    100: '#F2F2F2',
    200: '#F4F6F8',
    300: '#DCDEE0',
    350: '#D8DDE0',
    400: '#A3A6AA',
    500: '#5E6266',
    600: '#262626',
    700: '#000000',
    800: '#5D6166',
};

const PRIMARY = {
    lighter: '#E8EBF6',
    light: '#647BC5',
    main: '#173AA8',
    dark: '#102977',
    darker: '#0A1847',
    contrastText: '#FFFFFF',
};

const SECONDARY = {
    lighter: '#FAE7E9',
    light: '#DE606E',
    main: '#CE1127',
    dark: '#920C1C',
    darker: '#570710',
    contrastText: '#FFFFFF',
};

const INFO = {
    lighter: '#CAF2FD',
    light: '#61C5F4',
    main: '#007DDD',
    dark: '#00489F',
    darker: '#00246A',
    contrastText: '#FFFFFF',
};

const SUCCESS = {
    lighter: '#E4F9CD',
    light: '#95DC67',
    main: '#2F8C10',
    dark: '#126408',
    darker: '#034305',
    contrastText: '#ffffff',
};

const WARNING = {
    lighter: '#FDF2CC',
    light: '#F4CB65',
    main: '#DD8E06',
    dark: '#9F5A03',
    darker: '#6A3301',
    contrastText: '#FFFFFF',
};

const ERROR = {
    lighter: '#FDE6D1',
    light: '#F39E74',
    main: '#D83E1C',
    dark: '#9B120E',
    darker: '#670511',
    contrastText: '#FFFFFF',
};

const ACCENT = {
    lighter: '#FFFAE8',
    light: '#FCE064',
    main: '#FAD118',
    dark: '#B29411',
    darker: '#69580A',
    contrastText: '#FFFFFF',
};

const NEUTRALS = {
    50: '#F9FAFB',
    100: '#FFFFFF',
    200: '#E8EBF6',
    300: '#B7C2E4',
    400: '#647BC5',
    500: '#4561B9',
    600: '#0D205C',
};

const FONT = {
    black100: '#0A1847',
    black60: '#153599',
    black30: '#647BC5',
    white100: '#FFFFFF',
    white60: 'rgba(255, 255, 255, 0.6)',
};

const COMMON = {
    common: {
        black: '#000000',
        white: '#FFFFFF',
    },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    neutral: NEUTRALS,
    font: FONT,
    accent: ACCENT,
    divider: alpha(GREY[500], 0.2),
    action: {
        hover: alpha(GREY[500], 0.08),
        selected: alpha(GREY[500], 0.16),
        disabled: alpha(GREY[500], 0.8),
        disabledBackground: alpha(GREY[500], 0.24),
        focus: alpha(GREY[500], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};

export function palette(mode: 'light' | 'dark' = 'light') {
    const light = {
        ...COMMON,
        mode: mode || 'light',
        text: {
            primary: '#0A1847',
            secondary: '#153599',
            disabled: '#647BC5',
        },
        background: {
            paper: '#FFFFFF',
            default: '#FFFFFF',
            neutral: GREY[200],
        },
        action: {
            ...COMMON.action,
            active: GREY[600],
        },
    };

    return light;
}

