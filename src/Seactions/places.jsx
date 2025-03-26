import React from "react";
import { useRecoilValue } from "recoil";
import { categoryState } from "../Store/categoryAtom";
import * as Categories from "../assets/Categorys/index";

const Places = () => {
    const categoryName = useRecoilValue(categoryState);
    const safeCategory = typeof categoryName === "string" ? categoryName.toLowerCase() : "";
    const products = Array.isArray(Categories[safeCategory]) ? Categories[safeCategory] : [];

    return (
        <div>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <div key={index} className="product-card">
                            <img src={item.url || "/placeholder.png"} alt={item.title || "No Title"} />
                            <p>{item.title || "Unknown Title"}</p>
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
