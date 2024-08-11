import { Link } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();
    return (<div className="container">
        <h1>Home Page!!!</h1>
        {userStore.IsLoggedIn
            ? (<>Go to <Link to='/activities'>Activities</Link></>)
            // : (<> <Link to='/login'>Login!</Link> </>)
            : (<>
                <Button onClick={() => modalStore.openModal(<LoginForm />)}>Login!!!</Button>
                <Button onClick={() => modalStore.openModal(<RegisterForm />)}>Register</Button>
            </>)
        }
    </div>);
})