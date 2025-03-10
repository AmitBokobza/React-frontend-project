import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { userContext } from "../services/userContext";
import { getAllCards } from "../services/cardsCrud";
import CardLinks from "./CardLinks";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
    const {user} = useContext(userContext);
    const {theme} = useContext(ThemeContext);
    const {search} = useContext(searchContext)
    const userId = String(user?._id)
    const [cards, setCards] = useState<Card[]>([]);
    const favCards = cards.filter((card) => card.likes?.includes(userId));
    const filterdFav = favCards.filter((card) => card.title.toLowerCase().includes(search.toLowerCase()))
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await getAllCards();
                setCards(response?.data)
            } catch (error) {  
                console.log(error);
            }
        }
        fetchCards();
    },[])

  if (!user) {
    return (
      <div className="text-center">
        <h1 className="my-10 text-3xl">Must be Registered!</h1>
      </div>
    );
  }

    return(
        <>
            <div className="flex flex-wrap justify-center">
          {filterdFav.length > 0 ? (
            filterdFav.map((card: Card) => (
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
                  <CardLinks myCardComponent={false} card={card}/>
                </div>
              </div>
            ))
          ) : (
            <p className="my-10 text-2xl ">Sorry! No cards found!</p>
          )}
        </div>
        </>
    )
}
 
export default FavCards;
