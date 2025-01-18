/** @type {import('tailwindcss').Config} */
import prose from '@tailwindcss/typography';

export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    fontFamily: {
      title: ['Castoro Titling', 'serif'],
      subtitle: ['Libre Baskerville', 'serif'],
      content: ['Poppins', 'sans-serif'],
    },
    typography: ({ theme }) => ({
      DEFAULT: {
        css: {
          color: theme('colors.surface.500'),
          p: {
            color: theme('colors.surface.700'),
          },
          'h1, h2, h3, h4, h5, h6': {
            color: theme('colors.primary.500'),
          },
          a: {
            color: theme('colors.primary.500'),
            '&:hover': {
              color: theme('colors.primary.700'),
            },
          },
          h2: { fontFamily: theme('fontFamily.subtitles')?.join(',') },
          h3: { fontFamily: theme('fontFamily.subtitles')?.join(',') },
          h4: { fontFamily: theme('fontFamily.subtitles')?.join(',') },
          h5: { fontFamily: theme('fontFamily.subtitles')?.join(',') },
          h6: { fontFamily: theme('fontFamily.subtitles')?.join(',') },
        },
      },
    }),

    colors: {
      primary: {
        50: '#f2f6fc',
        100: '#CDE9F5',
        200: '#B3DCF2',
        300: '#65B6E5',
        400: '#1C93D7',
        500: '#027DC3',
        600: '#005486',
        700: '#023A63',
        800: '#002B4D',
        900: '#031836',
      },
      surface: {
        0: '#ffffff',
        50: '#f9fafb',
        100: '#f2f4f5',
        200: '#e5e7eb',
        300: '#d6dade',
        400: '#bcc2c9',
        500: '#9aa0a7',
        600: '#777d81',
        700: '#5b6163',
        800: '#3f4445',
        900: '#242627',
      },
      secondary: {
        50: "#fcf0cc",
        100: "#f8e299",
        200: "#f5d366",
        300: "#f1c533",
        400: "#eeb600",
        500: "#EEB600",
        600: "#b28800",
        700: "#775b00",
        800: "#3c2e00",
        900: "#000000"
      },
      'primary-contrast': '#ffffff',
      'primary-emphasis': '#2c4da7',
      'border-surface': '#e5e7eb',
      'bg-emphasis': '#d8e2f6',
      'bg-highlight': '#fdf1e1',
      'bg-highlight-emphasis': '#fbddb8',
      'text-color': '#233b82',
      'text-color-emphasis': '#1b2b60',
      'text-muted-color': '#5b6163',
      'text-muted-color-emphasis': '#3f4445',
    },
    borderRadius: {
      'rounded-border': '8px',
    },
  },
};
export const plugins = [
  prose,
];
