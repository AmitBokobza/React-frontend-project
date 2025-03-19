import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../interfaces/Card/Card";
import { getCardById } from "../../services/cardsCrud";
import { ThemeContext } from "../Provider/ThemeProvider";
import Spinner from "./Spinner";
import ProfileAddress from "./ProfileAddress";
import CardNotFound from "./CardNotFound";

interface CardLandingProps {}

const CardLanding: FunctionComponent<CardLandingProps> = () => {
  const { id } = useParams();
  const [card, setCard] = useState<Card | null>(null);
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState<boolean>(true);
  

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response: any = await getCardById(id as string);
        setCard(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div
        className={`flex justify-center items-center min-h-screen bg-${theme} p-4 md:p-6 relative`}
      >
        {/* Gradient Accent Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          <div
            className="absolute top-1/4 -left-1/4 w-full h-96 rounded-full gradient-background"
            style={{
              filter: "blur(120px)",
              transform: "rotate(-15deg)",
            }}
          />
          <div
            className="absolute bottom-1/4 -right-1/4 w-full h-96 rounded-full gradient-background"
            style={{
              filter: "blur(120px)",
              transform: "rotate(15deg)",
            }}
          />
        </div>

        {card ? (
          <div
            className={`max-w-3xl w-full rounded-xl shadow-xl overflow-hidden bg-${theme} card text-${
              theme === "dark" ? "white" : "gray-800"
            } border border-gray-200 dark:border-gray-700 relative`}
            style={{
              boxShadow:
                theme === "dark"
                  ? "0 10px 25px rgba(79, 138, 213, 0.1)"
                  : "0 10px 25px rgba(142, 86, 201, 0.1)",
            }}
          >
            {/* Gradient Accent Stripe */}
            <div
              className="absolute top-0 left-0 w-full h-1 gradient-background"
            />

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
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 gradient-background"
                  />
                </div>
              )}

              <div className="prose dark:prose-invert max-w-none mb-8">
                <p className="text-lg leading-relaxed">{card.description}</p>
              </div>

              <div
                className={`p-5 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                } mb-6 relative`}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full gradient-background"
                />
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
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors break-words max-w-[calc(100%-5rem)] truncate"
                      >
                        {card.web}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`p-5 rounded-lg ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                } relative`}
              >
                <div
                  className="absolute top-0 left-0 w-1 h-full gradient-background"
                />
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                  Address
                </h3>

                <ProfileAddress card={card} />
              </div>
            </div>
          </div>
        ) : (
          <CardNotFound theme={theme} />
        )}
      </div>
    </>
  );
};

export default CardLanding;
