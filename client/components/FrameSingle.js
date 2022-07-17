import React, { useEffect, useState } from "react";
import { Box, Grid, Tooltip, Rating, FormControl, InputAdornment, Typography, Button, Divider } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Image from 'next/image';
import Header from './Header';


export default function FrameSingle(props) {

    const ratingCount = props.ratings.length;
    const hasRating = ratingCount > 0;
    const ratingValue = props.ratings.reduce((acc, { value }) => acc + value, 0) / ratingCount;
    const reviewsString = ratingCount + ' ' + (ratingCount === 1 ? 'review' : 'reviews');

    const [cartSize, setCartSize] = useState(0);

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        let newItemInCart = true;
        if (cartItems) {
            cartItems.map(item => {
                if (item.id === props._id) {
                    item.quantity += 1;
                    newItemInCart = false;
                }
            });
        }
        if (newItemInCart) {
            cartItems == null ? cartItems = ([{ id: props._id, quantity: 1 }]) : cartItems.push({ id: props._id, quantity: 1 });
        }
        let temp = 0;
        cartItems.map(item => {
            temp+= item.quantity;
        })
        setCartSize(temp);
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    return (
        <div>
            <Header searchBar={true} cart={cartSize} />
            <Box m={2}>
                <Grid bgcolor={"grey.100"} sx={{ borderRadius: "10px" }} container>
                    <Grid item sm={6} >
                        <Box py={2}>
                            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                                <Image
                                    unoptimized
                                    src={`data:image/jpg;base64, ${Buffer.from(props.image).toString('base64')}`}
                                    alt={props.alt}
                                    layout='fill'
                                    objectFit='contain'
                                />
                            </div>
                        </Box>

                    </Grid>
                    <Divider orientation="vertical" flexItem style={{ marginRight: "-1px" }} />
                    <Grid item sm={6}>
                        <Box mx={1}>
                            <Box pt={2} mx={1} sx={{ bgcolor: 'grey.100', borderWidth: "2px", color: "secondary.main", borderRadius: "15px" }}>
                                <Box textAlign="start">
                                    <Typography color="black" textAlign="center" variant="h4">
                                        <b>{props.title}</b>
                                    </Typography>
                                </Box>

                                <Box my={2} textAlign="start">
                                    <Typography color="black" textAlign="left" variant="body2">
                                        {props.description}
                                    </Typography>
                                </Box>
                                <Divider flexItem />
                                <Box display={"flex"} justifyContent="space-between" alignItems={"flex-end"}>
                                    {hasRating &&
                                        <Box  >
                                            <Tooltip title={reviewsString} arrow>
                                                <Rating name="read-only" precision={0.5} value={ratingValue} readOnly size="medium" />
                                            </Tooltip>
                                            <Typography color="secondary" variant='caption'>
                                                ({ratingCount})
                                            </Typography>
                                        </Box>
                                    }
                                    <Box mt={2} >
                                        <Typography color="secondary" textAlign="right" variant="h4">
                                            <b>{parseInt(props.price).toLocaleString()} {props.currency}</b>
                                        </Typography>
                                    </Box>

                                </Box>
                                <Box my={1} mb={2} display={"flex"} flexDirection={"row-reverse"}>
                                    <FormControl required>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            size="small"
                                            color="primary"
                                            onClick={() => addToCart()}
                                            startIcon={<ShoppingCartIcon />}
                                        >
                                            Add to cart
                                        </Button>
                                    </FormControl>
                                </Box>
                                <Box >
                                    <Grid container direction="row"
                                        justifyContent="space-between"
                                        alignItems="flex-start">
                                        {props.attributes.map(attribute => (
                                            <div key={attribute.name + "_" + attribute.value + "_div"} className="grid_div">
                                                <Grid item sm={4} key={attribute.name}>
                                                    <Typography color="black" textAlign="left" variant="body2">
                                                        <b>{attribute.name}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item sm={4} key={attribute.value}>
                                                    <Typography color="black" textAlign="left" variant="body2">
                                                        {attribute.value}
                                                    </Typography>
                                                </Grid>
                                            </div>
                                        ))}
                                    </Grid>
                                </Box>
                            </Box >
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>

    );
}

