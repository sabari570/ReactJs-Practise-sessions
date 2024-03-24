import CategoryPreview from "../../components/category-preview/category-preview-component";
import { useSelector } from "react-redux";
import { selectCatgoryMap } from "../../store/categories/category-selector";

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCatgoryMap);
    return (
        < div className="category-preview-container">
            {
                Object.keys(categoriesMap) // returns the list of keys in this object
                    .map((title) => {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products} />
                        );
                    })
            }
        </div>
    );
};

export default CategoriesPreview;