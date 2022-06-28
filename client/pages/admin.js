import React, { useEffect, useState } from 'react';
import { logInWithEmailAndPassword, loginInWithGoogle, auth} from "../components/Firebase";
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import { useSnackbar } from "notistack";
import { Backdrop, CircularProgress, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Typography, Button, Divider, Chip } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link'
import { useRouter } from 'next/router'



function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [user, loading] = useAuthState(auth);
    const [redirect, setRedirect] = useState(false);
    const [loadingNotOpen, handleOpen] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const router = useRouter()

    useEffect(() => {
        if (loading) {
            handleOpen(true);
            return
        }
        else if (user?.uid && !loading) {
            handleOpen(false);
            user.getIdToken(true).then(function (idToken) {
                fetch("http://localhost:5000/api/authentication", {
                    method: "POST",
                    headers: {
                        token: idToken,
                    }
                }).then(data => {
                    auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                        if (idTokenResult.claims.admin) {
                            setShowPage(true);
                        }
                    })
                })
            }).catch(function (error) {
                console.log(error)
            });

        }
        else {
            setRedirect(true);
            /*fetch("/api/checkUser")
                .then((res) => res.json())
                .then((data) => setData(data.message));*/
        }
    }, [user, loading]);

    return (
        <div>
            {redirect && router.push('./')}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingNotOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Link href="./">
                <Typography
                    variant="h6"
                    display="flex"
                    component="div"
                >
                    Eshop
                </Typography>
            </Link>
            {!loadingNotOpen && showPage && <Container maxWidth="sm">
                <Box
                    sx={{
                        alignItems: "center",
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        width: 500,
                        mt: 2,
                        backgroundColor: "grey.100",
                    }}>
                    <Typography sx={{ my: 3 }} variant="h2">Admin test</Typography>
                    <Button startIcon={<GoogleIcon color='white' />} sx={{ mt: 5, my: 2 }} variant="contained" color="google" size="large" onClick={loginInWithGoogle}  >Sign in with Google</Button>
                    <Divider flexItem variant="middle" sx={{ m: 0, my: 2 }} >
                        <Chip label="OR" />
                    </Divider>
                    <FormControl sx={{ m: 1, mb: 2, width: '25ch' }} variant="outlined">
                        <InputLabel color="secondary" htmlFor="outlined-email-input">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-email-input"
                            type='text'
                            color="secondary"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            label="Email"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            color="secondary"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => logInWithEmailAndPassword(email, password)}
                    >
                        Sign Up
                    </Button>
                    <Typography variant="caption" sx={{ my: 2 }}>
                        Don&apos;t have an account? <Link href="./register">Register here.</Link>
                    </Typography>
                </Box >
            </Container>
            }

        </div>
    );
}
export default Admin;