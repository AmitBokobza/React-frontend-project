import { FunctionComponent, useContext, useEffect, useState } from "react";
import { userContext } from "../services/userContext";
import Card from "../interfaces/Card/Card";
import { searchContext } from "../App";
import { getAllMyCards } from "../services/cardsCrud";
import { ThemeContext } from "./Provider/ThemeProvider";
import CardLinks from "./CardLinks";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
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
      }
    };
    fetchMyCards();
  }, []);

  if (user?.isBusiness || user?.isAdmin) {
    return (
      <>
        <div className="text-center">
          <h1 className="my-4 text-7xl">My Cards</h1>
        </div>
        <div className="flex flex-wrap justify-center">
          {filteredCards.length > 0 ? (
            filteredCards.map((card: Card) => (
              <div
                className={`w-[350px] min-h-[400px] my-10 mx-3 border rounded bg-${theme} card`}
                key={card._id}
              >
                <div>
                  <img
                    className="w-full h-[200px] rounded-tl rounded-tr object-cover"
                    src={card.image.url}
                    alt={card.image.alt}
                  />
                </div>
                <div className="font-semibold text-2xl px-3 py-2">
                  <h3>{card.title}</h3>
                </div>
                <div className="px-3 text-m text-gray-500">
                  <p>{card.description}</p>
                </div>
                <div className="flex flex-col p-3">
                  <p>
                    <span className="font-semibold">Country:</span>
                    <span className="secondary-text ml-2">
                      {card.address.country}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">City:</span>
                    <span className="secondary-text ml-2">
                      {card.address.city}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold">House Num:</span>
                    <span className="secondary-text ml-2">
                      {card.address.houseNumber}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row px-3 my-2 space-x-4">
                  <CardLinks
                    myCardComponent={true}
                    card={card}
                    deletCardFromList={deleteCardFromList}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="my-10 text-2xl ">Sorry! No cards found!</p>
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
