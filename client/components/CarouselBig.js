import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';

export default class CarouselBig extends Component {
    render() {
        return (
            <Carousel showStatus={false} autoPlay={true}  dynamicHeight={true} stopOnHover={false} showThumbs={false} infiniteLoop={true} interval={5000}>
                <div>
                    <Image width={1920} height={500} layout="intrinsic" src='/carouselDummy.png' />
                </div>
                <div>
                    <Image width={1920} height={500} layout="intrinsic" src='/carouselDummy2.png' />
                </div>
                <div>
                    <Image width={1920} height={500} layout="intrinsic" src='/carouselDummy3.png' />
                </div>
            </Carousel>
        );
    }
}
