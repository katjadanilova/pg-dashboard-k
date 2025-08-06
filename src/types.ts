export type RecordData = {
    referenceNo: string;
    batchNo: string;
    date: string | number | Date; // Can be string, timestamp, or Date object
    customer?: string;
    comment?: string;
    status: "finished" | "active" | "failed";
    result?: string;
    json?: string;
};

export type DashboardData = {
    started: number;
    finished: number;
    failed: number;
    stillRunning: number;
};

export type PlaygroundData = {
    name: string;
    lastModified: string | number | Date; // Can be string, timestamp, or Date object
    testValue: string | null;
    prodValue: string | null;
    successRate: string;
    failureRate: string;
    folder?: string;
};

export type FolderData = {
    name: string;
    playgrounds: PlaygroundData[];
};

export type APIResponse<T> = {
    ok: boolean;
    data: T;
    error?: string;
};

export type APIError = {
    message: string;
    status?: number;
    validation?: {
        issues: Array<{
            field: string;
            message: string;
        }>;
    };
    details?: string;
};
