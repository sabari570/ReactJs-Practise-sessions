import { BaseButtonContainer, GoogleSignInButton, InvertedButtonContainer } from "./button-component-styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
};

// This function is actually written to return which buttonType are we using based on the buttonType we pass
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
    if(buttonType === BUTTON_TYPE_CLASSES.base) return BaseButtonContainer;
    else if (buttonType === BUTTON_TYPE_CLASSES.google) return GoogleSignInButton;
    else if (buttonType === BUTTON_TYPE_CLASSES.inverted) return InvertedButtonContainer;
};

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton
            {...otherProps}>
            {children}
        </CustomButton>
    );
};

export default Button;