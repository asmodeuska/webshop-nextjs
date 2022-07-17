import * as React from 'react';

import { Box, Tooltip, Rating, Typography, Card, CardMedia, CardContent, Grid, CardActionArea, Divider } from '@mui/material';
import { Laptop, Smartphone } from './ItemStickers';
import Image from 'next/image'
import { useRouter } from 'next/router';

export default function Item(props) {
    const router = useRouter();

    const ratingCount = props.ratings.length;
    const hasRating = ratingCount > 0;
    const ratingValue = props.ratings.reduce((acc, { value }) => acc + value, 0) / ratingCount;
    const itemSticker = props.itemSticker;
    const reviewsString = ratingCount + ' ' + (ratingCount === 1 ? 'review' : 'reviews');

    //price delimiter function
    const priceDelimiter = (price) => {
        if (price.length > 3) {
            return price.substring(0, price.length - 3) + ',' + price.substring(price.length - 3);
        } else {
            return price;
        }
    }

    const categoryTag = () => {
        if (props.category) {
            switch (props.category) {
                case 'Laptop':
                    return <Laptop />;
                case 'Cell Phones':
                    return <Smartphone />;
                default:
                    return null;
            }
        }
    }

    return (
        <Card key={props.id} className="card" sx={[{

        }, , { margin: 1, minWidth: 250, boxShadow: 10, }]}>
            <CardActionArea sx={{ height: "inherit" }} onClick={() => { router.push(`./p/${props.id}`) }}>
                {props.category && categoryTag()}
                <CardMedia
                    style={{
                        height: '350px',
                        margin: "auto",
                        textAlign: "center"
                    }}
                >
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <Image
                            unoptimized
                            src={`data:image/jpg;base64, ${Buffer.from(props.image).toString('base64')}`}
                            alt={props.alt}
                            layout='fill'
                            objectFit='contain'
                        />
                    </div>
                </CardMedia>


                <CardContent sx={{ py: '0' }}>
                    <Box mx={1} mt={2}>
                        <Typography variant="body1">
                            <b>{props.title}</b>
                        </Typography>
                    </Box>
                    <Box m={1} height={"80px"}>
                        <Grid container direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start">
                            {props.attributes.filter((item, idx) => idx < 4).map(item => {
                                return (
                                    <div key={item.name + "_" + item.value + "_div"} className="grid_div">
                                        <Grid key={item.name} item sm={6} textAlign="start">
                                            <Typography variant="caption" >
                                                {item.name + ': '}
                                            </Typography>
                                        </Grid>
                                        <Grid key={item.name + "_" + item.value} item sm={6} textAlign="end">
                                            <Typography variant="body2" >
                                                <b>{item.value}</b>
                                            </Typography>
                                        </Grid>
                                    </div>
                                )
                            })}
                        </Grid>
                    </Box>

                    <Box mb={1} display="flex" justifyContent="space-between" alignItems="center" alignContent="center" height={"80px"}>
                        <Grid container direction="row"
                            justifyContent="space-between"
                            alignItems="center">
                            <Grid item sm={6}>
                                {hasRating ? (
                                    <Box pt={2}>
                                        <Tooltip title={reviewsString} arrow>
                                            <Rating name="read-only" precision={0.5} value={ratingValue} readOnly size="small" />
                                        </Tooltip>
                                        <Typography color="secondary" display="block" variant='caption'>
                                            ({ratingCount})
                                        </Typography>
                                    </Box>
                                )
                                    : (null)
                                }
                            </Grid>
                            <Grid item sm={6}>
                                <Typography style={{
                                    fontWeight: "bold",
                                    textAlign: "right",
                                }}
                                    color="primary.main"
                                    variant="h6">
                                    {parseInt(props.price).toLocaleString()} {props.currency}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card >
    );
}
