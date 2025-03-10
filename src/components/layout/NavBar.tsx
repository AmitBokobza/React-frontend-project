import { FunctionComponent, useContext, useState } from "react";
import NavLinks from "../ReusableComp/NavLinks";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../Provider/ThemeProvider";
import NavUser from "../ReusableComp/NavUser";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSun } from "react-icons/ci";
import { searchContext } from "../../App";
import SideBar from "../SideBar";


interface NavBarProps {}


const NavBar: FunctionComponent<NavBarProps> = () => {
  
  const { theme, toggleTheme } = useContext(ThemeContext);
  const {setSearch} = useContext(searchContext)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  }
  

  return (
    <nav className={`flex px-3 py-3 items-center justify-between bg-${theme} navbar`}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="logo font-extrabold text-2xl mr-5">AmitBusiness</h1>
        </Link>
        <NavLinks />
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden lg:flex items-center bg-white rounded">
          <label htmlFor="search" className="flex">
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="bg-light text-black py-1 px-1 rounded"
              onChange={(e) => setSearch(e.target.value) }
            />
            <button className="px-1">
              <CiSearch className="text-black text-xl" />
            </button>
          </label>
        </div>
        

        <div className="flex items-center mx-3">
          <button className="mx-3" onClick={toggleTheme}>
            {theme === "light" ? ( <MdDarkMode className="text-xl" />) : (<CiSun className="text-xl"/>)}
          </button>
          <button onClick={handleOpen}>
            <GiHamburgerMenu className="lg:hidden text-2xl" />
          </button>
        </div>
        <div className="hidden ml-3 lg:flex items-center">
          <NavUser />
        </div>
      </div>
       <SideBar isOpen={isOpen} handleOpen={handleOpen}/>
    </nav>
  );
};

export default NavBar;
