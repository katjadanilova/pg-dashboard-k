import type {
    ButtonProps,
    FormControlProps,
    InputAdornmentProps,
    InputLabelProps,
    MenuItemProps,
    SelectProps,
    TextFieldProps,
    ThemeProviderProps,
    TooltipProps,
} from "@mui/material";
import {
    createTheme,
    FormControl,
    InputAdornment,
    InputLabel,
    Button as MaterialButton,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Tooltip,
} from "@mui/material";

// Consistent theme for all Material-UI components
const upMaterialTheme = createTheme({
    palette: {
        primary: {
            main: "#4747b5",
        },
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        text: {
            primary: "#515151",
            secondary: "#9b9b9b",
        },
        divider: "#f8f8f8",
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderRadius: "8px",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                    },
                },
            },
        },
    },
});

type UpMaterialButtonProps = ButtonProps;

export function UpMaterialButton(props: UpMaterialButtonProps) {
    return <MaterialButton {...props} />;
}

type UpMaterialTextFieldProps = TextFieldProps;

export function UpMaterialTextField(props: UpMaterialTextFieldProps) {
    return <TextField {...props} />;
}

type UpMaterialFormControlProps = FormControlProps;

export function UpMaterialFormControl(props: UpMaterialFormControlProps) {
    return <FormControl {...props} />;
}

type UpMaterialInputLabelProps = InputLabelProps;

export function UpMaterialInputLabel(props: UpMaterialInputLabelProps) {
    return <InputLabel {...props} />;
}

type UpMaterialSelectProps = SelectProps;

export function UpMaterialSelect(props: UpMaterialSelectProps) {
    return <Select {...props} />;
}

type UpMaterialMenuItemProps = MenuItemProps;

export function UpMaterialMenuItem(props: UpMaterialMenuItemProps) {
    return <MenuItem {...props} />;
}

type UpMaterialInputAdornmentProps = InputAdornmentProps;

export function UpMaterialInputAdornment(props: UpMaterialInputAdornmentProps) {
    return <InputAdornment {...props} />;
}

type UpMaterialTooltipProps = TooltipProps;

export function UpMaterialTooltip(props: UpMaterialTooltipProps) {
    return <Tooltip {...props} />;
}

type UpMaterialThemeProviderProps = Omit<ThemeProviderProps, "theme">;

export function UpMaterialThemeProvider(props: UpMaterialThemeProviderProps) {
    return <ThemeProvider theme={upMaterialTheme} {...props} />;
}

export {upMaterialTheme};
