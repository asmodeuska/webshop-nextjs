import Grid from '@mui/material/Grid';
import React from 'react'
import Skeleton from '@mui/material/Skeleton';


export function ItemSkeleton() {
    return (
        <Grid item xl={2} lg={3} sm={4} xs>
            < Skeleton width={200} height={400} variant="rectangular" />
            < Skeleton width={200} variant="text" />
            < Skeleton width={200} variant="text" />
        </Grid>
    )
}