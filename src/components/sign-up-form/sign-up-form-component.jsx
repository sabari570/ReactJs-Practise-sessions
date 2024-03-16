import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firbase-helper-functions';
import FormInput from '../form-input/form-input-component';
import './sign-up-form-styles.scss';
import Button from '../button/button-component';
import { UserContext } from '../../contexts/user-context';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Setting the formFields object with the updated value by using the spread(...) operator to expand the formFields
        // and the setting the particulat key with the entered value
        setFormFields({ ...formFields, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords does not match");
        } else {
            try {
                const { user } = await createAuthUserWithEmailAndPassword(email, password);
                setCurrentUser(user);
                const response = await createUserDocumentFromAuth(user, { displayName });
                if (response)
                    alert("User created successfully");
                resetFormFields();
            } catch (error) {
                console.log("Error while creating the user: ", error);
                if (error.code === 'auth/email-already-in-use') {
                    alert("User with this email already exists");
                }
            }
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>I do not have an account?</h2>
            <span>Sing up with your email and password</span>
            <form onSubmit={handleSubmit}>
                < FormInput
                    type="text"
                    handleChange={handleChange}
                    label="Display Name"
                    name='displayName'
                    value={displayName}
                />

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

                < FormInput
                    type="password"
                    handleChange={handleChange}
                    label="Confirm Password"
                    name='confirmPassword'
                    value={confirmPassword}
                />

                < Button type='submit' children="Sign up" />
            </form>
        </div>
    );
};

export default SignUpForm;