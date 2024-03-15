import SignInForm from "../../components/sign-in-form/sign-in-form-component";
import SignUpForm from "../../components/sign-up-form/sign-up-form-component";
import './authentication-styles.scss';

// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';


const SignIn = () => {
    // run this code when this component runs for the first time inorder to get the redirectresult
    // this is used for the singInWithGoogleRedirect since the redirect feature goes to another page while singing in
    // useEffect(
    //     () => {
    //         async function fetchData() {
    //             const redirectResult = await getRedirectResult(auth);
    //             console.log({ redirectResult });
    //         }
    //         fetchData();
    //     },
    //     []
    // );

    return (
        <div className="authentication-container">
            < SignInForm />
            < SignUpForm />
        </div>
    );
};

export default SignIn;