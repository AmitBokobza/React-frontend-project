import { FunctionComponent, useContext } from "react";
import Cards from "../Cards";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {

  return (
    <>
      <div className="px-5 py-5">
        {/*Top Area*/}
        <div className="text-center">
          <h1 className="text-7xl">Cards Page</h1>
          <h5 className="my-7 text-xl">Explore a variety of cards!</h5>
        </div>
        {/*Cards Area*/}
        <div className={`w-full`}>
          <Cards />
        </div>
      </div>
    </>
  );
};

export default Home;
