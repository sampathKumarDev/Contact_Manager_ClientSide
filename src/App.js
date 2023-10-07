// import React from 'react'
// import SignIn from './screen/SignIn';

// const App = () => {
//   return (
//     <div>
//       <SignIn/>
//     </div>
//   )
// }

// export default App

import React, { useState } from "react";
import SignIn from "./screen/SignIn";
import ContactPage from "./screen/ContactPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";

function App() {
  const [user, setUser] = useState('');
  const [userContacts, setUserContacts] = useState([]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn user={user} setUser={setUser} setUserContacts={setUserContacts}/>} />
          <Route
            path="/contacts"
            element={<ContactPage userId={user} setUser={setUser} userContacts={userContacts}/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;