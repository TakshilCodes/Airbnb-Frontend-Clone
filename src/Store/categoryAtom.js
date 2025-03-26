import { atom } from "recoil";
import categoryData from "../Constants/categoryData";

export const categoryState = atom({
    key: "categoryState",
    default: "amazingviews",
});

export const categoryDataState = atom({
    key: "categoryDataState",
    default: Array.isArray(categoryData) ? categoryData : [],
});

