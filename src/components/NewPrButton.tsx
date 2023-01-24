import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {NewPrForm} from "./NewPrForm";

export const NewPrButton: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button variant='contained' endIcon={<AddIcon/>} onClick={handleClickOpen}>
                Create PR
            </Button>
            <NewPrForm
                open = {open}
                setOpen = {setOpen}
                handleOpen = {handleClickOpen}
                handleClose = {handleClose}
            />
        </div>
    )
}
