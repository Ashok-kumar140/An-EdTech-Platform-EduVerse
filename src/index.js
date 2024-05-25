import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './redux/Store';
import { Toaster } from 'react-hot-toast';
import { setUser } from './redux/slices/profileSlice';
import { setToken } from './redux/slices/authSlice';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


// axios.interceptors.response.use(
//   function (response) {
//     // Do something before request is sent
//     return response;
//   },
//   function (error) {
//     // Do something with request error

//     let res = error.response;
//     if (res.status === 401 && res.config && !res.config._isRetryRequest) {
//       setToken(null);
//       setUser(null);
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       // router.push("/login")
//       <Navigate to={'/login'} />
//     }

//   });
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
