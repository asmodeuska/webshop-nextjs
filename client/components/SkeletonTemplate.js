import Grid from '@mui/material/Grid';
import React from 'react'
import Skeleton from '@mui/material/Skeleton';


export function ItemSkeleton() {
    return (
        <Grid item xl={3}>
            < Skeleton width={270} height={350} variant="rectangular" />
            < Skeleton width={270} variant="text" />
            < Skeleton width={270} variant="text" />
        </Grid>
    )
}