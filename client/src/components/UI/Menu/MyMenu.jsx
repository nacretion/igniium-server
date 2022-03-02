import * as React from 'react';
import {useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {VisibleContext} from "../../../context";



const ITEM_HEIGHT = 48;


const MyMenu = ({options}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const {setModalSignIn, logout} = useContext(VisibleContext)

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOption = (option) => {
        switch (option) {
            case "Sign in":
                setModalSignIn(true)
                break;
            case "Feed":
                navigate("/")
                break;
            case "Create...":
                navigate("/create")
                break;
            case "Profile":
                navigate("/profile")
                break;
            case "Logout":
                logout()
                break;
        }
        handleClose()
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClickOption(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MyMenu;