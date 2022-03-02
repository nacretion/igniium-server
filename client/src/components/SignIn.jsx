import React, {useContext, useEffect, useState} from 'react';
import Modal from "./UI/Modal/Modal";
import {Button, Input, TextField} from "@mui/material";
import {VisibleContext} from "../context";
import classes from "./models/SignIn.module.css";
import {useHttp} from "../hooks/http.hook";
import {Expressions} from "../utils/expressions";

const SignIn = () => {
    const [message, setMessage] = useState(null)
    const {loading, error, request, clearError} = useHttp()

    const {
        modalSignIn,
        setModalSignIn,
        setModalSignUp,
        login,
    } = useContext(VisibleContext)

    const [formSignIn, setFormSignIn] = useState({
        username: "",
        password: ""
    })
    const [isUsernameValid, setIsUsernameValid] = useState(false)


    const changeHandler = event => {
        setFormSignIn({
            ...formSignIn,
            [event.target.name]: event.target.value
        })
    }

    const validation = () => {
        setIsUsernameValid(Expressions().validation.username.test(formSignIn.username))

    }

    useEffect(() => {
    }, [error, message, clearError])

    useEffect(() => {
        validation()
    }, [formSignIn])

    const loginHandler = async () => {
        if (isUsernameValid) {
            try {
                const data = await request(
                    "/api/auth/login",
                    "POST",
                    {...formSignIn}
                )
                if (data.message !== "incorrect password") {
                    login(data.token, data.userId)
                    setModalSignIn(false)

                }
            } catch (e) {
                setMessage(e.message)
            }
        }
    }


    const toggleRegister = () => {
        setModalSignIn(false)
        setModalSignUp(true)
    }

    return (
        <Modal
            visible={modalSignIn}
            setVisible={setModalSignIn}
        >
            <div style={{display: "flex"}}>
                <p className={classes.heading}>Sign in /&nbsp;</p>{}
                <a className={classes.heading} onClick={toggleRegister}>&nbsp;Register</a>
            </div>
            <div className={classes.inputWrapper}>
                <TextField
                    onChange={changeHandler}
                    error={formSignIn.username !== "" && isUsernameValid === false}
                    helperText={
                        formSignIn.username !== "" && isUsernameValid === false ? 'incorrect username' : ' '}
                    className={classes.input}
                    name="username"
                    variant="standard"
                    type="text"
                    placeholder="USERNAME"/>
                <Input
                    name="password"
                    onChange={changeHandler}
                    className={classes.input}
                    type="password"
                    placeholder="PASSWORD"
                />
                {loading === false && message !== "" ? <p className={classes.heading}>{message}</p> : ""}
            </div>
            <Button
                onClick={loginHandler}
                className={classes.btn}
                variant="outlined"
                disabled={loading}
            >
                Continue
            </Button>
        </Modal>
    );
};

export default SignIn;