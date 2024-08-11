import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { Fragment } from "react/jsx-runtime";


function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;
    return (<>
        {
            groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <h5 className="text-success my-4">{group}</h5>
                    {activities.map(activity => (
                        <ActivityListItem activity={activity} />
                    ))}
                </Fragment>

            ))
        }

    </>);
}

export default observer(ActivityList);