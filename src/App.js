import './App.css';
import Home from './routes/home/home-component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation-component';
import SignIn from './routes/authentication/auth-component';
import Shop from './routes/shop/shop-component';
import Checkout from './routes/checkout/checkout-component';
import { useEffect } from 'react';

import { setCurrentUser } from './store/user/user-action';
import { useDispatch } from 'react-redux';
import { onAuthStateChangedListener } from './utils/firebase/firbase-helper-functions';

const App = () => {

  // This is the method which is used to dispatch a new action
  const dispatch = useDispatch();

  // We place the useEffect code and listen to authChanges in this component
  // because this is the first component that gets rendered when the app mounts
  // and since we actually need the user at the begining itselt we use it over here

  useEffect(
    () => {
      const unsubscribe = onAuthStateChangedListener((user) => {
        console.log("User status: ", user);

        // since we are not dipatching in the action setCurrentUser like we did in reducers
        // this is how we dispatch the actions in react-redux
        dispatch(setCurrentUser(user));
      });
      return unsubscribe; // returns whenever the component is unmounted that is when the web app is closed
    },
    [dispatch] // the dispatch gets mounted only once write this here inorder to remove the warnings in terminal
  );

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>   {/* This is the top level component */}
        {/* index says it is the home component that is the default path the parent has */}
        <Route index element={<Home />} />    {/* This is the sub level component */}
        <Route path='shop/*' element={< Shop />} />  {/* Here the shop/* indicates that the shop route is nested and it will be defined inside the Shop component */}

        <Route path='sign-in' element={< SignIn />} />

        <Route path='checkout' element={< Checkout />} />


        {/* <Route path='/' element={< Home />} > */}
        {/* This is how we implement nested routing i.e if we need a url path like /home/shop/ */}
        {/*which says that shop is inside the home route means shop is nested inside home */}
        {/* and inorder for the nested routes to work we require the Outlet component */}
        {/* Outlet component says where the nested route must be placed when going to that path */}
        {/* This page is rendered on the path "http://localhost:3000/home/shop"  */}
        {/* <Route path='shop' element={<Shop />} /> */}


      </Route>

      {/* This is a seperate route which is not nested */}
      {/* This page is called on the path "http://localhost:3000/test" */}
      {/* <Route path='/test' element={<RouteTest />} /> */}
    </Routes>
  )

}

export default App;
