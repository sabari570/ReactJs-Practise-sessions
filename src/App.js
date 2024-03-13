import './App.css';
import Home from './routes/home/home-component';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation/navigation-component';

const Shop = () => {
  return (
    <h1>This is the shop page</h1>
  );
};

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
        <Route path='shop' element= { < Shop /> } />


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
