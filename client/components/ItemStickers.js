import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import React from 'react'


export function New() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Typography align="left" variant="h6" style={{ lineHeight: "1.3", background: "#F69931", color: "#00adb5" }}>
                    New
                </Typography>
            </Grid>

        </CardContent>
    );
}

export function Trending() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Typography align="left" variant="h6" style={{ lineHeight: "1.3", background: "#F69931", color: "#00adb5" }}>
                    Trending
                </Typography>
            </Grid>

        </CardContent>
    );
}

export function Recommended() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Typography align="left" variant="h6" style={{ lineHeight: "1.3", background: "#F69931", color: "#00adb5" }}>
                    Recommended
                </Typography>
            </Grid>

        </CardContent>
    );
}

export function Sale() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Typography align="left" variant="h6" style={{ lineHeight: "1.3", background: "#F69931", color: "#00adb5" }}>
                    Sale
                </Typography>
            </Grid>

        </CardContent>
    );
}
