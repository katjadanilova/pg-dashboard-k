export type RecordData = {
    referenceNo: string;
    batchNo: string;
    date: string;
    customer?: string;
    comment?: string;
    status: "finished" | "active" | "failed";
    result?: string;
};

export type DashboardData = {
    started: number;
    finished: number;
    failed: number;
    stillRunning: number;
};

export type PlaygroundData = {
    id: string;
    name: string;
    lastModified: string;
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
