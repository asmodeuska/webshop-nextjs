import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react'
import LaptopIcon from '@mui/icons-material/Laptop';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import MonitorIcon from '@mui/icons-material/Monitor';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AppleIcon from '@mui/icons-material/Apple';

export function New() {
    return (
        <CardContent sx={{p: '4px'}}>
            <Grid container sx={{ flexDirection: 'row-reverse' }} >
                <Box p={.5} sx={{ borderRadius: '8px', background: "#aaaaaa" }}>
                    <Typography align="left" color="neutral.main" variant="caption" style={{ lineHeight: "1.3" }}>
                        New
                    </Typography>
                </Box>
            </Grid>

        </CardContent>
    );
}

export function Laptop() {
    return (
        <CardContent sx={{p: '4px'}}>
            <Grid container sx={{ flexDirection: 'row' }} >
                <Box p={.5} >
                    <LaptopIcon />
                </Box>
            </Grid>

        </CardContent>
    );
}

export function Smartphone() {
    return (
        <CardContent sx={{p: '4px'}}>
            <Grid container sx={{ flexDirection: 'row' }} >
                <Box p={.5}>
                    <SmartphoneIcon />
                </Box>
            </Grid>

        </CardContent>
    );
}

export function Brand() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Box p={.5} sx={{ borderRadius: '8px', background: "#2b9348" }}>
                    <Typography align="left" variant="caption" style={{ lineHeight: "1.3", color: "#ffffff" }}>
                        Trending
                    </Typography>
                </Box>

            </Grid>

        </CardContent>
    );
}

export function Trending() {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Box p={.5} sx={{ borderRadius: '8px', background: "#2b9348" }}>
                    <Typography align="left" variant="caption" style={{ lineHeight: "1.3", color: "#ffffff" }}>
                        Trending
                    </Typography>
                </Box>

            </Grid>

        </CardContent>
    );
}

export function Sale(props) {
    return (
        <CardContent sx={{ pl: "1rem" }}>
            <Grid container>
                <Box p={.5} sx={{ borderRadius: '8px', background: "#ba181b" }}>
                    <Typography align="left" variant="caption" style={{ lineHeight: "1.3", color: "#ffffff" }}>
                        -{props.percentage}%
                    </Typography>
                </Box>

            </Grid>

        </CardContent>
    );
}
