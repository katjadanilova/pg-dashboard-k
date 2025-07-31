import {useMutation, useQuery} from "@tanstack/react-query";
import type {APIResponse} from "../types";
import {reRoute, useAuthHeaders} from "./client";
import {handleAPIResponse} from "./errors";

export function useQueryAPI<T>(
    route: string,
    action: string,
    payload: Record<string, any> | null = null,
    options?: {
        enabled?: boolean;
        staleTime?: number;
        refetchInterval?: number;
    },
) {
    const normalizedRoute = reRoute(route);
    const headers = useAuthHeaders();

    return useQuery<T>({
        queryKey: [route, action, payload],
        queryFn: async () => {
            const response = await fetch(normalizedRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify({
                    action,
                    ...payload,
                }),
            });

            await handleAPIResponse(response);
            const data: APIResponse<T> = await response.json();

            if (data.ok) {
                return data.data;
            }
            throw new Error(data.error ?? "Unknown API error");
        },
        enabled: options?.enabled,
        staleTime: options?.staleTime,
        refetchInterval: options?.refetchInterval,
    });
}

export function useMutationAPI<TPayload, TResponse>(
    route: string,
    action: string,
    options?: {
        onSuccess?: (data: TResponse) => void;
        onError?: (error: Error) => void;
    },
) {
    const normalizedRoute = reRoute(route);
    const headers = useAuthHeaders();

    return useMutation<TResponse, Error, TPayload>({
        mutationKey: [route, action],
        mutationFn: async (payload: TPayload) => {
            const response = await fetch(normalizedRoute, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify({
                    action,
                    ...(payload as any),
                }),
            });

            await handleAPIResponse(response);
            const data: APIResponse<TResponse> = await response.json();

            if (data.ok) {
                return data.data;
            }
            throw new Error(data.error ?? "Unknown API error");
        },
        onSuccess: options?.onSuccess,
        onError: options?.onError,
    });
}
