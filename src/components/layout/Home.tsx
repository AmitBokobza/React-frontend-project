import { FunctionComponent, useContext } from "react";
import Cards from "../Cards";
import { userContext } from "../../services/userContext";
import { Link } from "react-router-dom";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const {user} = useContext(userContext);

  return (
    <>
      <div className="px-5 py-5">
        <div className="text-center">
          <h1 className="text-7xl">Cards Page</h1>
          <h5 className="my-7 text-xl">Explore a variety of cards!</h5>
         {user?.isBusiness || user?.isAdmin ? ( <Link to='/create-card' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Create Card
          </Link>) : ("")}
        </div>
        <div className={`w-full`}>
          <Cards />
        </div>
      </div>
    </>
  );
};

export default Home;
