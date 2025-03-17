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
    <>
      <div
        className={`flex justify-center items-center min-h-screen bg-${theme} p-6`}
      >
        {card ? (
          <div
            className={`max-w-3xl w-full border rounded shadow-lg p-8 bg-${theme} card text-${
              theme === "dark" ? "white" : "gray-800"
            }`}
          >
            <h1 className="text-center text-4xl font-bold mb-2">
              {card.title}
            </h1>
            <h2 className="text-center text-xl mb-6">{card.subtitle}</h2>

            {card.image?.url && (
              <img
                src={card.image.url}
                alt={card.image.alt || "Card image"}
                className="w-full h-64 object-cover rounded-lg shadow mb-6"
              />
            )}

            <p className="text-lg mb-4">{card.description}</p>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <p>
                <strong>Phone:</strong> {card.phone}
              </p>
              <p>
                <strong>Email:</strong> {card.email}
              </p>
              {card.web && (
                <p className="break-words overflow-hidden">
                  <strong>Website:</strong>{" "}
                  <a
                    href={card.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline break-words"
                  >
                    {card.web}
                  </a>
                </p>
              )}
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">
                    Street
                  </label>
                  <p>
                    {card.address.street} {card.address.houseNumber}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">
                    City
                  </label>
                  <p>{card.address.city}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">
                    State
                  </label>
                  <p>{card.address.state || "N/A"}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">
                    Country
                  </label>
                  <p>{card.address.country}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-semibold text-gray-600">
                    Zip Code
                  </label>
                  <p>{card.address.zip}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h3 className="text-2xl font-semibold text-gray-600">Not Found!</h3>
        )}
      </div>
    </>
  );
};

export default CardLanding;
