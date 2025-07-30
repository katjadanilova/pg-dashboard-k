import {CssVarsProvider, extendTheme} from "@mui/joy/styles";
import type {ReactNode} from "react";

export const colorspace = {
    grays: {
        dark: getComputedStyle(document.documentElement).getPropertyValue("--gray-dark").trim(),
        darkerGray: getComputedStyle(document.documentElement).getPropertyValue("--gray-darker-gray").trim(),
        darkGray: getComputedStyle(document.documentElement).getPropertyValue("--gray-dark-gray").trim(),
        gray: getComputedStyle(document.documentElement).getPropertyValue("--gray-gray").trim(),
        lightGray: getComputedStyle(document.documentElement).getPropertyValue("--gray-light-gray").trim(),
        lighterGray: getComputedStyle(document.documentElement).getPropertyValue("--gray-lighter-gray").trim(),
        light: getComputedStyle(document.documentElement).getPropertyValue("--gray-light").trim(),
    },

    primary: {
        light: getComputedStyle(document.documentElement).getPropertyValue("--primary-light").trim(),
        dark: getComputedStyle(document.documentElement).getPropertyValue("--primary-dark").trim(),
        upwireBlueAlt1: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire-blue-alt-1").trim(),
        upwire: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire").trim(),
        blue: getComputedStyle(document.documentElement).getPropertyValue("--primary-blue").trim(),
        upwireBlueAlt2: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire-blue-alt-2").trim(),
        upwirePurple2Light: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire-purple-2-light").trim(),
        upwirePurple1: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire-purple-1").trim(),
        upwirePurple2: getComputedStyle(document.documentElement).getPropertyValue("--primary-upwire-purple-2").trim(),
    },

    good: {
        upwireGreen1: getComputedStyle(document.documentElement).getPropertyValue("--good-upwire-green-1").trim(),
        green: getComputedStyle(document.documentElement).getPropertyValue("--good-green").trim(),
        upwireGreen2: getComputedStyle(document.documentElement).getPropertyValue("--good-upwire-green-2").trim(),
        upwireGreen3: getComputedStyle(document.documentElement).getPropertyValue("--good-upwire-green-3").trim(),
        upwireGreen2Light: getComputedStyle(document.documentElement).getPropertyValue("--good-upwire-green-2-light").trim(),
    },

    warning: {
        dark: getComputedStyle(document.documentElement).getPropertyValue("--warning-dark").trim(),
        yellow: getComputedStyle(document.documentElement).getPropertyValue("--warning-yellow").trim(),
        main: getComputedStyle(document.documentElement).getPropertyValue("--warning-main").trim(),
        upwireYellow1: getComputedStyle(document.documentElement).getPropertyValue("--warning-upwire-yellow-1").trim(),
        light: getComputedStyle(document.documentElement).getPropertyValue("--warning-light").trim(),
        upwireYellow2Light: getComputedStyle(document.documentElement).getPropertyValue("--warning-upwire-yellow-2-light").trim(),
    },

    bad: {
        main: getComputedStyle(document.documentElement).getPropertyValue("--bad-main").trim(),
        red: getComputedStyle(document.documentElement).getPropertyValue("--bad-red").trim(),
        light: getComputedStyle(document.documentElement).getPropertyValue("--bad-light").trim(),
        dark: getComputedStyle(document.documentElement).getPropertyValue("--bad-dark").trim(),
        upwirePink1: getComputedStyle(document.documentElement).getPropertyValue("--bad-upwire-pink-1").trim(),
    },
};

export const muiJoyUpwireTheme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: colorspace.primary.light,
                    100: colorspace.primary.light,
                    200: colorspace.primary.light,
                    300: colorspace.primary.light,
                    400: colorspace.primary.upwireBlueAlt1,
                    500: colorspace.primary.upwireBlueAlt1,
                    600: colorspace.primary.upwireBlueAlt1,
                    700: colorspace.primary.dark,
                    800: colorspace.primary.dark,
                    900: colorspace.primary.dark,
                },
                warning: {
                    50: colorspace.warning.light,
                    100: colorspace.warning.light,
                    200: colorspace.warning.light,
                    300: colorspace.warning.light,
                    400: colorspace.warning.dark,
                    500: colorspace.warning.dark,
                    600: colorspace.warning.dark,
                    700: colorspace.warning.dark,
                    800: colorspace.warning.dark,
                    900: colorspace.warning.dark,
                },
                danger: {
                    50: colorspace.bad.light,
                    100: colorspace.bad.light,
                    200: colorspace.bad.light,
                    300: colorspace.bad.light,
                    400: colorspace.bad.main,
                    500: colorspace.bad.main,
                    600: colorspace.bad.main,
                    700: colorspace.bad.dark,
                    800: colorspace.bad.dark,
                    900: colorspace.bad.dark,
                },
                success: {
                    50: colorspace.good.upwireGreen3,
                    100: colorspace.good.upwireGreen3,
                    200: colorspace.good.upwireGreen3,
                    300: colorspace.good.upwireGreen3,
                    400: colorspace.good.upwireGreen1,
                    500: colorspace.good.upwireGreen1,
                    600: colorspace.good.upwireGreen1,
                    700: colorspace.good.upwireGreen2,
                    800: colorspace.good.upwireGreen2,
                    900: colorspace.good.upwireGreen2,
                },
                neutral: {
                    50: colorspace.grays.lighterGray,
                    100: colorspace.grays.lightGray,
                    200: colorspace.grays.gray,
                    300: colorspace.grays.darkGray,
                    400: colorspace.grays.darkerGray,
                    500: colorspace.grays.dark,
                    600: colorspace.grays.dark,
                    700: colorspace.grays.dark,
                    800: colorspace.grays.dark,
                    900: colorspace.grays.dark,
                },
            },
        },
    },
    fontFamily: {
        display: `"Sofia Pro", "Helvetica", "Arial", sans-serif`,
        body: `"Sofia Pro", "Helvetica", "Arial", sans-serif`,
    },
});

export function UpwireJoyThemeProvider({children}: {children?: ReactNode}) {
    return <CssVarsProvider theme={muiJoyUpwireTheme}>{children}</CssVarsProvider>;
}
