import { Button, Spinner } from "react-bootstrap";

interface Props {
    content?: string;
    variant?: string;
}

export default function LoadingComponent({ content = "Loading...", variant = "none" }: Props) {
    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
            <div>
                <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    variant={variant}
                />

            </div>
            <div>
                {content}
            </div>
        </div>);
}