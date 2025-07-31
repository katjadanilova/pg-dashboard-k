import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {ReactNode} from "react";
import {useAuthContext} from "../contexts/AuthContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: 1,
        },
    },
});

export {queryClient};

type APIProviderProps = {
    children: ReactNode;
};

export function APIProvider({children}: APIProviderProps) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function reRoute(route: string): string {
    if (window.location.hostname === "localhost") {
        return `http://localhost:5173${route}`;
    }
    return route;
}

export function useAuthHeaders(): Record<string, string> {
    const {needsAuthentication} = useAuthContext();

    // For now, return empty headers since we don't have a real token system
    // This will be easily replaceable when we have actual auth tokens
    if (needsAuthentication) {
        return {};
    }

    return {
        Authorization: "Bearer mock-token",
    };
}
