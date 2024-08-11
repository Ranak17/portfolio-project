import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const { userStore } = useStore();
    const [loginDetail, setLogin] = useState({ email: '', password: '' });
    const [error, setError] = useState<string>();
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log(form.checkValidity());
        if (form.checkValidity() === true) {
            // event.stopPropagation();

            userStore.login(loginDetail).catch(error => setError("*Invalid Username and Password"));
        }
        setValidated(true);
    };

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setLogin({ ...loginDetail, [name]: value });
        console.log(loginDetail);
    }

    return (
        <Container className="my-4">
            <h2 className="text-success">Login Form !!!</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required onChange={handleInputChange} name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required onChange={handleInputChange} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>

            <div className="text-danger">
                {error}
            </div>
        </Container>
    )
});