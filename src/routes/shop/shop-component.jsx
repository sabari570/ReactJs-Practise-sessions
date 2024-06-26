import CategoriesPreview from '../categories-preview/categories-preview-component';
import Category from '../category/category-component';
import './shop-styles.scss';

import { Routes, Route } from "react-router-dom";

const Shop = () => {
    return (
        <Routes>
            <Route index element={< CategoriesPreview />}></Route>
            {/* Now this is a new route which has a route parameter in it with the variable name as category */}
            {/* So inorder to access this route parameter we need to call the category object from it */}
            {/* this route parameter can be accessed by the component placed inside the element of the route i.e the < Category /> component */}
            <Route path=':category' element={< Category />}></Route>
        </Routes>
    );
};

export default Shop;