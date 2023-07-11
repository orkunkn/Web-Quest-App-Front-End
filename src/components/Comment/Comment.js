import { Avatar, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
}

function Comment(props) {
    const { text, userId, userName } = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <OutlinedInput disabled
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={linkStyle} to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style={{ color: "black", backGroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default Comment;