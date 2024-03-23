import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { LogoContainer, NavLinksContainer, NavigationContainer, NavLink } from './navigation-styles.jsx';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import { signOutAuthUsers } from '../../utils/firebase/firbase-helper-functions';
import CartIcon from '../cart-icon/cart-icon-component';
import CartDropdown from '../cart-dropdown/cart-dropdown-component';
import { CartContext } from '../../contexts/cart-context';


const Navigation = () => {

    // Here we are grabbing only the currentUser value from the userContext
    // Since we need to check whether the currentUser is present (logged in) or not
    // if currentUser is null then it means logout and hence show sign in
    // if currentUser is present then it mean logged in and hence show signout
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    const signOutHandler = async () => {
        await signOutAuthUsers();
    };

    

    return (
        // Fragment is used as a div for grouping up components
        <Fragment> 
            {/* this is the portion where we use the styled components defined and replace the divs and the classnames */}
            <NavigationContainer>
                <LogoContainer to='/'>
                    < CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    {/* Works similar to that of the anchor tag in html */}
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ?
                            (
                                // This is how we can use a predined style for the Link component and give to another tag of html 
                                // here in this case it is span
                                <NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>
                            )
                            :
                            (<NavLink to='/sign-in' >
                                SIGN IN
                            </NavLink>)
                    }
                    < CartIcon />
                </NavLinksContainer>
            </NavigationContainer>

            {
                (isCartOpen && < CartDropdown />)
            }

            {/* Outlet actually says where the nested routes component must be placed */}
            <Outlet />
        </Fragment>
    );
};

export default Navigation;