import { Avatar, Button, CardContent, InputAdornment, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    boxShadow: "none",
    color: "white"
}

function CommentForm(props) {
    const { postId, userId, userName } = props;
    const [text, setText] = useState("");
    const saveComment = () => {
        fetch("/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
    }

    const handleChange = (value) => {
        setText(value);
    }

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center"
        }}>
            <OutlinedInput enabled
                id="outlined-adornment-amount"
                multiline
                placeholder="Title"
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i) => handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start">
                        <Link style={linkStyle} to={{ pathname: '/users/' + userId }}>
                            <Avatar aria-label="recipe" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant="contained"
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'
                            }}
                            onClick={handleSubmit}
                        >Comment
                        </Button>
                    </InputAdornment>
                }
                value = {text}
                style={{ color: "black", backGroundColor: "white" }}
            ></OutlinedInput>
        </CardContent>
    )
}

export default CommentForm;