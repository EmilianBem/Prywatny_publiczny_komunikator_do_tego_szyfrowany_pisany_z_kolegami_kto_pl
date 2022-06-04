import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import NowaKonfa from "./NowaKonfa";
import Messaging from "./Messaging";
import Logout from "./Logout";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}/>
              <Route path="/Register" element={<Register/>}/>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/Dashboard" element={<Dashboard/>}/>
              <Route path="/NowaKonfa" element={<NowaKonfa/>}/>
              <Route path="/Messaging" element={<Messaging/>}/>
              <Route path="/Logout" element={<Logout/>}/>
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
