import './App.css';
import Home from './routes/home/home-component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation-component';
import SignIn from './routes/authentication/auth-component';
import Shop from './routes/shop/shop-component';
import Checkout from './routes/checkout/checkout-component';

// const RouteTest = () => {
//   return (
//     <h1>This is a test route</h1>
//   );
// };


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>   {/* This is the top level component */}
      {/* index says it is the home component that is the default path the parent has */}
        <Route index element={<Home />} />    {/* This is the sub level component */}
        <Route path='shop/*' element= { < Shop /> } />  {/* Here the shop/* indicates that the shop route is nested and it will be defined inside the Shop component */}

        <Route path='sign-in' element= { < SignIn /> } />

        <Route path='checkout' element= { < Checkout /> } />


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
