import React, { useEffect, useState } from 'react';
import { registerWithEmailAndPassword, } from "../components/Firebase";
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Header from "../components/Header";
import { useSnackbar } from "notistack";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Typography, Button } from "@mui/material";
import Link from 'next/link'


function Search() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div>
      <Container maxWidth="sm">
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
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
          <FormControl sx={{ m: 1, mb: 3, width: '25ch' }} variant="outlined">
            <InputLabel color="secondary" htmlFor="outlined-adornment-password2">Confirm password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password2"
              type={showPassword2 ? 'text' : 'password'}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Password"
              color="secondary"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
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
          <Button
            variant="contained"
            color="secondary"
            onClick={password === password2 ? () => registerWithEmailAndPassword(email, password) : () => enqueueSnackbar("Passwords don't match", {
              variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
            })}
          >
            Sign Up
          </Button>
          <Typography variant="caption" sx={{ my: 2 }}>
            Do you have an account? <Link href="./login">Login here.</Link>
          </Typography>
        </Box >
      </Container >
    </div>
  );
}
export default Search;