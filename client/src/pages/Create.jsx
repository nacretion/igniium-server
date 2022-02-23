import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, MenuItem, TextField} from "@mui/material";
import classes from "../styles/Create.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ChipInput from 'material-ui-chip-input';
import {useLocation, useNavigate} from "react-router-dom";
import Previews from "../components/Previws";

const Create = () => {

    const location = useLocation();
    const [newTitleID, setNewTitleID] = useState("1")

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        //logic

        navigate(location.pathname + "/" + newTitleID)
    }

    return (
        <>
            <Header withoutLogIn={true}/>
            <form className={classes.create} onSubmit={handleSubmit}>
                <p className={classes.text}>Create a title</p>
                <TextField
                    required
                    InputLabelProps={{className: classes.inputLabel}}
                    style={{marginTop: "20px"}}

                    id="standard-textarea"
                    label="Title name"
                    placeholder="Name"
                    variant="standard"
                />

                <TextField
                    required
                    InputLabelProps={{className: classes.inputLabel}}
                    style={{marginTop: "20px"}}

                    id="standard-textarea"
                    label="Title author"
                    placeholder="Author"
                    variant="standard"
                />
                <TextField
                    required
                    InputLabelProps={{className: classes.inputLabel}}
                    style={{marginTop: "20px"}}

                    id="standard-textarea"
                    label="Title description"
                    placeholder="Description"
                    variant="standard"
                    multiline
                />
                <ChipInput
                    required
                    InputLabelProps={{className: classes.inputLabel}}
                    style={{marginTop: "20px"}}
                    className={classes.input}
                    label="Title genres"
                />
                <ChipInput
                    required
                    InputLabelProps={{className: classes.inputLabel}}
                    style={{marginTop: "20px"}}
                    label="Title tags"
                />
                <div className={classes.selectWrapper}>
                    <TextField
                        InputProps={{className: classes.inputLabel}}
                        className={classes.select}
                        required
                        select
                        label="Status"
                    >
                        <MenuItem value={0}>Completed</MenuItem>
                        <MenuItem value={1}>Ongoing</MenuItem>
                    </TextField>
                    <FormControlLabel
                        inputLabelProps={{className: classes.inputLabel}}
                        className={classes.select}
                        control={<Checkbox/>}
                        label='NSFW'
                        style={{margin: "0"}}
                    />
                </div>

                <Previews/>
                <Button
                    variant="outlined"
                    type="submit"
                    sx={{
                        color: '#8163ff',
                        borderColor: "#8163ff",
                        '&:hover': {
                            backgroundColor: '#8163ff',
                            color: "#fff",
                        },
                    }}>Continue</Button>
            </form>
            <Footer/>
        </>
    );
};

export default Create;