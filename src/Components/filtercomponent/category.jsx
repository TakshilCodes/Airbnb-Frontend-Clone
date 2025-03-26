import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, categoryDataState } from "../../Store/categoryAtom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const Category = () => {
    const [categoryName, setCategoryName] = useRecoilState(categoryState);
    const categoryData = useRecoilValue(categoryDataState);
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className="relative w-300">
            {!isBeginning && (
                <button
                    onClick={() => swiperRef.current?.slidePrev(14)}
                    className="absolute -left-15 top-1/2 transform -translate-y-1/2 transition-all border p-1 rounded-full 
                    shadow-md hover:shadow-[0px_2px_8px_rgba(0,0,0,0.30)] z-10 w-8"
                >
                    ❮
                </button>
            )}
            {!isEnd && (
                <button
                    onClick={() => swiperRef.current?.slideNext(14)}
                    className="absolute -right-15 top-1/2 transform -translate-y-1/2 transition-all border p-1 rounded-full 
                    shadow-md hover:shadow-[0px_2px_8px_rgba(0,0,0,0.30)] z-10 w-8"
                >
                    ❯
                </button>
            )}

            <Swiper
                slidesPerView={14}
                spaceBetween={5}
                breakpoints={{
                    640: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 5 },
                    768: { slidesPerView: 8, slidesPerGroup: 8, spaceBetween: 5 },
                    1024: { slidesPerView: 14, slidesPerGroup: 5, spaceBetween: 5 }
                }}
                navigation={false} // Using custom buttons
                modules={[Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                className="pb-5"
            >

                {categoryData?.map((category, index) => (
                    <SwiperSlide key={index} className="flex justify-center">
                        <button
                            onClick={() => setCategoryName(category.categoryName)}
                            className={`flex flex-col items-center px-2 py-1 transition active:scale-90 ${categoryName === category.categoryName
                                    ? "border-b-2"
                                    : "text-gray-500 hover:text-black"
                                }`}
                        >
                            <img src={category.icon} alt={category.name} className="w-7 h-10 object-contain" />
                            <p className="text-[11px] mt-1">{category.name}</p>
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Category;
