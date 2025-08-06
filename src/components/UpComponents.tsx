import CloseIcon from "@mui/icons-material/Close";
import type {
    AlertProps,
    ButtonProps,
    DropdownProps,
    LinearProgressProps,
    ListItemDecoratorProps,
    MenuButtonProps,
    MenuItemProps,
    MenuProps,
    SkeletonProps,
} from "@mui/joy";
import {
    Alert,
    Dropdown,
    FormControl,
    FormLabel,
    Input,
    Button as JoyButton,
    LinearProgress,
    ListItemDecorator,
    Menu,
    MenuButton,
    MenuItem,
    Skeleton,
} from "@mui/joy";
import type {KeyboardEvent, ReactNode} from "react";

type UpButtonProps = ButtonProps;

export function UpButton(props: UpButtonProps) {
    return <JoyButton {...props} />;
}

type UpFormFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    disabled?: boolean;
    autoComplete?: string;
    startDecorator?: ReactNode;
    onKeyDown?: (e: KeyboardEvent) => void;
    slotProps?: any;
};

export function UpFormField({label, value, onChange, type = "text", disabled = false, autoComplete, startDecorator, onKeyDown, slotProps}: UpFormFieldProps) {
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input
                disabled={disabled}
                type={type}
                autoComplete={autoComplete}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                startDecorator={startDecorator}
                slotProps={slotProps}
            />
        </FormControl>
    );
}

type UpAlertProps = AlertProps;

export function UpAlert(props: UpAlertProps) {
    return <Alert {...props} />;
}

type UpSkeletonProps = SkeletonProps;

export function UpSkeleton(props: UpSkeletonProps) {
    return <Skeleton {...props} />;
}

type UpProgressProps = LinearProgressProps;

export function UpProgress(props: UpProgressProps) {
    return <LinearProgress {...props} />;
}

type UpDropdownProps = DropdownProps;

export function UpDropdown(props: UpDropdownProps) {
    return <Dropdown {...props} />;
}

type UpMenuProps = MenuProps;

export function UpMenu(props: UpMenuProps) {
    return <Menu {...props} />;
}

type UpMenuButtonProps = MenuButtonProps;

export function UpMenuButton(props: UpMenuButtonProps) {
    return <MenuButton {...props} />;
}

type UpMenuItemProps = MenuItemProps;

export function UpMenuItem(props: UpMenuItemProps) {
    return <MenuItem {...props} />;
}

type UpListItemDecoratorProps = ListItemDecoratorProps;

export function UpListItemDecorator(props: UpListItemDecoratorProps) {
    return <ListItemDecorator {...props} />;
}

type UpModalProps = {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    footer?: ReactNode;
};

export function UpModal({open, onClose, title, children, footer}: UpModalProps) {
    if (!open) return null;

    return (
        <div className="up-modal" role="dialog" aria-modal="true" aria-labelledby="up-modal-title" onClick={onClose}>
            <div className="up-modal-content" role="document" onClick={(e) => e.stopPropagation()}>
                <div className="up-modal-header">
                    <h2 id="up-modal-title">{title}</h2>
                    <button type="button" className="up-modal-close-icon" onClick={onClose} aria-label="Close modal">
                        <CloseIcon />
                    </button>
                </div>
                <div className="up-modal-body">{children}</div>
                {footer && <div className="up-modal-footer">{footer}</div>}
            </div>
        </div>
    );
}
