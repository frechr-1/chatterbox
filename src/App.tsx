import React from 'react'; 
import Home from './pages/Home'
import Footer from './components/Footer';
import ChatBoxes from './components/ChatBoxes';
import ChatBox from './components/ChatBox';   
import {
  createBrowserRouter,
  RouterProvider 
} from "react-router-dom";
import './App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/> 
  },
  {
    path: "/box/:boxId",
    element: <ChatBoxes/>
  },
  {
    path: "/box/:boxId/chatbox/:chatboxId",
    element: <ChatBox/>
  }
]);  

const App = () => { 

  return (
    <div className="chatterbox">
      <div className="not-footer">
        <header className="chatterbox-header">ChatterBox</header>
        <main className="chatterbox-main"> 
            <RouterProvider router={router}/> 
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
