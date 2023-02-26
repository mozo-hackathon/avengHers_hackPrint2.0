import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
const cara1 = require('../images/cara1.jpg');
const cara2 = require('../images/cara2.jpg');
const cara3 = require('../images/cara3.jpg');

export default function Carousel1() {

    return (
        <>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-96"
                        src={cara1}
                        alt="image slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-96"
                        src={cara2}
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="object-fill w-full h-96"
                        src={cara3}
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
}