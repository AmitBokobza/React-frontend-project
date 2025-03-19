import { FunctionComponent, useContext } from "react";
import Cards from "../Cards";
import { userContext } from "../../services/userContext";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeProvider";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`px-5 py-12 md:py-16 ${
          theme === "light"
            ? "bg-gradient-to-br from-blue-50 to-white"
            : "bg-gradient-to-br from-slate-800 to-slate-900"
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-10 space-y-4">
              <div className="inline-block  px-4 py-2 rounded-full mb-4">
                <span
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-blue-700" : "text-blue-300"
                  }`}
                >
                  Discover Exciting Cards
                </span>
              </div>

              <h1
                className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 ${
                  theme === "light" ? "text-slate-900" : "text-white"
                }`}
              >
                Cards Showcase
              </h1>

              <p
                className={`text-xl md:text-2xl max-w-3xl mx-auto ${
                  theme === "light" ? "text-slate-600" : "text-slate-300"
                }`}
              >
                Explore a curated collection of Business Cards.
              </p>
            </div>

            {(user?.isBusiness || user?.isAdmin) && (
              <div className="mt-8">
                <Link
                  to="/create-card"
                  className={`
              inline-flex items-center gap-3 
              px-7 py-3.5 
              rounded-xl 
              text-white 
              transform transition-all duration-300 
              hover:-translate-y-1 
              ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50"
                  : "bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 shadow-xl hover:shadow-2xl shadow-blue-900/50 hover:shadow-purple-900/50"
              }
              focus:outline-none focus:ring-4 
              font-semibold 
              text-base 
              transition-all 
              group
            `}
                >
                  Create New Card
                </Link>
              </div>
            )}
          </div>

          <div className="w-full mt-12 md:mt-16">
            <Cards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
