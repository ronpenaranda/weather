import { useState } from 'react'
import NavigationBar from './components/nav'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from './pages/dashboard';

function App() {

  return (
    <BrowserRouter>
    <NavigationBar/>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
