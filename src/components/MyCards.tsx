import { FunctionComponent, useContext, useEffect, useState } from "react";
import { userContext } from "../services/userContext";
import Card from "../interfaces/Card/Card";
import { searchContext } from "../App";
import { getAllMyCards } from "../services/cardsApiServices";
import { ThemeContext } from "./Provider/ThemeProvider";
import CardLinks from "./ReusableComp/CardLinks";
import Spinner from "./ReusableComp/Spinner";
import CardTemp from "./ReusableComp/CardTemp";
import CardNotFound from "./ReusableComp/CardNotFound";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(userContext);
  const { search } = useContext(searchContext);
  const token: string = localStorage.getItem("token") || "";
  const [myCards, setMyCards] = useState<Card[]>([]);
  const filteredCards = myCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteCardFromList = (deletedCardId: string) => {
    setMyCards((prevCards) =>
      prevCards.filter((card) => card._id !== deletedCardId)
    );
  };

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        const response: any = await getAllMyCards(token);
        setMyCards(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCards();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center my-20">
        <Spinner />
      </div>
    );
  }
  if (user?.isBusiness || user?.isAdmin) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-4">
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-blue-700" : "text-blue-300"
                }`}
              >
                Your Business Cards
              </span>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-7xl font-bold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              My Cards
            </h1>
          </div>

          {filteredCards.length === 0 ? (
            <CardNotFound theme={theme} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.map((card: Card) => (
                <CardTemp key={card._id} card={card}>
                  <div className="flex space-x-2 mt-2">
                    <CardLinks
                      myCardComponent={true}
                      card={card}
                      deletCardFromList={deleteCardFromList}
                    />
                  </div>
                </CardTemp>
              ))}
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="text-center">
        <h1 className="text-3xl my-10">
          No Acess! Must be Business type user!
        </h1>
      </div>
    );
  }
};

export default MyCards;
