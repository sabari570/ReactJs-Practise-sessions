import './directory-item-styles.jsx';
import { BackgroundImage, DirectoryItemBody, DirectoryItemContainer } from './directory-item-styles.jsx';
import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ category }) => {

    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(category.route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
            // This image url can be accessed by the corresponding styled components similar to that of props
                imageUrl= {category.imageUrl}
            />
            <DirectoryItemBody>
                <h2>{category.title}</h2>
                <p>Shop now</p>
            </DirectoryItemBody>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;