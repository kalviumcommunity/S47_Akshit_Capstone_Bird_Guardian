import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHomePage from './components/MainHomePage';
import AllPost from './componentRelatedToFunctionality/AllPost'; 
import CreatePost from './componentRelatedToFunctionality/CreatePost'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/AllPost" element={<AllPost />} />
        <Route path="/CreatePost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
};

export default App;
