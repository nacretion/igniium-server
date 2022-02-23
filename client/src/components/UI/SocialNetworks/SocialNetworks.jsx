import React from 'react';
import classes from "./SocialNetworks.module.css";
import InstaLink from "./SocialNetworksLinks/InstaLink";
import TwitchLink from "./SocialNetworksLinks/TwitchLink";
import TwitterLink from "./SocialNetworksLinks/TwitterLink";
import YoutubeLink from "./SocialNetworksLinks/YoutubeLink";
import DiscordLink from "./SocialNetworksLinks/DiscordLink";

const SocialNetworks = () => {

    return (
        <div className={classes.socNetworksWrapper}>
            <InstaLink target="_blank"/>
            <TwitterLink target="_blank"/>
            <YoutubeLink target="_blank"/>
            <DiscordLink target="_blank"/>
            <TwitchLink target="_blank"/>
        </div>
    );
};

export default SocialNetworks;