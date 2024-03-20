import { useContext, useState } from 'react';
import { signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopUp } from '../../utils/firebase/firbase-helper-functions';
import FormInput from '../form-input/form-input-component';
import '../sign-up-form/sign-up-form-styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button-component';
import { UserContext } from '../../contexts/user-context';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const { currentUser } = useContext(UserContext);
    console.log("Saved user: ", currentUser);

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Setting the formFields object with the updated value by using the spread(...) operator to expand the formFields
        // and the setting the particulat key with the entered value
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            console.log({user});
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential': alert('Invalid credentials entered')
                    break;
                default: console.log("Error while signing in: ", error.code);
            }
        }
    };

    const logGoogleUser = async () => {
        try {
            const response = await signInWithGooglePopUp();
            await createUserDocumentFromAuth(response.user);
        } catch (error) {
            if (error.code === "auth/cancelled-popup-request") {
                alert("Already in progress...");
            }
            console.log("Error while opening google signin: ", error);
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                < FormInput
                    type="email"
                    handleChange={handleChange}
                    label="Email"
                    name='email'
                    value={email}
                />

                < FormInput
                    type="password"
                    handleChange={handleChange}
                    label="Password"
                    name='password'
                    value={password}
                />

                <div className='buttons-container'>
                    < Button type='submit' children="Sign in" />
                    < Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} children="Sign in with google" onClick={logGoogleUser} />
                </div>
            </form>
        </div>
    );
};

export default SignInForm;