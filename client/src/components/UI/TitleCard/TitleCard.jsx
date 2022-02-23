import React, {useState} from 'react';
import {Card, Rating} from "@mui/material";
import classes from "./TitleCard.module.css"
import Image from "react-bootstrap/Image";
import comic from "../../../assets/comic.jpg"


const TitleCard = ({title, ...props}) => {
    const chapters = 10;
    const lastUpdate = 10;
    const views = "10k";
    const rating = 3.4;
    const [genres, setGenres] = useState(['action', 'adventure', 'thriller'])
    return (
        <Card className={classes.card}>
            <Image src={comic} className={classes.image}/>
            <div className={classes.titleInfo}>
                <p className={classes.text}>{title}</p>
                <hr className={classes.hr}/>
                <div className={classes.genres}>
                    {genres.map(genre => {
                        return <div className={classes.chip} key={genre}>{genre}</div>
                    })}
                </div>
                <div className={classes.summary}>
                    <div className={classes.summaryItem}>{chapters} Chapters</div>
                    <div className={classes.summaryItem}></div>
                    <div className={classes.summaryItem}>{lastUpdate} ago</div>
                    <div className={classes.summaryItem}></div>
                    <div className={classes.summaryItem}>{views} views</div>
                    <div className={[classes.summaryItem, classes.summaryRating].join(' ')}>
                        <p>{rating}</p>
                        <Rating sx={{color: "#6f42c1", height: "calc(.5vh + .5vw)"}} name="half-rating" readOnly
                                defaultValue={rating} precision={0.1}/>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default TitleCard;