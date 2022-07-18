import React, { useEffect, useState } from 'react';
import { TextField, Button, AppBar, Box, Toolbar, IconButton, Typography, Paper, Badge, Grid, Tooltip, FormControl, InputAdornment, Modal } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MaterialLink from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close'
import { auth } from "./Firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Header(props) {

    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
    const [cartSize, setCartSize] = useState(0);
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);
    const [cartSum, setCartSum] = useState(0);
    const menuId = 'primary-search-account-menu';
    const router = useRouter();

    function handleSearch(event) {
        event.preventDefault();
        router.push({
            pathname: '/search',
            query: { q: search },
        })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 2,
    };

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        let quantity = 0;
        let sum = 0;
        if (cartItems) {
            cartItems.map(item => {
                quantity += item.quantity;
                sum += item.price * item.quantity;
            })
        }
        setCart(cartItems);
        setCartSize(quantity);
        setCartSum(sum);
    }, [props.cart]);


    return (
        <AppBar color='grey' position="sticky">
            <Toolbar color='primary' >
                <Grid container>

                    <Grid item xs={5} display='flex' alignItems="center" flexWrap="nowrap">

                        <form className='formFullWidth' onSubmit={handleSearch} style={{ width: "100%" }} >
                            <Box sx={{ width: 1 }} boxSizing="border-box" display="flex" alignItems="center" justifyContent='flex-start' fullWidth>
                                <Box mr={2}>
                                    <Link href="/" passHref>
                                        <MaterialLink color="netural" underline="hover">
                                            <Typography
                                                variant="h6"
                                                display="flex"
                                                component="div"
                                                color="primary"
                                            >
                                                Eshop
                                            </Typography>
                                        </MaterialLink>
                                    </Link>
                                </Box>
                                {props.searchBar &&
                                    <FormControl fullWidth>
                                        <TextField fullWidth InputLabelProps={{ required: false }} required id="searchMain" color="primary" label="Search" variant="filled" InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton type="submit">
                                                        <SearchIcon color='primary' />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                            style: { color: 'white' }
                                        }}
                                            onChange={(e) => setSearch(e.target.value)} />
                                    </FormControl>
                                }
                            </Box>

                        </form>

                    </Grid>
                    <Grid display="flex" item xs={7} alignItems="center">
                        {loading ?
                            <Box sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" alignItems="end" justifyContent='flex-end'>
                                <Skeleton variant="text" />
                            </Box>

                            :
                            <Grid sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" display="flex" justifyContent="flex-end" alignItems="center" m={1}>
                                {user ?
                                    <div display="inline-flex">
                                        <Box display="inline-flex" justifyContent="center" direction="column" alignItems="center">
                                            <Typography variant='h6' color="primary">
                                                Welcome {user.displayName}
                                            </Typography>
                                        </Box>
                                        <IconButton
                                            size="large"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            color="inherit"
                                            edge="end"
                                            onClick={() => { router.push('./dashboard') }}
                                        >
                                            <Tooltip title="Profile">
                                                <AccountCircleIcon />
                                            </Tooltip>
                                        </IconButton>

                                    </div>
                                    :
                                    <Grid item>
                                        <Box display="inline-flex" justifyContent="center" direction="column" alignItems="flex-end">
                                            <Link href="/login" passHref>
                                                <MaterialLink color="primary" underline="hover">
                                                    <Typography variant='h6' >Login</Typography>
                                                </MaterialLink>
                                            </Link>

                                            <Typography variant='h6'>&nbsp;or&nbsp;</Typography>
                                            <Link href="/register" passHref>
                                                <MaterialLink color="primary" underline="hover">
                                                    <Typography variant='h6'>Register</Typography>
                                                </MaterialLink>
                                            </Link>
                                        </Box>
                                    </Grid>
                                }

                                <IconButton size="large" color="inherit" edge="end">
                                    <Badge badgeContent={0} color="error">
                                        <FavoriteIcon />
                                    </Badge>
                                </IconButton>

                                <IconButton size="large" color="inherit" edge="end" onClick={() => setOpen(true)}>
                                    <Badge badgeContent={props.cart || cartSize} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                                {user ?
                                    <IconButton size="large" color="inherit" edge="end" onClick={() => { auth.signOut() }}>
                                        <LogoutIcon />
                                    </IconButton>
                                    : null}
                            </Grid>}
                    </Grid>
                </Grid>
            </Toolbar>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={0.7}>
                    <Box display="inline-flex" width={1} justifyContent="space-between">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Your shopping cart
                        </Typography>
                        <IconButton size="medium" onClick={() => setOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {cartSize > 0 ? cart.map(item => {
                        return (
                            <Box px={5} py={2} display="flex" justifyContent="space-between" alignItems="center" key={item.id}>
                                <Box display="flex" alignItems="center">
                                    <Box>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body1">{item.price}</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box mr={6}>
                                        <Typography variant="body1">x{item.quantity}</Typography>
                                    </Box>
                                    <Typography variant="body1"> {(item.price * item.quantity).toLocaleString()} Ft</Typography>
                                </Box>

                            </Box>
                        )
                    })
                        : null
                    }
                    <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="row-reverse" px={2} py={2}>
                        <Box display="flex" alignItems="center">

                            {cartSize > 0 ?
                                <Box display="inline-flex" alignItems="center">
                                    <Typography variant="body1">Total:&nbsp;</Typography>
                                    <Typography color={"primary"} variant="h6"><b>{cartSum.toLocaleString()} Ft</b></Typography>
                                </Box>
                                :
                                null
                            }
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                        <Link href="/checkout" passHref>
                            <MaterialLink color="primary" underline="hover">
                                <Typography variant="body1">Checkout</Typography>
                            </MaterialLink>
                        </Link>
                    </Box>
                </Box>
            </Modal>

        </AppBar >
    );
}
