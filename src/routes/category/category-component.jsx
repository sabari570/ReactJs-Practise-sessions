import { Fragment, useEffect, useState } from "react";
import "./category-styles.scss";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card-component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCatgoryMap,
} from "../../store/categories/category-selector";
import Spinner from "../../components/spinner/spinner-component";

const Category = () => {
  // useParams is used to access the route parameters coming into this component
  const { category } = useParams();
  const categoriesMap = useSelector(selectCatgoryMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  // This useEffect says that only when there is a change in the category (that is the route parameter)
  // and also when there is a change in the categoriesMap only then update the products list otherwise dont keep re-rendering the entire product list whenever the component mounts
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
