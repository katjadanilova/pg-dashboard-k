import {useEffect, useState} from "react";

interface AuthState {
    signIn: (username: string, password: string) => Promise<void>;
    error: Error | null;
    working: boolean;
    needsAuthentication: boolean;
    initializing: boolean;
}

export function useAuth(): AuthState {
    const [error, setError] = useState<Error | null>(null);
    const [working, setWorking] = useState<boolean>(false);
    const [initializing, setInitializing] = useState<boolean>(true);
    const [needsAuthentication, setNeedsAuthentication] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitializing(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const signIn = async (username: string, password: string): Promise<void> => {
        setWorking(true);
        setError(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Auth placeholder: signIn called with", {
                username,
                password,
            });

            setNeedsAuthentication(false);
            setInitializing(false);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
        } finally {
            setWorking(false);
        }
    };

    return {
        signIn,
        error,
        working,
        needsAuthentication,
        initializing,
    };
}
