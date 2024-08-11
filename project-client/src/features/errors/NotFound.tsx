import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (<>
        <Container>
            OOps! Not Found
        </Container>
        <Link to='/activities' content="activities" />
    </>
    );
}