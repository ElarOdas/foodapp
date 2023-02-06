import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import styles from './Modal.module.css';

//  ! Input Style for Modal
// modal={{
//     backdrop: {
//         onClick: props.onCloseCart,
//     },
//     modal: {
//         classNames: "",
//     },
//     backdropId: 'backdrop-root',
//     modalId: 'modal-root',
// }}

const Backdrop = function (props) {
    return <div className={styles.backdrop} {...props.backdrop}></div>;
};

const ModalOverlay = function (props) {
    return <Card className={styles.modal}>{props.children}</Card>;
};

function Modal(props) {
    const {
        modal: {
            backdropId = 'backdrop-root',
            modalId = 'modal-root',
            backdrop = {},
            modal = {},
        },
    } = props;
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop backdrop={backdrop}></Backdrop>,
                document.getElementById(backdropId)
            )}
            {ReactDOM.createPortal(
                <ModalOverlay modal={modal}>{props.children}</ModalOverlay>,
                document.getElementById(modalId)
            )}
        </>
    );
}
export default Modal;
