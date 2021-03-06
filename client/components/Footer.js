import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import MaterialLink from '@mui/material/Link';
import Link from 'next/link'

export default function Footer(props) {

    return (
        <footer>
            <Box p={1} bgcolor="grey.800">
                <Grid container justifyContent="center" alignItems="center" sx={{ my: 2 }}>
                    <Grid item sm={2} >
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item sm={4} textAlign="center">
                                <Link href="/" passHref>
                                    <MaterialLink>
                                        <Typography variant="body" display="flex" component="div" color="primary" textAlign="center" justifyContent="center">
                                            About
                                        </Typography>
                                    </MaterialLink>
                                </Link>
                            </Grid>
                            <Grid item sm={4} textAlign="center">
                                <Link href="/" passHref>
                                    <MaterialLink>
                                        <Typography variant="body" display="flex" component="div" color="primary" textAlign="center" justifyContent="center">
                                            Contact
                                        </Typography>
                                    </MaterialLink>
                                </Link>
                            </Grid>
                            <Grid item sm={4} textAlign="center">
                                <Link href="/" passHref>
                                    <MaterialLink>
                                        <Typography variant="body" display="flex" component="div" color="primary" textAlign="center" justifyContent="center">
                                            Privacy
                                        </Typography>
                                    </MaterialLink>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container justifyContent="center" alignItems="center" >
                    <Grid item sm={1}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item sm={4}>
                                <TwitterIcon color="white" />
                            </Grid>
                            <Grid item sm={4}>
                                <FacebookIcon color="white" />
                            </Grid>
                            <Grid item sm={4}>
                                <YouTubeIcon color="white" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Box justifyContent="center" color="white" textAlign="center">
                    <small>&copy; 2022 Eshop. All rights reserved.</small>

                </Box>
            </Box>
        </footer>
    );
}
