import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { LockOpen } from "@mui/icons-material";

const linkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
}

function Navbar() {

    const onClick = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("userName")
        window.history.go(0)
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
                            <Link style={linkStyle} to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6">
                            {localStorage.getItem("currentUser") == null ? <Link style={linkStyle} to='/auth'>Login/Register</Link> :
                                <div><IconButton onClick={onClick}><LockOpen></LockOpen></IconButton>
                                    <Link style={linkStyle} to={{ pathname: '/users/' + localStorage.getItem("currentUser") }}>Profile</Link>
                                </div>}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
export default Navbar;