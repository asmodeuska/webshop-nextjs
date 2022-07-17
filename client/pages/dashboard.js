import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, updateEmail, updateName, updatePicture, updatePhoneNumber, reauthWithGoogle, reautWithPassword } from "../components/Firebase";
import { Paper, Modal, Avatar, Divider, Grid, TextField, Backdrop, CircularProgress, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Typography, Button } from "@mui/material";
import { useRouter } from 'next/router';
import Header from '../components/Header';


function Dashboard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const [loadingNotOpen, handleOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [cancelDisabled, setCancelDisabled] = useState(true);
    const [originalName, setOriginalName] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");
    const [originalPhone, setOriginalPhone] = useState("");
    const [passwordChangeDisabled, setPasswordChangeDisabled] = useState(true);
    const [pictureChangeDisabled, setPictureChangeDisabled] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [admin, setAdmin] = useState(false);
    const router = useRouter();

    const resetForm = () => {
        setEmail(originalEmail);
        setName(originalName);
        setPhone(originalPhone);
    }

    const deleteAccount = () => {

        if (auth.currentUser.providerData[0].providerId === "google.com")
            reauthWithGoogle();
        else if (auth.currentUser.providerData[0].providerId === "password") {
            reautWithPassword(confirmationPassword);
        }
    }

    useEffect(() => {

        if (originalEmail !== email || originalName !== name || originalPhone !== phone) {
            setSubmitDisabled(false);
            setCancelDisabled(false);
        }
        else {
            setSubmitDisabled(true);
            setCancelDisabled(true);
        }
    }, [email, name, phone]);

    useEffect(() => {
        if (loading) {
            handleOpen(true);
            return
        }
        else if (user?.uid && !loading) {
            user.getIdToken(true).then(function (idToken) {
                try {
                    fetch("http://localhost:5000/api/authenticate", {
                        method: "POST",
                        headers: {
                            token: idToken,
                        }
                    }).then(data => {
                        if (data.status === 200) {
                            auth.currentUser.getIdTokenResult().then((idTokenResult) => {
                                if (idTokenResult.claims.admin) {
                                    setAdmin(true)
                                }
                            })
                        }
                    })
                }
                catch (error) {
                    console.log(error)
                }

            }).catch(function (error) {
                console.log(error)
            });

            handleOpen(false);
            setOriginalName(user.displayName);
            setOriginalEmail(user.email);
            if (!user.phoneNumber) {
                setOriginalPhone("");
            }
            else {
                setOriginalPhone(user.phoneNumber);
            }
            setEmail(user.email);
            setName(user.displayName);
            if (!user.phoneNumber) {
                setPhone("");
            }
            else {
                setPhone(user.phoneNumber);
            }
            if (auth.currentUser.providerData[0].providerId === "google.com") {
                setPasswordChangeDisabled(true);
                setPictureChangeDisabled(true);
            }
            else {
                setPasswordChangeDisabled(false);
                setPictureChangeDisabled(false);
            }
        }
        else if (!loading) {
            setRedirect(true);
        }

    }, [user, loading]);

    const handleSubmit = (event) => {
        if (name !== originalName) {
            updateName(name);
        }
        if (email !== originalEmail) {
            updateEmail(email);
        }
        if (phone !== originalPhone) {
            updatePhoneNumber(phone);
        }
    };

    if (user?.uid && !loading) {
        return (
            <Paper>
                <Header />
                <Box mt={2}>
                    <Container fixed>
                        <Grid
                            container
                            backgroundColor="grey.300"
                            spacing={1}
                            alignItems="stretch"
                            py={2}
                        >
                            <Grid item p={0} xs={6}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    p={2}
                                    flexWrap="inherit"
                                >
                                    <form style={{ display: "contents" }} onSubmit={handleSubmit} >
                                        <FormControl variant="outlined" fullWidth>
                                            <Typography variant="h6" flexDirection="column" alignItems="center" display="flex" component="div" >
                                                User Information
                                            </Typography>
                                        </FormControl>
                                        <Divider flexItem variant="middle" sx={{ m: 0, my: 2 }} />
                                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                            <TextField
                                                id="name"
                                                label="Name"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                variant="standard"
                                            />
                                        </FormControl>
                                        <br />
                                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                            <TextField
                                                id="email"
                                                label="Email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                                variant="standard"
                                                type="email"
                                            />
                                        </FormControl>
                                        <br />
                                        <FormControl sx={{ m: 1 }} fullWidth variant="outlined">
                                            <TextField
                                                id="phone"
                                                label="Phone"
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                                variant="standard"
                                                type="phone"
                                            />
                                        </FormControl>
                                        <br />
                                        <Box textAlign='center' m={2}>
                                            <Box sx={{ display: 'inline' }} m={2}>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    type="submit"
                                                    disabled={submitDisabled}
                                                >
                                                    Save
                                                </Button>
                                            </Box>
                                            <Box sx={{ display: 'inline' }} m={2}>
                                                <Button
                                                    variant="contained"
                                                    color="neutral"
                                                    type="button"
                                                    disabled={cancelDisabled}
                                                    onClick={resetForm}
                                                >
                                                    Cancel
                                                </Button>
                                            </Box>
                                        </Box>
                                    </form>
                                </Grid>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item p={0} xs>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    p={2}
                                    flexWrap="inherit"
                                >
                                    <form style={{ display: "contents" }} onSubmit={handleSubmit} >
                                        <FormControl variant="outlined" fullWidth>
                                            <Typography alignItems="center" variant="h6" flexDirection="column" display="flex" component="div" >
                                                User Settings
                                            </Typography>
                                        </FormControl>

                                        <Divider flexItem variant="middle" sx={{ m: 0, my: 2 }} />
                                        <Box mb={4}>
                                            <Avatar alt={name} src={auth.currentUser ? auth.currentUser.photoURL : null} sx={{ width: 80, height: 80 }} ></Avatar>
                                        </Box>
                                        <Box m={1}>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                type="button"
                                                onClick={resetForm}
                                                disabled={passwordChangeDisabled}
                                            >
                                                Change password
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                type="button"
                                                onClick={resetForm}
                                                disabled={pictureChangeDisabled}
                                            >
                                                Change profile picture
                                            </Button>
                                        </Box>
                                        <Modal
                                            open={openModal}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                width: 500,
                                                bgcolor: 'background.paper',
                                                border: '2px solid #000',
                                                boxShadow: 24,
                                                p: 4
                                            }}>

                                                {auth.currentUser && auth.currentUser.providerData[0].providerId === "google.com" ?
                                                    <Box>
                                                        <Typography id="modal-modal-title" variant="h6" textAlign="center" component="h2" mb={5}>
                                                            Are you sure you want to delete your account?
                                                        </Typography>
                                                        <Box textAlign='center' m={2}>
                                                            <Box sx={{ display: 'inline' }} m={2}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    type="button"
                                                                    onClick={() => deleteAccount()}
                                                                >
                                                                    Yes
                                                                </Button>
                                                            </Box>
                                                            <Box sx={{ display: 'inline' }} m={2}>
                                                                <Button variant="contained"
                                                                    color="primary"
                                                                    type="button"
                                                                    onClick={() => setOpenModal(false)}
                                                                >
                                                                    No
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box>
                                                        <Typography id="modal-modal-title" variant="h6" textAlign="center" component="h2" mb={5}>
                                                            Please give us your password to delete your account.
                                                        </Typography>
                                                        <Box textAlign='center' m={2}>
                                                            <FormControl>
                                                                <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
                                                                <OutlinedInput
                                                                    inputProps={{ minLength: 6 }}
                                                                    id="outlined-adornment-password"
                                                                    type={showConfirmationPassword ? 'text' : 'password'}
                                                                    value={confirmationPassword}
                                                                    onChange={(e) => setConfirmationPassword(e.target.value)}
                                                                    color="secondary"
                                                                    label="Password"
                                                                    endAdornment={
                                                                        <InputAdornment position="end">
                                                                            <IconButton
                                                                                tabIndex={-1}
                                                                                aria-label="toggle password visibility"
                                                                                onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
                                                                                edge="end"
                                                                            >
                                                                                {showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
                                                                            </IconButton>
                                                                        </InputAdornment>
                                                                    }
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                        <Box textAlign='center' m={2}>
                                                            <Box sx={{ display: 'inline' }} m={2}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="error"
                                                                    type="button"
                                                                    onClick={() => deleteAccount()}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Box>
                                                            <Box sx={{ display: 'inline' }} m={2}>
                                                                <Button variant="contained"
                                                                    color="primary"
                                                                    type="button"
                                                                    onClick={() => setOpenModal(false)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                }
                                            </Box>
                                        </Modal>
                                        {admin ?
                                            <Box mt={1} mx={3}>
                                                <Button
                                                    variant="contained"
                                                    color="neutral"
                                                    type="button"
                                                    onClick={() => router.push("/admin")}
                                                >
                                                    Admin page
                                                </Button>
                                            </Box> : null
                                        }
                                        <Box m={3}>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                type="button"
                                                onClick={() => setOpenModal(true)}
                                            >
                                                Delete my account
                                            </Button>
                                        </Box>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Container >
                </Box>
            </Paper >
        );
    }
    else if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingNotOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
    else if (redirect) {
        router.push("/");
    }

}
export default Dashboard;