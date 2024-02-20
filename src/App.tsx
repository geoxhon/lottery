

import './App.css';
import {NextUIProvider} from "@nextui-org/react";
import NavBar from './components/navbar';
import React from 'react';
import ProductCard from './components/productcard';
import useMetaMask from './components/metamask';
import Home from './pages/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Winners from './pages/winners';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/login';
import ToasterComponent from './components/ToasterComponent';
import UnavailablePage from './pages/contractunavailable';

function App() {
  const mm = useMetaMask();
  if(mm){
    return (
      <NextUIProvider>
       <>
        <main className="dark text-foreground bg-background">
        
        {
          mm.isMetaMaskConnected ? 
        <>
          <ToasterComponent mm={mm}/>
          <Router>
            <NavBar mm={mm}/>
            <Routes>
                <Route path="/" element={<Home mm={mm}/>} />
                <Route path="/winners" element={<Winners mm={mm}/>} />
                <Route path="/unavailable" element={<><div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh', // Minimum height of 100% of the viewport height
                  minWidth: '100vw', // Minimum width of 100% of the viewport width
                }}>
                
                <UnavailablePage mm={mm}></UnavailablePage>
                </div></>} />
            </Routes>
          </Router>
        </>
        :
        <><div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh', // Minimum height of 100% of the viewport height
                  minWidth: '100vw', // Minimum width of 100% of the viewport width
                }}>
                
                <LoginPage mm={mm}></LoginPage>
                </div></>
        }
        </main>
      </>
      </NextUIProvider>
    );
  }
  return (<></>);
  
}

export default App;
