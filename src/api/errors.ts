import type {APIError} from "../types";

export async function handleAPIResponse(response: Response): Promise<Response> {
    if (!response.ok) {
        if (response.status === 403) {
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const textResponse = await response.text();
                if (textResponse.trim() === "Unauthorized") {
                    throw new Error("Your auth token has expired, please reload the page");
                }
            }
        }

        try {
            const errorData = await response.json();
            if (errorData.error?.validation?.issues) {
                const issues = errorData.error.validation.issues
                    .map((issue: any) => {
                        return `${issue.field}: ${issue.message}`;
                    })
                    .join("\n");
                throw new Error(issues);
            }
            if (errorData.error?.details) {
                throw new Error(errorData.error.details);
            }
            if (typeof errorData.error === "string") {
                throw new Error(errorData.error);
            }
            throw new Error("An unknown error occurred");
        } catch {
            if (response.status === 403) {
                throw new Error("Your auth token has expired, please reload the page");
            }
            throw new Error("An unknown error occurred");
        }
    }

    return response;
}

export class APIErrorHandler extends Error {
    public status?: number;
    public validation?: APIError["validation"];
    public details?: string;

    constructor(message: string, options?: {status?: number; validation?: APIError["validation"]; details?: string}) {
        super(message);
        this.name = "APIError";
        this.status = options?.status;
        this.validation = options?.validation;
        this.details = options?.details;
    }
}
