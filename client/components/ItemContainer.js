
import React, { useEffect, useState } from "react";
import Item from './Item';
import Grid from '@mui/material/Grid';
import { ITEM_STICKERS } from './ENUMS.js';
import { ItemSkeleton } from './SkeletonTemplate.js';


export default function Frame() {

    const [products, fetchProducts] = useState([])
    console.log("itemcontainer");
    const getData = () => {
        console.log("getData");
        fetch('https://fakestoreapi.com/products/')
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                fetchProducts(res)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Grid sx={{ m: 1 }} container spacing={1}>

            {products.length > 0 ? (
                products.map(product => {
                    return (
                        <Grid key={product.id} item xl={2} lg={3} sm={4} xs>
                            <Item key={product.id} image={product.image} title={product.title} rating={product.rating.rate} ratingCount={product.rating.count} currency="$" price={product.price} itemSticker={ITEM_STICKERS.NEW} />
                        </Grid>
                    )
                })
            ) : (
                <Grid sx={{ m: 1 }} container spacing={1}>
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                </Grid>
            )


            }

        </Grid >

    );
}
