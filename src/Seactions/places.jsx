import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { categoryState } from "../Store/categoryAtom";
import * as Categories from "../assets/Categorys/index";

const Places = () => {
    const categoryName = useRecoilValue(categoryState);
    const safeCategory = typeof categoryName === "string" ? categoryName.toLowerCase() : "";
    const products = Array.isArray(Categories[safeCategory]) ? Categories[safeCategory] : [];
    const [isScrolled, setIsScrolled] = useState(false);
    const [showFullNavbar, setShowFullNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50 && !showFullNavbar) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showFullNavbar]);

    return (
        <div className={`relative z-0 ${isScrolled && !showFullNavbar ? "top-[200px]" : "top-[300px]"
            }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 gap-4 md:gap-6 px-4 sm:px-6 md:px-10 mx-auto w-[90%]">
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index} className="product-card">
                            <div className="relative md:w-65 md:h-60 w-90 h-80 rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src={item.url || "/placeholder.png"}
                                    alt={item.title || "No Title"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="text-[16px] py-2">
                                <p>{item.title || "Unknown Title"}</p>
                                <p className="paracolor">{item.distance}</p>
                                <p className="paracolor">{item.stay}</p>
                                <p>₹{item.total}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-4xl flex justify-center">No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Places;