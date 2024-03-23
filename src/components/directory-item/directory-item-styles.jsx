import styled from "styled-components";

// Remember If you want to style a component inside another styled component
//  Make sure that it is already created
// For example: in this file you have a DirectoryItemBody to be defined and changed inside the DirectoryItemContainer
// So make sure that the DirectoryItemBody is defined earlier

// We can also pass props into these styled components created and access it over here like below mentioned syntax
export const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-image: ${
        ( { imageUrl } ) => `url(${imageUrl})`
    };
`;

export const DirectoryItemBody = styled.div`
    height: 90px;
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    background-color: white;
    opacity: 0.7;
    position: absolute;

    h2 {
        font-weight: bold;
        margin: 0 6px 0;
        font-size: 22px;
        color: #4a4a4a;
        text-transform: uppercase;
    }

    p {
        font-weight: lighter;
        font-size: 16px;
    }
`;

export const DirectoryItemContainer = styled.div`
    min-width: 30%;
    height: 240px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 0 7.5px 15px;
    overflow: hidden;

    &:hover {
        cursor: pointer;

        & ${BackgroundImage} {
            transform: scale(1.1);
            transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
        }

        & ${DirectoryItemBody} {
            opacity: 0.9;
        }
    }

    &.large {
        height: 380px;
    }

    &:first-child {
        margin-right: 7.5px;
    }

    &:last-child {
        margin-left: 7.5px;
    }
`;