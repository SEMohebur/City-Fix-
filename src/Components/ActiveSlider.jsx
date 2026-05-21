import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { ServicesData } from "./sliderInfo";

const ActiveSlider = () => {
  return (
    <div className="flex items-center justify-center flex-col p-7 shadow bg-violet-950 rounded-2xl m-4">
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },

          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="max-w-[90%] lg:max-w-[80%]"
      >
        {ServicesData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-[300px] lg:h-[400px] p-6 text-white">
                <item.icon className="text-4xl mb-4 text-yellow-400" />

                <h1 className="text-2xl font-bold mb-3">{item.title}</h1>

                <p className="text-sm text-gray-200 leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-5 bg-white text-black px-5 py-2 rounded-xl w-fit font-semibold hover:bg-yellow-400 transition">
                  Read More
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
