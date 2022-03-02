import React from 'react';
import classes from "./Modal.module.css";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


const Modal = ({children, visible, setVisible}) => {
    const rootClasses = [classes.modal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div
                className={classes.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <IconButton className={classes.close} onClick={() => setVisible(false)}>
                    <CloseIcon />
                </IconButton>
                {children}
            </div>
        </div>
    );
};

export default Modal;