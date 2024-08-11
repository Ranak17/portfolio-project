import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
    const { commonStore } = useStore();
    return (<>
        <div>
            Servor Error Message : {commonStore.error && commonStore.error?.message}
        </div>
        <div>
            Servor Error Details : {commonStore.error && commonStore.error?.details}
        </div>
    </>);
})