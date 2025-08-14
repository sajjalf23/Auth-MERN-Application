import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/login'
import Emailverify from './Pages/Emailverify'
import Resetpassword from './Pages/Resetpassword'
import Home from './Pages/Home'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <>
    <div className="">
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/email-verify' element={<Emailverify></Emailverify>}></Route>
        <Route path='/reset-password' element={<Resetpassword></Resetpassword>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
