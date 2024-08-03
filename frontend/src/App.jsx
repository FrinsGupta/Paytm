
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Send from './pages/Send'
import Success from './pages/Success'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<SignIn/>} />
        <Route path={"/signup"} element={<SignUp/>} />
        <Route path={"/dashboard"} element={<Dashboard/>} />
        <Route path={"/send"} element={<Send/>} />
        <Route path={"/success"} element={<Success/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
