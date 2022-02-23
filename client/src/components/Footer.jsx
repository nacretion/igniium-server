import React, {useContext} from 'react';
import Image from "react-bootstrap/Image";
import SocialNetworks from "./UI/SocialNetworks/SocialNetworks";
import ignii from "../assets/ignii3.png";
import classes from "./models/Footer.module.css";
import Report from "./Report";
import {VisibleContext} from "../context";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
    const {setModalReport} = useContext(VisibleContext)

    return (
        <footer className={classes.footer}>
            <Report/>
            <a onClick={() => navigate("/")}>
                <Image className={classes.image} src={ignii}/>
            </a>
            <div className={classes.footerContent}>
                <div className={classes.linksContainer}>
                    <SocialNetworks/>
                    <div className={classes.linksWrapper}>
                        <a className={classes.link}
                           onClick={() => navigate("/")}>
                            Terms and Conditions
                        </a>
                        <a className={classes.link}
                           onClick={() => navigate("/")}>
                            Code of Conduct
                        </a>
                        <a className={classes.link}
                           onClick={() => navigate("/")}>
                            FAQ
                        </a>
                    </div>
                </div>
                <Button
                    variant="outlined"
                    onClick={() => setModalReport(true)}
                    className={classes.button}
                    sx={{
                        fontSize: "calc(.6vh + .6vw)",
                        color: '#8163ff',
                        borderColor: "#8163ff",
                        '&:hover': {
                            backgroundColor: '#8163ff',
                            color: "#fff",
                        },
                    }}>
                    Contact us
                </Button>
            </div>
        </footer>
    );
};

export default Footer;