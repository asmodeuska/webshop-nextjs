import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default class CarouselBig extends Component {
    render() {
        return (
            <Box py={1} p={5} >
                <Carousel showStatus={false} autoPlay={true} dynamicHeight={true} stopOnHover={false} showThumbs={false} infiniteLoop={true} interval={5000}>
                    <div>
                        <Image width={1920} height={400} layout="intrinsic" src='/a52 banner.jpg' />
                    </div>
                    <div>
                        <Image width={1920} height={400} layout="intrinsic" src='/iphone13 banner.jpg' />
                    </div>
                    <div>
                        <Image width={1920} height={400} layout="intrinsic" src='/macbook air 13.3 banner.jpg' />
                    </div>
                </Carousel>
            </Box>
        );
    }
}
