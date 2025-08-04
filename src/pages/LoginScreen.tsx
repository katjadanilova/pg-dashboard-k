import {AccountCircle, Key} from "@mui/icons-material";
import {useTheme} from "@mui/joy/styles";
import {type KeyboardEvent, useEffect, useRef, useState} from "react";
import {FullPageError} from "../components/FullPageError";
import {UpButton, UpFormField} from "../components/UpComponents";
import {useAuthContext} from "../contexts/AuthContext";

function useAutoFocus() {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    return ref;
}

export function LoginScreen() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {signIn, error, working} = useAuthContext();
    const theme = useTheme();

    const inputRef = useAutoFocus();

    async function submit() {
        await signIn(username, password);
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            submit();
        }
    }

    return (
        <div className="login-screen">
            <div className="login-content">
                <div className="login">
                    <h1>Playground Dashboard Login</h1>

                    {error && <FullPageError title="We've encountered an error:" description={error.toString()} />}

                    <UpFormField
                        label="Your email address"
                        value={username}
                        onChange={setUsername}
                        type="email"
                        disabled={working}
                        autoComplete="username"
                        startDecorator={<AccountCircle sx={{color: theme.vars.palette.primary["300"]}} />}
                        slotProps={{
                            input: {
                                ref: inputRef,
                            },
                        }}
                    />

                    <UpFormField
                        label="Your password"
                        value={password}
                        onChange={setPassword}
                        type="password"
                        disabled={working}
                        autoComplete="current-password"
                        onKeyDown={handleKeyDown}
                        startDecorator={<Key sx={{color: theme.vars.palette.primary["300"]}} />}
                    />

                    <UpButton loading={working} type="submit" fullWidth onClick={submit} onKeyDown={handleKeyDown} disabled={!username || !password}>
                        Sign In
                    </UpButton>
                </div>
            </div>
        </div>
    );
}
