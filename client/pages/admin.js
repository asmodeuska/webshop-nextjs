import React, { useEffect, useState } from 'react';
import { logInWithEmailAndPassword, loginInWithGoogle, auth } from "../components/Firebase";
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import { useSnackbar } from "notistack";
import { Backdrop, CircularProgress, Tab, Tabs, FormControl, InputLabel, OutlinedInput, InputAdornment, Box, Typography, Button, Divider, Chip } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useAuthState } from "react-firebase-hooks/auth";
import Link from 'next/link'
import MaterialLink from '@mui/material/Link';
import { useRouter } from 'next/router'
import Header from '../components/Header';
import ManageItem from '../components/ManageItem';
import ManageCategory from '../components/ManageCategory';
import ManageAttribute from '../components/ManageAttribute';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}



function Admin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [user, loading] = useAuthState(auth);
    const [redirect, setRedirect] = useState(false);
    const [loadingNotOpen, handleOpen] = useState(true);
    const [showPage, setShowPage] = useState(false);
    const router = useRouter()
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    useEffect(() => {
        if (user?.uid && !loading) {
            handleOpen(false);
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
                                    setShowPage(true);
                                }
                            })
                        }
                        else {
                            enqueueSnackbar("You are not authorized to access this page", { variant: "error" });
                            router.push("/");
                        }
                    })
                }
                catch (error) {
                    console.log(error)
                }

            }).catch(function (error) {
                console.log(error)
            });

        }
        if (!loading && !user) {
            setRedirect(true);
        }
    }, [user, loading]);

    if (user?.uid && !loading && showPage) {
        return (
            <div>
                <Header searchBar={false} />
                <Box display="flex" justifyContent="center" flexWrap="wrap" flexDirection="column" alignItems="center">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Manage Items" value="1" />
                                <Tab label="Manage Cattegories" value="2" />
                                <Tab label="Manage Attributes" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel sx={{width: "80%"}} value="1"><ManageItem /></TabPanel>
                        <TabPanel sx={{width: "80%"}} value="2"><ManageCategory /></TabPanel>
                        <TabPanel sx={{width: "80%"}} value="3"><ManageAttribute /></TabPanel>
                    </TabContext>
                </Box>
            </div>
        );
    }
    else if (loading) {
        return <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loadingNotOpen}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    else if (redirect) {
        router.push('/')
    }
}
export default Admin;