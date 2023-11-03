import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";

import Home from './pages/Home';
import Detail from './pages/Detail';
import Store from './Redux/Store'

function App() {
  return (
    // Wrap the entire application with Redux Provider to manage application state
    <Provider store={Store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail-movie/:id" element={<Detail />} />
          </Routes>
          <ToastContainer theme="colored" />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App