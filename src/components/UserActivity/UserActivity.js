import { React, useState, useEffect, forwardRef } from 'react';
import Post from "../Post/Post";
import CloseIcon from '@mui/icons-material/Close';
import { Paper, Table, TableBody, Button, TableContainer, TableHead, TableRow, TableCell, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@mui/material';
import { GetWithAuth } from '../../services/HttpService';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {
    const { isOpen, postId, setIsOpen } = props;
    const [open, setOpen] = useState(isOpen);
    const [post, setPost] = useState();

    const getPost = () => {
        GetWithAuth("/posts/" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setPost(result);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    const handleClose = () => {
        setOpen(false);
        setIsOpen(false);
    };


    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        getPost();
    }, [postId])

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon></CloseIcon>
                    </IconButton>
                    <Typography variant="h6" sx={{
                        marginLeft: 2,
                        flex: 1,
                    }}>
                        Close
                    </Typography>
                </Toolbar>
            </AppBar>
            {post ? <Post likes={post.postLikes} postId={post.id} userId={post.userId} userName={post.userName}
                title={post.title} text={post.text}></Post> : "loading"}
        </Dialog>
    )
}


function UserActivity(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [rows, setRows] = useState([]);
    const { userId } = props;
    const [isOpen, setIsOpen] = useState();
    const [selectedPost, setSelectedPost] = useState();

    const handleNotification = (postId) => {
        setSelectedPost(postId);
        setIsOpen(true);
    };

    const getActivity = () => {
        GetWithAuth("/users/activity/" + userId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    console.log(result);
                    setRows(result)
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getActivity()
    }, [])


    return (
        <div>
            {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{
                    maxHeight: 440,
                    minWidth: 100,
                    maxWidth: 800,
                    marginTop: 50,
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                User Activity
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <Button onClick={() => handleNotification(row[1])}>
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                            <TableCell align="right">
                                                {row[3] + " " + row[0] + " your post"}
                                            </TableCell>
                                        </TableRow>
                                    </Button>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

export default UserActivity;