import {useQuery} from "@tanstack/react-query";
import {mockDashboardData, mockDelay, mockPlaygrounds, mockRecords} from "../api/mockData";
import type {DashboardData, PlaygroundData, RecordData} from "../types";

export function useMockRecords(options?: {playgroundName?: string; batchNo?: string}) {
    return useQuery<RecordData[]>({
        queryKey: ["mock-records", options],
        queryFn: async () => {
            await mockDelay();

            let filteredRecords = [...mockRecords];

            // Filter by batch number if provided
            if (options?.batchNo && options.batchNo !== "All") {
                filteredRecords = filteredRecords.filter((record) => record.batchNo === options.batchNo);
            }

            return filteredRecords;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

export function useMockDashboard() {
    return useQuery<DashboardData>({
        queryKey: ["mock-dashboard"],
        queryFn: async () => {
            await mockDelay();
            return mockDashboardData;
        },
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
}

export function useMockPlaygrounds() {
    return useQuery<PlaygroundData[]>({
        queryKey: ["mock-playgrounds"],
        queryFn: async () => {
            await mockDelay();
            return mockPlaygrounds;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// Generic mock data hook that can be used for any data type
export function useMockData<T>(
    key: string,
    data: T,
    options?: {
        delay?: number;
        staleTime?: number;
        enabled?: boolean;
    },
) {
    return useQuery<T>({
        queryKey: ["mock", key],
        queryFn: async () => {
            await mockDelay(options?.delay);
            return data;
        },
        staleTime: options?.staleTime ?? 5 * 60 * 1000,
        enabled: options?.enabled ?? true,
    });
}
