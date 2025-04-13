"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";
// import global.css
import "@/styles/carousel.css";
import Image from "next/image";

import banner_1 from "@/public/images/banner_1.png";
import banner_2 from "@/public/images/banner_2.jpg";
import banner_3 from "@/public/images/banner_3.jpg";

const HomeCarouselBanner = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <Swiper
      autoplay={true}
      className="mySwiper rounded-md overflow-hidden"
      direction="horizontal"
      modules={[Pagination]}
      pagination={pagination}
    >
      <SwiperSlide>
        <Image alt="banner" className="w-full h-52" src={banner_1} />
      </SwiperSlide>
      <SwiperSlide>
        <Image alt="banner" className="w-full h-52" src={banner_2} />
      </SwiperSlide>
      <SwiperSlide>
        <Image alt="banner" className="w-full h-52" src={banner_3} />
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeCarouselBanner;
