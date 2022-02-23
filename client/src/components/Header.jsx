import React, {useContext} from 'react';
import Image from "react-bootstrap/Image";
import classes from "./models/Header.module.css";
import comics from '../assets/comics.png'
import {Button} from "@mui/material";
import {VisibleContext} from "../context";
import {useNavigate} from "react-router-dom";
import MyMenu from "./UI/Menu/MyMenu";

const Header = ({withoutLogIn}) => {
    const navigate = useNavigate()
    const {setModalSignIn, setModalSignUp, isAuthenticated, logout} = useContext(VisibleContext)

    return (
        <header className={classes.header}>
            <a onClick={() => navigate("/")}>
                <Image className={classes.image} src={comics}/>
            </a>
            <div className={classes.menu}>
                <MyMenu/>
            </div>

            <nav className={classes.nav}>
                <div className={classes.linkWrapper}>
                    <a className={classes.link}
                       onClick={() => navigate("/")}
                    >Feed</a>
                </div>
                <div className={classes.linkWrapper}>

                    {isAuthenticated
                        ? <>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: '#8163ff',
                                    borderColor: "#8163ff",
                                    '&:hover': {
                                        backgroundColor: '#8163ff',
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => navigate("/create")}>Create</Button>
                            <a className={classes.link} onClick={logout}>Logout</a>
                        </>
                        : <a className={classes.link} onClick={() => setModalSignIn(true)}>Sign in</a>}
                </div>

            </nav>
        </header>
    );
};

export default Header;