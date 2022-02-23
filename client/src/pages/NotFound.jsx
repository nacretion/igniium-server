import React, {useContext} from 'react';
import Image from 'react-bootstrap/Image'
import NotFound404 from '../assets/404.png'
import classes from "../styles/NotFound.module.css";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import Report from "../components/Report";
import {VisibleContext} from "../context";


const NotFound = () => {

    const {modalReport, setModalReport} = useContext(VisibleContext)
    return (
        <div className={classes.notFound}>
            <Report redirect/>
            <Image className={classes.logo404} height="40vh" src={NotFound404}/>
            <div className={classes.answer}>
                <h1>404 Not Found</h1>
                <h3>Path incorrect</h3>
                <nav>
                    <Link to="/"><Button variant={"primary"}>Visit Homepage</Button></Link>{' '}
                    <Button variant={"outline-primary"} onClick={() => setModalReport(true)}>Contact Us</Button>{' '}
                </nav>
            </div>
        </div>
    );
};

export default NotFound;