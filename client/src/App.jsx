import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainHomePage from './pages/MainHomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Learn from './pages/Learn'; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import AllPost from './componentRelatedToFunctionality/AllPost'
import CreatePost from './componentRelatedToFunctionality/CreatePost';
import Logout from './pages/Logout';

const App = () => {
  return (
    <>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<MainHomePage />} />
        <Route path="/AboutUs" element={<AboutUs/>} /> 
        <Route path="/ContactUs"  element={<ContactUs/>}/>
        <Route path="/Learn"  element={<Learn/>}/>
        <Route path="/SignIn"  element={<SignIn/>}/>
        <Route path="/SignUp"  element={<SignUp/>}/>
        <Route path="*"  element={<Error/>}/>
        <Route path="/AllPost"  element={<AllPost/>}/>
        <Route path="/Logout"  element={<Logout/>}/>
        <Route path="/CreatePost"  element={<CreatePost/>}/>
         
      </Routes>

    </BrowserRouter>
    </>
  );
};

export default App;
