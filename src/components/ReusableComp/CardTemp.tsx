import { FunctionComponent, ReactNode, useContext } from "react";
import  Card  from "../../interfaces/Card/Card";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Provider/ThemeProvider";

interface CardTempProps {
  card: Card;
  children?: ReactNode;
}

const CardTemp: FunctionComponent<CardTempProps> = ({ card, children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        key={card._id}
        className={`
            rounded-xl 
            overflow-hidden 
            border 
            transition-all 
            duration-300 
            hover:-translate-y-2 
            ${
              theme === "light"
                ? "bg-white shadow-lg hover:shadow-xl border-gray-200"
                : "bg-slate-800 shadow-md hover:shadow-lg border-slate-700"
            }
          `}
      >
        <Link to={`../cards/${card._id}`} className="block overflow-hidden">
          <div className="relative overflow-hidden">
            <img
              className="w-full h-48 object-cover transition-all duration-300 transform hover:scale-110"
              src={card.image.url}
              alt={card.image.alt}
              loading="lazy"
            />
          </div>
        </Link>

        <div className="p-5">
          <Link to={`../cards/${card._id}`}>
            <h3
              className={`
                font-bold 
                text-xl 
                mb-3 
                transition-colors 
                duration-200 
                ${
                  theme === "light"
                    ? "text-slate-900 hover:text-blue-600"
                    : "text-white hover:text-blue-400"
                }
              `}
            >
              {card.title}
            </h3>
          </Link>

          <p
            className={`
              mb-4 
              text-sm 
              ${theme === "light" ? "text-gray-600" : "text-gray-300"}
            `}
          >
            {card.description}
          </p>

          <div
            className={`space-y-2 mb-4 ${
              theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <span className="font-semibold mr-2">Country:</span>
                {card.address.country}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>
                <span className="font-semibold mr-2">City:</span>
                {card.address.city}
              </span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-purple-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <span className="font-semibold mr-2">House Num:</span>
                {card.address.houseNumber}
              </span>
            </div>
          </div>

          {children}
        </div>
      </div>
    </>
  );
};

export default CardTemp;
