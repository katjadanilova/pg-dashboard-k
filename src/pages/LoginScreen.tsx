import {AccountCircle, Key} from "@mui/icons-material";
import {Button, FormControl, FormLabel, Input} from "@mui/joy";
import {useTheme} from "@mui/joy/styles";
import {type KeyboardEvent, useEffect, useRef, useState} from "react";
import {FullPageError} from "../components/FullPageError";
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

                    <FormControl>
                        <FormLabel>Your email address</FormLabel>
                        <Input
                            disabled={working}
                            type="email"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            slotProps={{
                                input: {
                                    ref: inputRef,
                                },
                            }}
                            startDecorator={<AccountCircle sx={{color: theme.vars.palette.primary["300"]}} />}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Your password</FormLabel>
                        <Input
                            onKeyDown={handleKeyDown}
                            disabled={working}
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            startDecorator={<Key sx={{color: theme.vars.palette.primary["300"]}} />}
                        />
                    </FormControl>

                    <Button loading={working} type="submit" fullWidth onClick={submit} onKeyDown={handleKeyDown} disabled={!username || !password}>
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
}
