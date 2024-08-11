import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Modal } from "react-bootstrap";

export default observer(function ModalContainer() {
    const { modalStore } = useStore();
    return (<>
        <Modal
            show={modalStore.modal.open}
            onHide={modalStore.closeModal}
            backdrop="static"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>{modalStore.modal.body}</Modal.Body>
        </Modal>
    </>);
});