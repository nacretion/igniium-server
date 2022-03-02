import React from 'react';
import Header from "../components/Header";
import SignIn from "../components/SignIn";
import Footer from "../components/Footer";
import SignUp from "../components/SignUp";
import classes from "../styles/Feed.module.css";
import {TextField} from "@mui/material";
import TitleCard from "../components/UI/TitleCard/TitleCard";


const Feed = () => {

    return (
        <>
            <Header/>
            <div className={classes.contentWrapper}>


                <SignIn/>
                <SignUp/>
                <TextField
                    style={{marginBottom: "2vh"}}
                    className={classes.input}
                    id="standard-textarea"
                    label="Search"
                    variant="standard"
                />
                <div className={classes.cardsWrapper}>
                    <TitleCard title="Title 1" genres={["1", "2", "3"]}/>
                    <TitleCard title="Title 2"/>
                    <TitleCard title="Title 3"/>
                    <TitleCard title="Title 4"/>
                    <TitleCard title="Title 5"/>
                    <TitleCard title="Title 6"/>
                    <TitleCard title="Title 7"/>
                    <TitleCard title="Title 8"/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Feed;