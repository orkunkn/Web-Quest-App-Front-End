import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const linkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
}

function Navbar() {

    let userId = 1;
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
                            <Link style={linkStyle} to={{ pathname: '/users/' + userId }}>User</Link>
                        </Typography>
                        <Link to={{ pathname: '/users/' + userId }}></Link>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
export default Navbar;