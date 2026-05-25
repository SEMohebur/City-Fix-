import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Autoplay } from "swiper/modules";

import { ServicesData } from "./sliderInfo";
import { ArrowRight } from "lucide-react";

const ActiveSlider = () => {
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 md:px-8 rounded-b-3xl">
      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-cyan-400 font-semibold tracking-widest uppercase text-sm mb-3">
          Welcome to CityFix
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
          Professional Digital Solutions
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm md:text-base">
          CityFix is a smart city service platform that helps citizens easily
          report road damage, water leakage, broken street lights, garbage
          problems, and other public issues. Together, we can build a cleaner,
          safer, and better city for everyone.
        </p>
      </div>

      <p className="text-gray-200 text-center max-w-3xl mx-auto mt-5 text-lg leading-relaxed"></p>

      {/* Slider */}
      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 20,
          },

          700: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        }}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-7xl"
      >
        {ServicesData.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="group relative h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"></div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-7">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center mb-6">
                  <item.icon className="text-3xl text-cyan-400" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Button */}
                <button className="flex items-center gap-2 w-fit bg-cyan-500 hover:bg-cyan-400 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                  Read More
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-cyan-500/20 blur-3xl rounded-full"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ActiveSlider;
