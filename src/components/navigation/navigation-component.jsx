import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation-styles.scss';
const Navigation = () => {
    return (
        // Fragment is used as a div for grouping up components
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    < CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    {/* Works similar to that of the anchor tag in html */}
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>

                    <Link className='nav-link' to='/sign-in' >SIGN IN</Link>
                </div>
            </div>

            {/* Outlet actually says where the nested routes component must be placed */}
            <Outlet />
        </Fragment>
    );
};

export default Navigation;