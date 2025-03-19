import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { userContext } from "../services/userContext";
import { getAllCards } from "../services/cardsCrud";
import CardLinks from "./ReusableComp/CardLinks";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";
import { Link } from "react-router-dom";
import Spinner from "./ReusableComp/Spinner";
import CardTemp from "./ReusableComp/CardTemp";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);
  const { search } = useContext(searchContext);
  const userId = String(user?._id);
  const [cards, setCards] = useState<Card[]>([]);
  const favCards = cards.filter((card) => card.likes?.includes(userId));
  const filterdFav = favCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getAllCards();
        setCards(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
  }, []);

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="my-10 text-3xl">Must be Registered!</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
    <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
      <span className={`text-sm font-medium ${theme === 'light' 
        ? 'text-blue-700' 
        : 'text-blue-300'}`}>
        Your Favorites
      </span>
    </div>
    <h1 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold ${theme === 'light' 
      ? 'text-slate-900' 
      : 'text-white'}`}>
      Liked Cards
    </h1>
  </div>

        {filterdFav.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="text-gray-400 text-6xl mb-4">😕</div>
            <p className="text-2xl mb-2">Sorry! No cards found!</p>
            <p className="text-gray-500">
              Try liking some cards to see them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filterdFav.map((card: Card) => (
              <CardTemp key={card._id} card={card}>
                <div className="flex space-x-2 mt-2">
                  <CardLinks myCardComponent={false} card={card} />
                </div>
              </CardTemp>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavCards;
