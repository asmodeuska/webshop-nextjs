import React, { useEffect, useState } from 'react';
import { TextField, Button, AppBar, Box, Toolbar, IconButton, Typography, Paper, Badge, Grid, Tooltip, FormControl, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MaterialLink from '@mui/material/Link';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from "./Firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/router';
import Link from 'next/link'

export default function Header(props) {

    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
    const [cartSize, setCartSize] = useState(0);
    const menuId = 'primary-search-account-menu';
    const router = useRouter();

    function handleSearch(event) {
        event.preventDefault();
        router.push({
            pathname: '/search',
            query: { q: search },
        })
    }

    
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'));
        let temp = 0;
        if (cartItems) {
            cartItems.map(item => {
                temp+= item.quantity;
            })
        }
        setCartSize(temp);
    }, []);


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

                                <IconButton size="large" color="inherit" edge="end">
                                    <Badge badgeContent={ props.cart || cartSize } color="error">
                                        <ShoppingBasketIcon />
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
        </AppBar >
    );
}
