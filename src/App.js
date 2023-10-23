import {Routes, Route,  BrowserRouter as Router,  } from 'react-router-dom';
import React from 'react';
import UserDirectory from "./UserDirectory";
import UserProfile from "./UserProfile";

function App() {
  return (
 
    <Router>
      <Routes>
     
        <Route exact path="/" element={<UserDirectory />} />
        <Route path="/user/:userId" element={<UserProfile />}/>
 
     </Routes>
    </Router>

    
    
  );
}

export default App;
