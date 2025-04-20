import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, categoryDataState } from "../../Store/categoryAtom";

const Category = () => {
  const [categoryName, setCategoryName] = useRecoilState(categoryState);
  const categoryData = useRecoilValue(categoryDataState);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleScroll = () => {
    const el = swiperRef.current;
    if (!el) return;
    setIsBeginning(el.scrollLeft <= 10);
    setIsEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 10);
  };

  const scrollLeft = () => {
    swiperRef.current?.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    swiperRef.current?.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-[1400px] mx-auto px-4 mt-5">
      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className={`absolute -left-5 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1 w-7 h-7 shadow-sm hover:shadow-md hidden md:flex items-center justify-center z-10 ${
          isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ❮
      </button>
      <button
        onClick={scrollRight}
        className={`absolute -right-5 top-1/2 -translate-y-1/2 bg-white border rounded-full p-1 w-7 h-7 shadow-sm hover:shadow-md hidden md:flex items-center justify-center z-10 ${
          isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        ❯
      </button>

      {/* Scrollable Categories */}
      <div
        ref={swiperRef}
        onScroll={handleScroll}
        className="flex items-center overflow-x-auto gap-3 pb-3 w-300 scroll-smooth scrollbar-hide"
      >
        {categoryData?.map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex justify-center basis-[7.14%] max-w-[100px]"
          >
            <button
              onClick={() => setCategoryName(category.categoryName)}
              className={`flex flex-col items-center text-[12px] px-1 pt-1 pb-1 transition active:scale-95 ${
                categoryName === category.categoryName
                  ? "text-black font-medium border-b-2"
                  : "text-gray-500 border-transparent hover:text-black"
              }`}
            >
              <img
                src={category.icon}
                alt={category.name}
                className="w-6 h-6 object-contain mb-1"
              />
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
