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
import {
    Autocomplete,
    Chip,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    useRadioGroup,
    useTheme
} from "@mui/material";
import {useState} from "react";
import AddIcon from '@mui/icons-material/Add';
import {useMutation, useQueryClient} from "react-query";
import axios from "axios";
import {PrTable} from "./PrTable";

export default function PrForm() {
    const [open, setOpen] = React.useState(false);
    const defaultValues = {
        title: '',
        description: '',
        firstName: '',
        lastName: '',
        status: 'Open',
        labels: ['']
    };
    const {handleSubmit, reset, setValue, control} = useForm({defaultValues});

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addPr = (data: any) => {
        return axios.post(`http://localhost:4000/prs`, data)
            .then(function (response) {
                    reset(defaultValues);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const useAddPr = () => {
        const queryClient = useQueryClient()
        return useMutation(addPr, {
            onSuccess: (data, variables) => {
                queryClient.invalidateQueries(["prs"]);
            },
            onError: (error) => {
                console.log(error);
            },
        })
    }
    const {mutate} = useAddPr();

    const sendForm = (values: any) => {
        const dataObjToPost = {
            title: values.title,
            description: values.description,
            author: {
                firstName: values.firstName,
                lastName: values.lastName
            },
            status: values.status,
            labels: values.labels.filter((label: string) => label != '')
        }
        mutate(dataObjToPost);
    }

    const radioGroup = useRadioGroup();

    return (
        <div>
            <Button variant="contained" endIcon={<AddIcon/>} onClick={handleClickOpen}>
                Create PR
            </Button>
            <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
                <form onSubmit={handleSubmit(sendForm)}>
                    <DialogTitle>Create new pull request</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the pull request details
                        </DialogContentText>
                        <Controller
                            name="title"
                            control={control}
                            render={({field}) => <TextField
                                {...field}
                                required
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Title"
                                type="string"
                                fullWidth
                                variant="standard"
                            />}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => <TextField
                                {...field}
                                autoFocus
                                margin="dense"
                                id="description"
                                label="Description"
                                type="string"
                                fullWidth
                                variant="standard"
                                multiline
                                maxRows={4}
                            />}
                        />

                        <Controller
                            name="firstName"
                            control={control}
                            render={({field}) => <TextField
                                {...field}
                                required
                                margin="dense"
                                id="firstName"
                                label="First Name"
                                type="string"
                                fullWidth
                                variant="standard"
                            />}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({field}) => <TextField
                                {...field}
                                required
                                margin="dense"
                                id="lastName"
                                label="Last name"
                                type="string"
                                fullWidth
                                variant="standard"
                            />}
                        />
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                        <Controller
                            name="status"
                            control={control}
                            defaultValue="Open"
                            render={({field}) => (
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    // defaultValue="open"
                                    {...field}
                                >
                                    <FormControlLabel value="Open" control={<Radio/>} label="Open"/>
                                    <FormControlLabel value="Closed" control={<Radio/>} label="Closed"/>
                                    <FormControlLabel value="Draft" control={<Radio/>} label="Draft"/>
                                </RadioGroup>
                            )}
                        />
                        <Controller
                            name="labels"
                            control={control}
                            render={({field}) => (
                                <Autocomplete
                                    {...field}
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
                                    onChange={(_, data) => field.onChange(data)}
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