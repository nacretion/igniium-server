import React, {useContext} from 'react';
import Modal from "./UI/Modal/Modal";
import classes from "./models/Report.module.css";
import {Button, TextField} from "@mui/material";
import {VisibleContext} from "../context";
import {useNavigate} from 'react-router-dom';
import Previews from "./Previws";

const Report = ({redirect}) => {
    const {modalReport, setModalReport} = useContext(VisibleContext)

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault()
        //logic

        setModalReport(false)
        if (redirect) {
            navigate("/")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Modal visible={modalReport} setVisible={setModalReport}>
                <p className={classes.heading}>Report your problem</p>
                <div className={classes.inputWrapper}>
                    <TextField
                        style={{marginBottom: "2vh"}}
                        className={classes.input}
                        id="standard-textarea"
                        label="E-mail"
                        placeholder="Enter your e-mail"
                        variant="standard"
                    />
                    <TextField
                        style={{marginBottom: "2vh"}}
                        className={classes.textField}
                        id="standard-textarea"
                        label="Problem"
                        placeholder="Describe your problem"
                        multiline
                        variant="standard"
                    />
                </div>
                <Previews className={classes.textField}/>

                <Button type="submit" variant="outlined">Continue</Button>
            </Modal>
        </form>
    );
};

export default Report;