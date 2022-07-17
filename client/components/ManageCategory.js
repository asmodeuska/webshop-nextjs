import React, { useEffect, useState } from 'react';
import { useSnackbar } from "notistack";
import { Button, MenuItem, Skeleton, FormControl, InputLabel, OutlinedInput, Chip, Box, Typography, Stack, Select, Divider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";

export default function ManageCategory(props) {
    const { enqueueSnackbar } = useSnackbar();
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [addCategoryValue, setAddCategoryValue] = useState("");
    const [categoryLoader, setCategoryLoader] = useState(false);
    const [modifyAttribueLoader, setModifyAttribueLoader] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [deleteCategory, setDeleteCategory] = useState('');
    const [userIdToken, setUserIdToken] = useState("");
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    function handleSelectChange(event) {
        const {
            target: { value },
        } = event;
        setSelectedAttributes(
            typeof value === 'string' ? value.split(',') : value,
        );
    }


    const onDeleteCategoryButtonClick = (event) => {
        try {
            let temp = [];
            temp.push({ name: deleteCategory });
            fetch("http://localhost:5000/api/deleteCategory", {
                method: "POST",
                headers: {
                    token: userIdToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(temp)
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Category deleted successfully", {
                        variant: "success",
                    });
                }
                else {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                }

            });
        }
        catch (error) {
            enqueueSnackbar("catched something went wrong", {
                variant: "error",
            });
        }
    }

    const handleCategoryChange = (event) => {
        setCategoryName(event.target.value);
        setModifyAttribueLoader(false)
        try {
            fetch("http://localhost:5000/api/getAttributesByCategory", {
                method: "POST",
                headers: {
                    token: userIdToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ category: event.target.value })
            }).then(res => {
                if (res.status === 200) {
                    setModifyAttribueLoader(true);
                    return res.json()
                }
                throw new Error('Something went wrong');

            }).then(res => {
                setSelectedAttributes(res[0].attributes);
            })
        }
        catch (error) {
            enqueueSnackbar("catched something went wrong", {
                variant: "error",
            });
        }
    };

    const onModifyButtonClick = () => {
        let temp = [];
        temp.push({ name: categoryName })
        temp.push({ attr: { attributes: selectedAttributes } });
        try {
            fetch("http://localhost:5000/api/updateCategory", {
                method: "POST",
                headers: {
                    token: userIdToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(temp)
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Category modified successfully", {
                        variant: "success",
                    });
                }
                else {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                }

            });
        }
        catch (error) {
            enqueueSnackbar("Something went wrong", {
                variant: "error",
            });
        }
    }

    const onAddCategoryButtonClick = () => {
        try {
            let temp = [];
            temp.push({ name: addCategoryValue });
            fetch("http://localhost:5000/api/addCategory", {
                method: "POST",
                headers: {
                    token: userIdToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(temp)
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Category added successfully", {
                        variant: "success",
                    });
                }
                else {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                }

            });
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
                    fetch("http://localhost:5000/api/getCategories", {
                        method: "POST",
                        headers: {
                            token: idToken,
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            return res.json()
                        }
                        throw new Error('Something went wrong');

                    }).then(res => {
                        setCategories(res);
                        setCategoryLoader(true);
                    })
                }
                catch (error) {
                    enqueueSnackbar("Something went wrong", {
                        variant: "error",
                    });
                }

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
                    enqueueSnackbar("catched something went wrong", {
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
        <Box>
            <Box mt={2} display="flex" justifyContent="center" flexDirection="column" alignContent="center" alignItems="center">
                <Typography variant="h4">Categories</Typography>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column" alignContent="center" alignItems="center" >
                <Box display="flex" alignItems="center" flexDirection="column" width="100%" sx={{
                    '&:hover': {
                        backgroundColor: "grey.200",
                    },
                }}>
                    <Stack m={2} spacing={1} sx={{ width: 500 }}>
                        {categoryLoader ?
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Categories</InputLabel>
                                <Select
                                    id="demo-simple-select-autowidth"
                                    value={categoryName}
                                    onChange={handleCategoryChange}
                                    label="Categories"
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            :
                            <Box sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" alignItems="center" justifyContent='flex-end'>
                                <Skeleton variant="text" />
                            </Box>
                        }
                    </Stack>
                    <br />
                    <Box >
                        <Typography variant="h6">Attributes of {categoryName}</Typography>

                        {modifyAttribueLoader ?
                            <Stack m={2} sx={{ width: 500 }}>
                                <FormControl>
                                    <InputLabel variant="outlined" id="demo-multiple-chip-label">Add or remove attributes</InputLabel>
                                    <Select
                                        id="demo-multiple-chip"
                                        multiple
                                        disabled={!modifyAttribueLoader}
                                        value={selectedAttributes}
                                        onChange={handleSelectChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Add or remove attributes" />}
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
                            </Stack>
                            :
                            <Box sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" alignItems="center" justifyContent='flex-end'>
                                <Skeleton variant="text" />
                            </Box>
                        }
                    </Box>
                    <Box m={2} display="flex" justifyContent="center">
                        <FormControl>
                            <Button variant="contained" color="primary" type="button" onClick={() => onModifyButtonClick()}>Modify Category</Button>
                        </FormControl>
                    </Box>
                </Box>
                <Divider variant="middle" style={{ width: '100%' }} />
                <Box display="flex" alignItems="center" flexDirection="column" width="100%" sx={{
                    '&:hover': {
                        backgroundColor: "grey.200",
                    },
                }}>

                    <Stack mt={2} sx={{ width: 500 }}>
                        <FormControl sx={{ m: 0, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Add Category</InputLabel>
                            <OutlinedInput
                                id="demo-simple-select-autowidth"
                                onChange={e => setAddCategoryValue(e.target.value)}
                                label="Add category"
                            >
                            </OutlinedInput>
                        </FormControl>
                    </Stack>
                    <br />
                    <Box mb={2} display="flex" justifyContent="center">
                        <FormControl>
                            <Button variant="contained" color="primary" type="button" onClick={() => onAddCategoryButtonClick()}>Add Category</Button>
                        </FormControl>
                    </Box>
                </Box>
                <Divider variant="middle" style={{ width: '100%' }} />
                <Box display="flex" alignItems="center" flexDirection="column" width="100%" sx={{
                    '&:hover': {
                        backgroundColor: "grey.200",
                    },
                }}>
                    <Stack mt={2} sx={{ width: 500 }}>
                        <FormControl sx={{ m: 0, minWidth: 200 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Delete Category</InputLabel>
                            <Select
                                id="demo-simple-select-autowidth"
                                value={deleteCategory}
                                onChange={(e) => setDeleteCategory(e.target.value)}
                                label="Delete category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <br />
                    <Box mb={2} display="flex" justifyContent="center">
                        <FormControl>
                            <Button variant="contained" color="warning" type="button" onClick={() => onDeleteCategoryButtonClick()}>Delete Category</Button>
                        </FormControl>
                    </Box>
                </Box >
            </Box>
        </Box>
    );
}