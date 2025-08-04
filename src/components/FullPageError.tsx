import {UpButton} from "./UpComponents";

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
                    <UpButton variant="plain" onClick={() => window.location.reload()}>
                        Reload
                    </UpButton>
                    <UpButton
                        variant="solid"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    >
                        Dashboard
                    </UpButton>
                </div>
            </div>
        </div>
    );
}
