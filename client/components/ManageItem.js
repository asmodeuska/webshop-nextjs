import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useSnackbar } from "notistack";
import { MenuItem, Skeleton, FormControl, InputLabel, OutlinedInput, Box, Typography, Button, Select, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Firebase";



export default function ManageItem(props) {

    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [attributes, setAttributes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryLoader, setCategoryLoader] = useState(false);
    const [user, loading] = useAuthState(auth);
    const [category, setCategory] = useState('');
    const [userIdToken, setUserIdToken] = useState("");
    const [image, setImage] = useState();
    const [price, setPrice] = useState();
    const [colors, setColors] = useState([]);


    const submitForm = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("name", name);
        form.append("brand", brand);
        form.append("description", description);
        form.append("attributes", JSON.stringify(attributes));
        form.append("category", category);
        form.append("price", price);
        form.append("image", image);

        try {
            fetch("http://localhost:5000/api/addItem", {
                method: "POST",
                body: form,
                headers: {
                    token: userIdToken,
                }
            }).then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Item added successfully", { variant: "success" });
                } else {
                    enqueueSnackbar("Error adding item", { variant: "error" });
                }
            })
        } catch (error) {
            enqueueSnackbar("Error adding item", { variant: "error" });
        }
    }

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
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
                    return res.json()
                }
                throw new Error('Something went wrong');

            }).then(res => {
                console.log(res[0].attributes);
                let temp = [];
                res[0].attributes.map(attribute => {
                    temp.push({ name: attribute, value: "" })
                })
                setAttributes(temp);

            })
        }
        catch (error) {
            enqueueSnackbar("catched something went wrong", {
                variant: "error",
            });
        }
    };
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
                        //copy res to categories
                        setCategories(res);
                        setCategoryLoader(true);
                    })
                }
                catch (error) {
                    console.log(error)
                }



            }).catch(function (error) {
                console.log(error)
            });
        }
    }, [user, loading]);
    console.log(attributes)
    return (
        <Box>
            <Box display="flex" justifyContent="center" alignContent="center" flexDirection="column">
                <Typography variant="h4">Add Item</Typography>
            </Box>
            <Box m={2}>
                <Grid container spacing={1}>
                    <Grid item xs={7}>
                        <Box display="block" justifyContent="left" alignContent="normal" flexDirection="column">
                            <form onSubmit={submitForm}>
                                <Box>
                                    <FormControl required>
                                        <InputLabel htmlFor="name">Name</InputLabel>
                                        <OutlinedInput
                                            required
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            label="Name"
                                        />
                                    </FormControl>
                                    <Box mt={1}>

                                        <FormControl required>
                                            <InputLabel htmlFor="name">Brand</InputLabel>
                                            <OutlinedInput
                                                required
                                                id="brand"
                                                value={brand}
                                                onChange={(e) => setBrand(e.target.value)}
                                                label="Brand"
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box mt={1}>
                                        <FormControl>
                                            <InputLabel htmlFor="description">Description</InputLabel>
                                            <OutlinedInput
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                label="Description"
                                            />
                                        </FormControl>
                                    </Box>
                                </Box>
                                <br />
                                <Box>
                                    {categoryLoader ?
                                        <FormControl required sx={{ my: 1, minWidth: 200 }}>
                                            <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                                            <Select
                                                required
                                                labelId="demo-simple-select-autowidth-label"
                                                id="demo-simple-select-autowidth"
                                                value={category}
                                                onChange={handleCategoryChange}
                                                autoWidth
                                                label="Category"
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category._id} value={category.name}>{category.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        :
                                        <Box>
                                            <Skeleton width={250} height={60} variant="text" />
                                        </Box>
                                    }
                                </Box>
                                <FormControl required>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        size="medium"
                                    >
                                        Upload Image
                                        <input
                                            name="image"
                                            type="file"
                                            onChange={(e) => { setImage(e.target.files[0]) }}
                                            hidden
                                        />
                                    </Button>
                                </FormControl>
                                <Box mt={2}>
                                    <FormControl required>
                                        <InputLabel htmlFor="price">Price</InputLabel>
                                        <OutlinedInput
                                            required
                                            id="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            label="Price"
                                        />
                                    </FormControl>

                                </Box>
                                <Box my={2}>
                                    {attributes.length > 0 ?
                                        <Box display="flex" justifyContent="left" alignContent="normal" flexDirection="column">
                                            {attributes.map((attribute) => (
                                                <Box key={"mainDiv_"+attribute.name} mb={2}>
                                                    <FormControl required key={attribute.name}>
                                                        <InputLabel htmlFor={attribute.name}>{attribute.name}</InputLabel>
                                                        <OutlinedInput
                                                            required
                                                            key={attribute.name}
                                                            id={attribute.name}
                                                            label={attribute.name}
                                                            value={attribute.value}
                                                            onChange={(e) => {
                                                                setAttributes(attributes.map((attr) => {
                                                                    if (attr.name === attribute.name) {
                                                                        return { ...attr, value: e.target.value }
                                                                    }
                                                                    return attr
                                                                }))
                                                            }}

                                                        />
                                                    </FormControl>
                                                </Box>
                                            ))}
                                        </Box>
                                        : null
                                    }
                                </Box>
                                <Box>
                                    <Button type="submit" variant='contained'>Submit</Button>
                                </Box>
                            </form>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Card className="card" sx={{ maxWidth: 600, boxShadow: 10, }}>

                            {image ?
                                <CardMedia
                                    style={{
                                        height: '350px',
                                        maxWidth: '100%',
                                        margin: "auto",
                                        textAlign: "center"
                                    }}
                                >
                                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={name}
                                            layout='fill'
                                            objectFit='contain'
                                        />
                                    </div>
                                </CardMedia>

                                :
                                null
                            }
                            <CardContent sx={{ py: '0', mx: '4' }}>
                                <Typography variant="h6">
                                    <b>{name}</b> - {brand}
                                </Typography>
                                <Typography variant="body2">
                                    <b>Category: </b>{category}
                                </Typography>
                                <Typography variant="caption">
                                    <b>Description:</b> {description}
                                </Typography>

                                {attributes.length > 0 ?
                                    <Box mt={1} display="flex">
                                        <Grid container spacing={1} alignContent="space-between">
                                            {attributes.map((attribute) => (
                                                <div key={"div_"+attribute.name} className='grid_div mt-half ml-1'>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" key={attribute.name}>
                                                            {attribute.name}:
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="body2" key={attribute.name}>
                                                            <b>{attribute.value}</b>
                                                        </Typography>
                                                    </Grid>
                                                </div>
                                            ))}
                                        </Grid>
                                    </Box>
                                    : null
                                }
                                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" alignContent="center">

                                    <Typography style={{
                                        fontWeight: "bold",
                                        textAlign: "right",
                                    }}
                                        variant="body1">
                                        {parseInt(price).toLocaleString()} Ft
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    );
}