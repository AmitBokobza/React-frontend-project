import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../services/userContext";

interface NavLinksProps {
  user?: IUser | null;
}

const NavLinks: FunctionComponent<NavLinksProps> = ({ user }) => {
  if (!user) {
    return (
      <>
        <div className="flex flex-row">
          <Link to="/">About</Link>
        </div>
      </>
    );
  }

  if (!user.isBusiness) {
    return (
      <>
        <div className="flex flex-row">
          <Link to="/">ABOUT</Link>
          <Link to="/">FAV CARDS</Link>
        </div>
      </>
    );
  }

  if (user.isAdmin) {
    return (
      <>
        <div className="flex flex-row justify-center items-center">
          <Link className="ml-5" to="/">
            ABOUT
          </Link>
          <Link className="ml-5" to="/">
            FAV CARDS
          </Link>
          <Link className="ml-5" to="/">
            MY CARDS
          </Link>
          <Link className="ml-5" to="/">
            SANDBOX
          </Link>
        </div>
      </>
    );
  }

  if (user.isBusiness) {
    return (
      <>
        <div className="hidden justify-center items-center lg:flex lg:flex-row ">
          <Link className="ml-5" to="/">
            ABOUT
          </Link>
          <Link className="ml-5" to="/">
            FAV CARDS
          </Link>
          <Link className="ml-5" to="/">
            MY CARDS
          </Link>
        </div>
      </>
    );
  }
};

export default NavLinks;
