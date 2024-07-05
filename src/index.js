import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import Box from './Box';
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/box/:boxId",
    element: <Box/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="chatterbox">
      <div className="not-footer">
        <header className="chatterbox-header">ChatterBox</header>
        <main className="chatterbox-main">
          <RouterProvider router={router}/>
        </main>
      </div>
      <Footer />
    </div>
  </React.StrictMode>
);

reportWebVitals();
