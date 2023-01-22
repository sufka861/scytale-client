import * as React from 'react';
import {useForm, Controller} from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Autocomplete, Chip, FormControlLabel, FormLabel, Radio, RadioGroup, useTheme} from "@mui/material";
import {useState} from "react";

export default function NewPrButton() {
    const [open, setOpen] = React.useState(false);
    const {handleSubmit, reset, setValue, control} = useForm();
    const [data, setData] = useState(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Create PR
            </Button>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
                <form onSubmit={handleSubmit(({data}) => {
                    setData(data);
                    console.log(data)
                })}>
                    <DialogTitle>Create new pull request</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the pull request details
                        </DialogContentText>
                        <Controller
                            render={({field}) => <TextField {...field}
                                                            required
                                                            autoFocus
                                                            // value={}
                                                            margin="dense"
                                                            id="title"
                                                            label="Title"
                                                            type="string"
                                                            fullWidth
                                                            variant="standard"
                            />}
                            name="TextField"
                            control={control}
                        />
                        {/*<TextField*/}
                        {/*    required*/}
                        {/*    autoFocus*/}
                        {/*    margin="dense"*/}
                        {/*    id="title"*/}
                        {/*    // value={value}*/}
                        {/*    label="Title"*/}
                        {/*    type="string"*/}
                        {/*    fullWidth*/}
                        {/*    variant="standard"*/}
                        {/*    // onChange={handleChange}*/}
                        {/*/>*/}

                        <TextField
                            margin="dense"
                            id="description"
                            // value={value}
                            label="Description"
                            type="string"
                            fullWidth
                            variant="standard"
                            multiline
                            maxRows={4}
                            // onChange={handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="firstName"
                            // value={value}
                            label="First Name"
                            type="string"
                            fullWidth
                            variant="standard"
                            // onChange={handleChange}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="lastName"
                            // value={value}
                            label="Last name"
                            type="string"
                            fullWidth
                            variant="standard"
                            // onChange={handleChange}
                        />
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="open"
                            // value={value}
                            // onChange={handleChange}
                        >
                            <FormControlLabel value="open" control={<Radio/>} label="Open"/>
                            <FormControlLabel value="closed" control={<Radio/>} label="Closed"/>
                            <FormControlLabel value="draft" control={<Radio/>} label="Draft"/>
                        </RadioGroup>
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            freeSolo
                            options={[]}
                            renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="filled"
                                    label="Labels"
                                    placeholder="Label"
                                />
                            )}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} type="submit">Create PR</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}