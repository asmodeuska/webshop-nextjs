import React, { useEffect, useState } from 'react';
import { registerWithEmailAndPassword,auth } from "../components/Firebase";
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useAuthState } from "react-firebase-hooks/auth";
import { useSnackbar } from "notistack";
import { Backdrop, CircularProgress, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Typography, Button } from "@mui/material";
import { useRouter } from 'next/router';
import Link from 'next/link'
import MaterialLink from '@mui/material/Link';
import Header from '../components/Header';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [user, loading] = useAuthState(auth);
  const [loadingNotOpen, handleOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (loading) {
      handleOpen(true);
      return
    }
    else if (user?.uid && !loading) {
      setRedirect(true);
    }
    else {
      handleOpen(false);
    }
  }, [user, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === password2) {
      registerWithEmailAndPassword(email, password, name)
    }
    else {
      enqueueSnackbar("Passwords don't match", {
        variant: 'error', anchorOrigin: {
          vertical: 'bottom', horizontal: 'right'
        }
      })
    }
  };

  return (

    <div style = {{height:"100vh"}}>
      {redirect && router.push('./')}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loadingNotOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header searchBar={false} />
      {!loadingNotOpen && <Container maxWidth="sm">
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
          <Typography sx={{ my: 3 }} variant="h2">Register</Typography>
          <form onSubmit={handleSubmit} >
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary" htmlFor="outlined-name-input">Name</InputLabel>
              <OutlinedInput
                required
                id="outlined-name-input"
                type='text'
                color="secondary"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
              />
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary" htmlFor="outlined-email-input">Email</InputLabel>
              <OutlinedInput
                required
                id="outlined-email-input"
                type='email'
                color="secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
              />
            </FormControl>
            <br />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary" htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                required
                inputProps={{ minLength: 6 }}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
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
            <br />
            <FormControl sx={{ m: 1, mb: 3, width: '25ch' }} variant="outlined">
              <InputLabel color="secondary" htmlFor="outlined-adornment-password2">Confirm password</InputLabel>
              <OutlinedInput
                required
                inputProps={{ minLength: 6 }}
                id="outlined-adornment-password2"
                type={showPassword2 ? 'text' : 'password'}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                color="secondary"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      tabIndex={-1}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword2(!showPassword2)}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
              />
            </FormControl>
            <br />
            <Box textAlign='center'>

              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </form>
          <Typography variant="caption" sx={{ my: 2 }}>
            Do you have an account? 
            <Link href="/login" passHref>
              <MaterialLink color="primary" underline="hover">
                <Typography variant='caption' > Login here.</Typography>
              </MaterialLink>
            </Link>
          </Typography>
        </Box >
      </Container >}


    </div >
  );
}
export default Register;