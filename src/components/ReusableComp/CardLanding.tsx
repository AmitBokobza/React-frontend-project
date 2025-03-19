import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../interfaces/Card/Card";
import { getCardById } from "../../services/cardsCrud";
import { ThemeContext } from "../Provider/ThemeProvider";

interface CardLandingProps {}

const CardLanding: FunctionComponent<CardLandingProps> = () => {
  const { id } = useParams();
  const [card, setCard] = useState<Card | null>(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response: any = await getCardById(id as string);
        setCard(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, []);

  return (
    <> <div
    className={`flex justify-center items-center min-h-screen bg-${theme} p-4 md:p-6`}
  >
    {card ? (
      <div
        className={`max-w-3xl w-full rounded-xl shadow-xl overflow-hidden bg-${theme} card text-${
          theme === "dark" ? "white" : "gray-800"
        } border border-gray-200 dark:border-gray-700`}
      >

        <div className="p-6 md:p-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold mb-2 break-words">
            {card.title}
          </h1>
          <h2 className="text-center text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
            {card.subtitle}
          </h2>

          {card.image?.url && (
            <div className="relative overflow-hidden rounded-lg shadow-md mb-8">
              <img
                src={card.image.url}
                alt={card.image.alt || "Card image"}
                className="w-full h-64 object-cover"
                loading="lazy"
              />
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-lg leading-relaxed">{card.description}</p>
          </div>

          <div className={`p-5 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"} mb-6`}>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="font-semibold w-20">Phone:</span>
                <span>{card.phone}</span>
              </div>
              <div className="flex items-start">
                <span className="font-semibold w-20">Email:</span>
                <span>{card.email}</span>
              </div>
              {card.web && (
                <div className="flex items-start">
                  <span className="font-semibold w-20">Website:</span>
                  <a
                    href={card.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors break-words"
                  >
                    {card.web}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className={`p-5 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Street
                </p>
                <p>
                  {card.address.street} {card.address.houseNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  City
                </p>
                <p>{card.address.city}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  State
                </p>
                <p>{card.address.state || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Country
                </p>
                <p>{card.address.country}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Zip Code
                </p>
                <p>{card.address.zip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-center p-8 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Card Not Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          The card you're looking for doesn't exist or has been removed.
        </p>
      </div>
    )}
  </div>
    </>
  );
};

export default CardLanding;
