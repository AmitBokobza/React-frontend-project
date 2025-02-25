import { FunctionComponent, useContext } from "react";
import Cards from "../Cards";
import { ThemeContext } from "../Provider/ThemeProvider";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
    const {theme} = useContext(ThemeContext);


  return (
    <>
      <div className="px-5 py-5">
        {/*Top Area*/}
        <div className="mb-10 px-4 text-center border-b border-gray-300">
          <h1 className="text-7xl">Cards Page</h1>
          <h5 className="my-7 text-xl">Explore a variety of cards!</h5>
        </div>
        {/*Cards Area*/}
        <div className={`w-full`}>
          <div className="mx-auto max-h-[700px] max-w-[1500px] overflow-y-auto">
            <Cards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
