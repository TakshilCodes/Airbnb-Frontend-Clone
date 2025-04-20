import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { categoryState } from "../Store/categoryAtom";
import * as Categories from "../assets/Categorys/index";

const SkeletonCard = () => (
  <div className="space-y-2">
    <div className="w-full aspect-[1/1] rounded-2xl skeleton-shimmer" />
    <div className="h-4 rounded w-3/4 skeleton-shimmer" />
    <div className="h-3 rounded w-1/2 skeleton-shimmer" />
    <div className="h-3 rounded w-1/4 skeleton-shimmer" />
  </div>
);

const Places = () => {
  const categoryName = useRecoilValue(categoryState);
  const safeCategory = typeof categoryName === "string" ? categoryName.toLowerCase() : "";
  const allProducts = Array.isArray(Categories[safeCategory]) ? Categories[safeCategory] : [];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showFullNavbar, setShowFullNavbar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1409);
  const [mobileview, setMobileView] = useState(window.innerWidth < 750);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1409);
      setMobileView(window.innerWidth < 750);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 && !showFullNavbar);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showFullNavbar]);

  useEffect(() => {
    // Simulate loading delay (remove if you use real async data fetching)
    setLoading(true);
    const timeout = setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [categoryName]);

  return (
    <div
      className={`relative ${isScrolled && !showFullNavbar
          ? "top-[200px]"
          : mobileview
            ? "top-[200px]"
            : isSmallScreen
              ? "top-[300px]"
              : "top-[250px]"
        }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4 md:gap-6 px-4 sm:px-6 md:px-10 mx-auto w-[90%]">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : products.length > 0
            ? products.map((item, index) => (
              <div key={index} className="product-card cursor-pointer">
                <div className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={item.url}
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
            : <p className="text-4xl flex justify-center">No products available.</p>}
      </div>
    </div>
  );
};

export default Places;
