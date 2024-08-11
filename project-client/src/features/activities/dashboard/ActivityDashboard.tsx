import { useEffect } from "react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";


function ActivityDashboard() {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [loadActivities, activityRegistry.size]);


    if (activityStore.loadingInitials) return <LoadingComponent content="Loading Activities..." variant="success" />
    return (<>
        <div className="conainer">
            <div className="row justify-content-center">
                <div className="d-flex align-items-center flex-column col-6">

                    <ActivityList />
                </div>
                <div className="d-flex align-items-center flex-column  col-6">
                </div>
            </div>
        </div>
    </>);
}
export default observer(ActivityDashboard);