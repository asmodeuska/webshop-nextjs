import * as React from 'react';
import Grid from "@mui/material/Grid";
import ItemContainer from './ItemContainer';
import CarouselBig from './CarouselBig';


export default function Frame() {

    console.log("frame");
    return (
        <div>
            <CarouselBig/>
            <Grid container>
                <Grid item xs={2}>
                    LEFT SIDE
                </Grid>
                <Grid item xs={8}>
                    <h2>Featured products</h2>
                    <ItemContainer />
                </Grid>
                <Grid item xs={2}>
                    RIGHT SIDE
                </Grid>
            </Grid>
        </div>

    );
}
