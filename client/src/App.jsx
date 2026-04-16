import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MainHomePage from './pages/MainHomePage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Learn from './pages/Learn'; 
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Error from './pages/Error';
import AllPost from './pages/Posts/AllPost'
import Navbar from './components/Navbar';
import CreatePost from './pages/Posts/CreatePost';
import Logout from './pages/Logout';
import 'react-toastify/dist/ReactToastify.css';

import UpdatePost from './pages/Posts/UpdatePost';
import UnderConstruction from './pages/UnderConstruction';
import MyPosts from './pages/Posts/MyPosts';
import ViewPost from './pages/Posts/ViewPost';
import ProtectedRoute from './components/shared/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainHomePage />} />
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts" element={<AllPost />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/our-store" element={<UnderConstruction />} />
        <Route path="/logout" element={<Logout />} />
        
        {/* Protected Routes */}
        <Route 
          path="/create-post" 
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/update-post/:id" 
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-posts" 
          element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Error Route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
