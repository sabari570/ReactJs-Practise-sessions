import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card-component';
import './category-preview-styles.jsx';
import { CategoryPreviewContainer, PreviewContainer, TitleContainer } from './category-preview-styles.jsx';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Link to={title}><TitleContainer>{title.toUpperCase()}</TitleContainer></Link>
            </h2>

            <PreviewContainer>
                {
                    products.filter((_, idx) => idx < 4)
                    .map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })
                }
            </PreviewContainer>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;