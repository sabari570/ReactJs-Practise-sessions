import CategoryPreview from "../../components/category-preview/category-preview-component";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCatgoryMap,
} from "../../store/categories/category-selector";
import { Fragment } from "react";
import Spinner from "../../components/spinner/spinner-component";

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCatgoryMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-preview-container">
          {Object.keys(categoriesMap) // returns the list of keys in this object
            .map((title) => {
              const products = categoriesMap[title];
              return (
                <CategoryPreview
                  key={title}
                  title={title}
                  products={products}
                />
              );
            })}
        </div>
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
