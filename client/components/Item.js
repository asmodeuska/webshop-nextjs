import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Tooltip from '@mui/material/Tooltip';
import { ITEM_STICKERS} from './ENUMS';
import { New, Trending, Recommended, Sale } from './ItemStickers';


export default function Item(props) {
    const hasRating = props.ratingCount > 0;
    const itemSticker = props.itemSticker;
    const ratingCount = props.ratingCount;
    const reviewsString = ratingCount+' ' + (ratingCount === 1 ? 'review' : 'reviews');

    return (
        <Card className="card" sx={{ margin: 1, maxWidth: 300, boxShadow: 1 }}>
            <CardActionArea>
                {itemSticker == ITEM_STICKERS.NEW ?
                    <New />
                    : null
                }

                <CardMedia
                    style={{
                        height: 'auto',
                        maxWidth: '90%',
                        margin: "auto",
                        textAlign: "center"
                    }}

                    component="img"
                    image={props.image}
                    alt={props.alt}
                />


                <CardContent className="cardContent">
                    <Typography variant="h6">
                        {props.title}
                    </Typography>



                    {hasRating ? (
                        <Tooltip title={reviewsString} arrow>
                            <span>
                                <Rating name="read-only" precision={0.5} value={props.rating} readOnly size="small" />
                            </span>
                        </Tooltip>)
                        : (null)
                    }
                    <Typography style={{
                        width: "auto",
                        marginRight: '2rem',
                        textAlign: "center",
                        margin: "auto",
                        marginTop: "1rem",
                        fontWeight: "bold"
                    }}
                        variant="h5">
                        {props.currency}{props.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
