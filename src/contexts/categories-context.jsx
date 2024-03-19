import { createContext, useState, useEffect } from "react";
// import SHOP_DATA from '../shop-data.js';
import { getCategoriesAndDocuments } from "../utils/firebase/firbase-helper-functions.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // This effect should run only once since once we upload the entire data to firebase then we dont want to upload the data again and again
    // useEffect(
    //     () => {
    //         addCollectionAndDocuments("categories", SHOP_DATA);
    //     },
    //     []
    // );

    useEffect(
        () => {
            const getCategoriesMap = async () => {
                const categoriesMap = await getCategoriesAndDocuments();
                console.log("Categories fetched: ", categoriesMap);
                setCategoriesMap(categoriesMap);
            };
            getCategoriesMap();
        },
        []
    );

    const value = { categoriesMap, setCategoriesMap };
    return (
        < CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};