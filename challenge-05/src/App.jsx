import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail-movie/:id" element={<Detail />} />
        </Routes>

        <ToastContainer theme="colored" />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App