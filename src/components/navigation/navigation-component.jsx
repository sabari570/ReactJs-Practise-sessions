import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation-styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { signOutAuthUsers } from '../../utils/firebase/firbase-helper-functions';

const Navigation = () => {

    // Here we are grabbing only the currentUser value from the userContext
    // Since we need to check whether the currentUser is present (logged in) or not
    // if currentUser is null then it means logout and hence show sign in
    // if currentUser is present then it mean logged in and hence show signout
    const { currentUser, setCurrentUser } = useContext(UserContext);
    console.log("Current user: ", currentUser);

    const signOutHandler = async () => {
        await signOutAuthUsers();
        setCurrentUser(null);
    };

    return (
        // Fragment is used as a div for grouping up components
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    < CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    {/* Works similar to that of the anchor tag in html */}
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ?
                            (
                                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                            )
                            :
                            (<Link className='nav-link' to='/sign-in' >
                                SIGN IN
                            </Link>)
                    }

                </div>
            </div>

            {/* Outlet actually says where the nested routes component must be placed */}
            <Outlet />
        </Fragment>
    );
};

export default Navigation;