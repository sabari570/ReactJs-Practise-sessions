import './directory-item-styles.scss';

const DirectoryItem = ({ category }) => {
    return (
        <div className='directory-item-container'>
            <div className='background-image' style={  // This is how we write style in react we can add the style for a specific property using an object inside the style property
                {
                    backgroundImage: `url(${category.imageUrl})`
                }
            } />
            <div className='directory-item-body'>
                <h2>{category.title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;