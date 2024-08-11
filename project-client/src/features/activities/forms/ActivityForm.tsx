import { Button, Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
function ActivityForm() {
    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateActivity, loading, loadActivity, loadingInitials } = activityStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity]);

    function handleSubmit() {
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));;
        }
    }

    function handleInputchange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitials) return <LoadingComponent />
    return (<>



        <Form className="w-100" onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();

        }} autoComplete="off">
            <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Control type="text" placeholder="Title" value={activity.title} name="title" onChange={handleInputchange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Control type="text" placeholder="Description" value={activity.description} name="description" onChange={handleInputchange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Control type="text" placeholder="Category" value={activity.category} name="category" onChange={handleInputchange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Control type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputchange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Control type="text" placeholder="City" value={activity.city} name="city" onChange={handleInputchange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicVenue">
                <Form.Control type="text" placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputchange} />
            </Form.Group>



            <div className="d-flex flex-row-reverse gap-2">
                <Button variant="success" type="submit">
                    Submit
                    {!loading
                        ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        : ''
                    }
                </Button>
                <Link to='/activities' className="btn btn-success">
                    Cancel
                </Link>
            </div>
        </Form>
    </>);
}
export default observer(ActivityForm);