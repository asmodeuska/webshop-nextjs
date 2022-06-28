import React, { useEffect, useState } from 'react';
import { TextField, Button, AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, Grid, Tooltip } from '@mui/material';
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

export default function Header() {

    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [search, setSearch] = useState("");
    const [user, loading] = useAuthState(auth);
    const menuId = 'primary-search-account-menu';
    const router = useRouter();
    return (
        <AppBar color='primary' position="sticky">
            <Toolbar color='primary' >
                <MaterialLink href="../" color="netural" underline="hover">
                    <Typography
                        variant="h6"
                        display="flex"
                        component="div"
                    >
                        Eshop
                    </Typography>
                </MaterialLink>
                <Box sx={{ width: 1 }} display="flex" flexDirection="row" alignItems="center" m={2}>
                    
                    <TextField required fullWidth id="searchMain" color="secondary" label="Search" variant="filled" onChange={(e) => setSearch(e.target.value)} />
                    <Box ml={2}>
                        <Button
                            onClick={() => {
                                router.push({
                                    pathname: '/search',
                                    query: { q: search },
                                })
                            }}
                            color="secondary" variant="contained" startIcon={<SearchIcon />} >Search</Button>
                    </Box>

                </Box>
                {loading ?
                    <Grid sx={{ width: 1 / 3 }} flexWrap="wrap">
                        <Skeleton variant="text" />
                    </Grid>

                    :
                    <Grid sx={{ width: 1 / 3 }} flexWrap="wrap" boxSizing="border-box" display="flex" justifyContent="flex-end" alignItems="center">
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
                                    onClick={() => {router.push('./dashboard') }}
                                >
                                    <Tooltip title="Profile">
                                        <AccountCircleIcon />
                                    </Tooltip>
                                </IconButton>

                            </div>
                            :
                            <Grid item>
                                <Box display="inline-flex" justifyContent="center" direction="column" alignItems="flex-end">
                                    <MaterialLink href="../login" color="secondary" underline="hover">
                                        <Typography variant='h6' >Login</Typography>
                                    </MaterialLink>
                                    <Typography variant='h6'>&nbsp;or&nbsp;</Typography>
                                    <MaterialLink href="../register" color="secondary" underline="hover">
                                        <Typography variant='h6'>Register</Typography>
                                    </MaterialLink>
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


            </Toolbar>
        </AppBar>

    );
}
