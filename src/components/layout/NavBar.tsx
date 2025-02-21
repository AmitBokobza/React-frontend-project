import { FunctionComponent, useContext } from "react";
import NavLinks from "../ReusableComp/NavLinks";
import { userContext } from "../../services/userContext";
import { CiSearch } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { ThemeContext } from "../Provider/ThemeProvider";
import NavUser from "../ReusableComp/NavUser";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

interface NavBarProps {}

const NavBar: FunctionComponent<NavBarProps> = () => {
  const { user } = useContext(userContext) ?? { user: undefined };
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex px-3 py-3 items-center justify-between bg-${theme} navbar`}>
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="logo font-extrabold text-2xl mr-5">AmitBusiness</h1>
        </Link>
        <NavLinks user={user} />
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden lg:flex items-center bg-white rounded">
          <label htmlFor="search" className="flex">
            <input
              id="search"
              type="text"
              placeholder="Search"
              className="bg-light text-black py-1 px-1 rounded"
            />
            <button className="px-1">
              <CiSearch className="text-black text-xl" />
            </button>
          </label>
        </div>

        <div className="flex items-center mx-3">
          <button className="mx-3" onClick={toggleTheme}>
            <MdDarkMode className="text-xl" />
          </button>
          <button>
            <GiHamburgerMenu className="lg:hidden text-2xl" />
          </button>
        </div>
        <div className="hidden ml-3 lg:flex items-center">
          <NavUser />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
