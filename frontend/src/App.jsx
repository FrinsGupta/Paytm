import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import Success from './pages/Success'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/signup"} element={<SignUp/>} />
        <Route path={"/signin"} element={<SignIn/>} />
        <Route path={"/dashboard"} element={<Dashboard/>} />
        <Route path={"/send"} element={<Send/>} />
        <Route path={"/success"} element={<Success/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
