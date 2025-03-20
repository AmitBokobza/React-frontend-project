import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import UserLayout from "./components/layout/UserLayout";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import { createContext, useState } from "react";
import CreateCard from "./components/CreateCard";
import MyCards from "./components/MyCards";
import FavCards from "./components/FavCards";
import CardLanding from "./components/ReusableComp/CardComponents/CardLanding";
import Footer from "./components/layout/Footer";
import About from "./components/About";
import EditCard from "./components/EditCard";
import ProfilePage from "./components/ProfilePage";
import EditUser from "./components/EditUser";
import PageNotFound from "./components/ReusableComp/Misc/PageNotFound";
import AdminLayout from "./components/layout/AdminLayout";
import UserManager from "./components/UserManager";

export interface Quarry {
  search: string;
  setSearch: (value: string) => void;
}
export const searchContext = createContext<Quarry>({
  search: "",
  setSearch: () => {},
});

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <searchContext.Provider value={{ search, setSearch }}>
        <ToastContainer />
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="create-card" element={<CreateCard />} />
              <Route path="my-cards" element={<MyCards />} />
              <Route path="fav-cards" element={<FavCards />} />
              <Route path="cards/:id" element={<CardLanding />} />
              <Route path="about" element={<About />} />
              <Route path="edit-card/:id" element={<EditCard />} />
              <Route path="profile-page/:id" element={<ProfilePage />} />
              <Route path="edit-user/:id" element={<EditUser />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<UserManager />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </searchContext.Provider>
    </>
  );
}

export default App;
