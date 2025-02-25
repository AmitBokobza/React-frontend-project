
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import UserLayout from "./components/layout/UserLayout";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";




function App() {
  

  
  return (
    <>
      <ToastContainer/>
      <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<UserLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="login" element={<Login/>}/>
            </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
