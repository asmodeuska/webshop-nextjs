import React, { useEffect, useState } from 'react';
import { TextField, Button, AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, Grid, Tooltip, FormControl } from '@mui/material';
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

export default function Header() {

    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
    const menuId = 'primary-search-account-menu';
    const router = useRouter();

    function handleSearch(event) {
        event.preventDefault();
        router.push({
            pathname: '/search',
            query: { q: search },
        })
    }

    return (
        <AppBar color='primary' position="sticky">
            <Toolbar color='primary' >
                <Grid container>
                    <Grid item xs={6} display='inline-flex' alignItems="center" flexWrap="nowrap">
                        <Link href="/" passHref>
                            <MaterialLink color="netural" underline="hover">
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    component="div"
                                >
                                    Eshop
                                </Typography>
                            </MaterialLink>
                        </Link>
                        <form className='formFullWidth' onSubmit={handleSearch}>
                            <Box sx={{ width: 1 }} boxSizing="border-box" display="inline-flex" alignItems="center" justifyContent='flex-end'>
                                <FormControl>
                                    <Box m={1}>
                                        <TextField InputLabelProps={{ required: false }} required id="searchMain" color="secondary" label="Search" variant="filled" onChange={(e) => setSearch(e.target.value)} />
                                    </Box>
                                </FormControl>
                                <FormControl >
                                    <Box>
                                        <Button type="submit" color="secondary" variant="contained" startIcon={<SearchIcon />} >Search</Button>
                                    </Box>

                                </FormControl>
                            </Box>

                        </form>
                    </Grid>
                    <Grid item xs={6} alignItems="center">
                        {loading ?
                            <Box sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" alignItems="center" justifyContent='flex-end'>
                                <Skeleton variant="text" />
                            </Box>

                            :
                            <Grid sx={{ width: 1 }} flexWrap="nowrap" boxSizing="border-box" display="flex" justifyContent="flex-end" alignItems="center" m={1}>
                                {user ?
                                    <div display="inline-flex">
                                        <Box display="inline-flex" justifyContent="center" direction="column" alignItems="center">
                                            <Typography variant='h6' color="neutral">
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
                                                <MaterialLink color="secondary" underline="hover">
                                                    <Typography variant='h6' >Login</Typography>
                                                </MaterialLink>
                                            </Link>

                                            <Typography variant='h6'>&nbsp;or&nbsp;</Typography>
                                            <Link href="/register" passHref>
                                                <MaterialLink color="secondary" underline="hover">
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
                                    <Badge badgeContent={0} color="error">
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
