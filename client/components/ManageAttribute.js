import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { InputLabel, Chip, MenuItem, Skeleton, FormControl, Select, OutlinedInput, Autocomplete, Box, Typography, Button, TextField, Stack } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

export default function ManageAttribute(props) {
    const [attributes, setAttributes] = useState([]);
    const [attribueLoader, setModifyAttribueLoader] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [userIdToken, setUserIdToken] = useState("");
    const [autoCompleteValue, setAutoCompleteValue] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedAttributes(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    const onDeleteButtonClick = () => {
               
        try {
            fetch("http://localhost:5000/api/deleteAttributes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: userIdToken,
                },
                body: JSON.stringify(selectedAttributes)
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Attribute(s) deleted successfully", {
                        variant: "success",
                    });
                }
            })

        }
        catch (error) {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            });
        }
    }

    const onAddButtonClick = () => {

        let attr = [];
        autoCompleteValue.forEach(element => {
            attr.push({name: element})
        });
        try {
            fetch("http://localhost:5000/api/addAttributes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: userIdToken,
                },
                body: JSON.stringify( attr )
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Attribute(s) added successfully", {
                        variant: "success",
                    });
                    
                }
            })

        }
        catch (error) {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            });
        }
    }

    useEffect(() => {
        if (user?.uid && !loading) {
            user.getIdToken(true).then(function (idToken) {
                setUserIdToken(idToken);

                try {
                    fetch("http://localhost:5000/api/getAttributes", {
                        method: "POST",
                        headers: {
                            token: idToken,
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            setModifyAttribueLoader(true);
                            return res.json()
                        }
                        throw new Error('Something went wrong');

                    }).then(res => {
                        setAttributes(res);
                    })
                }
                catch (error) {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                }

            }).catch(function (error) {
                enqueueSnackbar("Authentication error", {
                    variant: "error",
                });
            });
        }
    }, [user, loading]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" alignContent="center">
            <Box m={2}>
                <Box display="flex" justifyContent="center" flexDirection="column" alignContent="center" alignItems="center">
                    <Typography variant="h4">Attributes</Typography>
                    <Typography variant="caption">Add/remove predefined attributes to the database</Typography>
                </Box>
                {attribueLoader ?
                    <Box
                        sx={{
                            alignItems: "center",
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: "center",
                            width: 500,
                            mt: 2,
                        }}
                    >

                        <Stack spacing={1} sx={{ width: 500 }}>
                            <FormControl>
                                <Autocomplete
                                    multiple
                                    id="tags-outlined"
                                    disabled={!attribueLoader}
                                    value={autoCompleteValue}
                                    getOptionDisabled={option => true}
                                    options={[]}
                                    freeSolo
                                    onChange={(e, newval, reason) => {
                                        setAutoCompleteValue(newval);
                                    }}
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            label="Add Attributes"
                                            placeholder="Add attributes"
                                            onKeyDown={e => {
                                                if (e.code === "Enter" && e.target.value) {
                                                    setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </FormControl>
                            <Box mt={2} display="flex" justifyContent="center">
                                <FormControl>
                                    <Button variant="contained" color="primary" type="button" onClick={() => onAddButtonClick()}>Add Attributes</Button>
                                </FormControl>
                            </Box>
                        </Stack>

                        <Stack spacing={1} sx={{ width: 500, mt: 5 }}>
                            <FormControl>
                                <InputLabel variant="outlined" id="demo-multiple-chip-label">Remove attributes</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={selectedAttributes}
                                    onChange={handleSelectChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Remove attributes" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {attributes.map((e) => (
                                        <MenuItem
                                            key={e._id}
                                            value={e.name}

                                        >
                                            {e.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Box mt={2} display="flex" justifyContent="center">
                                <FormControl>
                                    <Button variant="contained" color="warning" type="button" onClick={() => onDeleteButtonClick()}>Delete Attributes</Button>
                                </FormControl>
                            </Box>
                        </Stack>

                    </Box>
                    :
                    <Box sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" alignItems="center" justifyContent='flex-end'>
                        <Skeleton variant="text" />
                    </Box>
                }
            </Box>
        </Box>
    );
}