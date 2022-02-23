import React, {useContext, useEffect, useState} from 'react';
import Modal from "./UI/Modal/Modal";
import {Button, TextField} from "@mui/material";
import {VisibleContext} from "../context";
import classes from "./models/SignIn.module.css";
import {useHttp} from "../hooks/http.hook";
import {Expressions} from "../utils/expressions";

const SignUp = () => {
    const [message, setMessage] = useState('')
    const {loading, error, request, clearError} = useHttp()
    const {modalSignUp, setModalSignUp, setModalSignIn} = useContext(VisibleContext)


    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isUsernameValid, setIsUsernameValid] = useState(true)

    const [formSignUp, setFormSignUp] = useState({
        email: "",
        username: "",
        password: "",
        rewrite: ""
    })

    const changeHandler = event => {
        setFormSignUp({
            ...formSignUp,
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        if (isPasswordValid && isEmailValid && isUsernameValid && formSignUp.password === formSignUp.rewrite) {
            try {
                const data = await request(
                    "/api/auth/register",
                    "POST",
                    {...formSignUp}
                )
                if (data.message === "User created") {
                    setModalSignUp(false)

                }
            } catch (e) {
                setMessage(e.message)
            }
        }
    }

    const validation = () => {
        setIsEmailValid(Expressions().validation.email.test(formSignUp.email))
        setIsPasswordValid(Expressions().validation.mediumPassword.test(formSignUp.password))
        setIsUsernameValid(Expressions().validation.username.test(formSignUp.username))

    }

    useEffect(() => {
        validation()
    }, [formSignUp])


    const toggleRegister = () => {
        setModalSignUp(false)
        setModalSignIn(true)
    }

    return (
        <Modal
            form={formSignUp}
            setForm={setFormSignUp}
            visible={modalSignUp}
            setVisible={setModalSignUp}
        >
            <div style={{display: "flex"}}>
                <a className={classes.heading} onClick={toggleRegister}> Sign Up</a>
                <p className={classes.heading}>&nbsp;/&nbsp;Register</p>
            </div>
            <div className={classes.inputWrapper}>
                <TextField
                    onChange={changeHandler}
                    error={formSignUp.email !== "" && isEmailValid === false}
                    helperText={
                        formSignUp.email !== "" && isEmailValid === false ? 'incorrect Email' : ' '}
                    className={classes.input}
                    name="email"
                    variant="standard"
                    type="text"
                    placeholder="E-MAIL"/>
                <TextField
                    onChange={changeHandler}
                    error={formSignUp.username !== "" && isUsernameValid === false}
                    helperText={
                        formSignUp.username !== "" && isUsernameValid === false ? 'incorrect username' : ' '}
                    className={classes.input}
                    name="username"
                    variant="standard"
                    type="text"
                    placeholder="USERNAME"/>
                <TextField
                    onChange={changeHandler}
                    error={formSignUp.password !== "" && isPasswordValid === false}
                    helperText={
                        formSignUp.password !== "" && isPasswordValid === false ? 'weak password' : ' '}
                    className={classes.input}
                    name="password"
                    variant="standard"
                    type="password"
                    placeholder="PASSWORD"/>
                <TextField
                    onChange={changeHandler}
                    error={formSignUp.rewrite !== "" && formSignUp.password !== formSignUp.rewrite}
                    helperText={
                        formSignUp.rewrite !== "" && formSignUp.password !== formSignUp.rewrite
                            ? 'passwords didn’t match!'
                            : ' '
                    }
                    className={classes.input}
                    type="password"
                    name="rewrite"
                    variant="standard"
                    placeholder="REPEAT PASSWORD"/>
                {loading === false && message !== "" ? <p className={classes.heading}>{message}</p> : ""}
            </div>
            <Button
                variant="outlined"
                onClick={registerHandler}
                style={{
                    marginTop: "3vh"
                }}
                disabled={loading}
            >
                Continue
            </Button>
        </Modal>
    );
};

export default SignUp;