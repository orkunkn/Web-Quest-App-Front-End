import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ListItemButton, ListItemSecondaryAction, Modal, Radio } from "@mui/material";
import List from '@mui/material/List';

function Avatar(props) {
    const { avatarId } = props;
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(avatarId);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value)
    }

    return (
        <div>
            <Card sx={{ maxWidth: 345, margin: 5 }}>
                <CardMedia
                    component="img"
                    alt="User Avatar"
                    image={`/avatars/avatar${selectedValue}.jpg`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Username
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User info
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleOpen}>Change Avatar</Button>
                </CardActions>
            </Card>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    maxWidth: 200
                }}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <List dense>
                    {[1, 2, 3, 4, 5, 6].map((key) => {
                        const labelId = `checkbox-list-secondary-label-${key}`;
                        return (
                            <ListItemButton
                                key={key}
                                button
                            >
                                <CardMedia
                                    style={{ maxWidth: 100 }}
                                    component="img"
                                    alt={`Avatar n${key}`}
                                    image={`/avatars/avatar${key}.jpg`}
                                    title="User Avatar"
                                />
                                <ListItemSecondaryAction>
                                    <Radio
                                        edge="end"
                                        value={key}
                                        onChange={handleChange}
                                        checked={"" + selectedValue === "" + key}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Modal>
        </div>
    );
}
export default Avatar;