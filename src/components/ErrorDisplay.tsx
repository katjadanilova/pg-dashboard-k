import {UpAlert} from "./UpComponents";

export type ErrorDisplayProps = {
    error: string | string[] | Error | null;
    title?: string;
};

export function ErrorDisplay({error, title = "Error"}: ErrorDisplayProps) {
    if (!error) return null;

    const errorMessages = Array.isArray(error) ? error : error instanceof Error ? [error.message] : [error];

    return (
        <div className="error-display">
            <UpAlert
                color="danger"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 1,
                    "& ul": {
                        marginTop: 1,
                        paddingLeft: 1.5,
                        listStyle: "disc",
                    },
                }}
            >
                <span>{title}</span>
                <ul>
                    {errorMessages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </UpAlert>
        </div>
    );
}
