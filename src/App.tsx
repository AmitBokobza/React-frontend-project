
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import UserLayout from "./components/layout/UserLayout";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import { createContext, useState } from "react";
import CreateCard from "./components/CreateCard";
import MyCards from "./components/MyCards";

export interface Quarry {
  search: string;
  setSearch : (value:string) => void;
}
export const searchContext = createContext<Quarry>({
  search: "",
  setSearch: () => {}
});

function App() {
  const [search , setSearch] = useState<string>("")

  
  return (
    <>
    <searchContext.Provider value={{search, setSearch}}>
      <ToastContainer/>
      <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<UserLayout/>}>
              <Route index element={<Home/>}/>
              <Route path="register" element={<Register/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="create-card" element={<CreateCard/>}/>
              <Route path="my-cards" element={<MyCards/>}/>
            </Route>
        </Routes>
      </Router>
      </searchContext.Provider>
    </>
  )
}

export default App
