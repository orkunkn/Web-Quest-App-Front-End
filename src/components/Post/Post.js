import React, { useRef, useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import CommentForm from "../Comment/CommentForm";
import Comment from "../Comment/Comment";

function Post(props) {
    const { title, text, userId, userName, postId, likes } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length)
    const isInitialMount = useRef(true);
    const [likeId, setLikeId] = useState(null);
    let disabled = localStorage.getItem("currentUser") == null ? true : false

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList)
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            saveLike();
            setLikeCount(likeCount + 1)
        }

        else {
            deleteLike();
            setLikeCount(likeCount - 1)
        }
    }

    const refreshComments = () => {
        fetch("/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(true);
                }
            )
    }
    const saveLike = () => {
        fetch("/likes",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("tokenKey")
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: localStorage.getItem("currentUser"),
                }),
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey")
            },
        })
            .catch((err) => console.log("error"))
    }

    const checkLikes = () => {
        var likeControl = likes.find(like => "" + like.userId === localStorage.getItem("currentUser"));
        if (likeControl != null) {
            setLikeId(likeControl.id)
            setIsLiked(true);
        }
    }

    useEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            refreshComments();
    }, [commentList])

    useEffect(() => { checkLikes() }, [])
    return (
        <Card sx={{
            width: 800,
            textAlign: "left",
            margin: 20
        }}>
            <CardHeader
                avatar={
                    <Link sx={{
                        textDecoration: "none",
                        boxShadow: "none",
                        color: "white"
                    }} to={{ pathname: '/users/' + userId }}>
                        <Avatar sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                            {userName.charAt(0).toUpperCase()}
                        </Avatar>
                    </Link>
                }
                title={title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {disabled ?
                    <IconButton
                        disabled
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                    </IconButton> :
                    <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites">
                        <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        {likeCount}
                    </IconButton>
                }
                <IconButton
                    sx={{
                        transform: 'rotate(0deg)',
                        marginLeft: 'auto'
                    }}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <CommentIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Container fixed>
                    {error ? "error" :
                        isLoaded ? commentList.map(comment => (
                            <Comment userId={1} userName={"USER"} text={comment.text}></Comment>
                        )) : "Loading"}
                    {disabled ? "" :
                        <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId}></CommentForm>}
                </Container>
            </Collapse>
        </Card>
    );
}

export default Post;