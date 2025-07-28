import {Button} from "@mui/joy";

export type FullPageErrorProps = {
    title: string;
    description?: string;
};

export function FullPageError(props: FullPageErrorProps) {
    const {title, description} = props;
    return (
        <div className="full-page-error">
            <div className="full-page-error-content">
                <h1>{title}</h1>
                {description && <p>{description}</p>}
                <div className="controls">
                    <Button variant="plain" onClick={() => window.location.reload()}>
                        {" "}
                        Reload{" "}
                    </Button>
                    <Button
                        variant="solid"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
