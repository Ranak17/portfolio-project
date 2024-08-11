import { Button, Card, Spinner } from "react-bootstrap";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
    activity: Activity
}
function ActivityListItem({ activity }: Props) {
    const [target, setTarget] = useState('');
    const { activityStore } = useStore();
    const { loading, deleteActivity } = activityStore;
    return (
        <>
            <Card style={{ width: '80%' }}>
                <Card.Body>
                    <Card.Title>{activity.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">{activity.title}</Card.Subtitle> */}
                    <Card.Text>
                        {activity.description}
                    </Card.Text>
                    <Card.Footer>{`${activity.city} | ${activity.venue} | ${activity.date}`}</Card.Footer>
                    <div className="d-flex justify-content-end">
                        {/* <Button className="my-2" variant="success" onClick={() => { activityStore.selectActivity(activity.id) }}>View</Button> */}
                        <Link className="btn btn-success" to={`/activities/${activity.id}`} >View</Link>
                        <Button className="my-2" variant="danger" onClick={() => { deleteActivity(activity.id); setTarget(activity.id) }}>Delete
                            {loading && target === activity.id
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
                    </div>
                </Card.Body>
            </Card >
        </>
    );
}

export default ActivityListItem;