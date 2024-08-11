import { Card } from "react-bootstrap";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitials } = activityStore;
    const { id } = useParams();
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitials || !activity) return <LoadingComponent />;
    return (<>
        {/* <Container>
            <Row>
                <Col>
                    <ActivityDetailedHeader />
                    <ActivityDetailedInfo />
                    <ActivityDetailedChat />
                </Col>
                <Col>
                    <ActivityDetailedSidebar />
                </Col>
            </Row>
        </Container> */}
        <Card className="my-4">
            <Card.Img src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Body>
                <Card.Title>{activity.title}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">{activity.title}</Card.Subtitle> */}
                <Card.Text>
                    {activity.description}
                </Card.Text>
                <Card.Footer>{`${activity.city} | ${activity.venue} | ${activity.date}`}</Card.Footer>
                <div className="d-grid my-2">
                    <div className="row">
                        <Link to={`/manage/${activity.id}`} className="col-6 btn btn-success" >Edit</Link>
                        <Link to='/activities' className="col-6 btn btn-success" >Cancel</Link>
                    </div>
                </div>

            </Card.Body>
        </Card>
    </>);
}

export default observer(ActivityDetails);