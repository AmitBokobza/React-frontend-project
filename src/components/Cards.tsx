import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { getAllCards } from "../services/cardsCrud";
import { FaPhoneAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { userContext } from "../services/userContext";
import { ThemeContext } from "./Provider/ThemeProvider";


interface CardsProps {}

const Cards: FunctionComponent<CardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const { user } = useContext(userContext);
  const {theme} = useContext(ThemeContext);
  
  

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response: any = await getAllCards();
        setCards(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCards();
  }, []);

  return (
    <>
  <div className={`card bg-${theme} min-h-screen`}>
    <div className="flex flex-wrap justify-center">
      {cards.map((card: Card) => (
        <div
          className={`w-[350px] min-h-[400px] my-10 mx-3 border rounded bg-${theme}`}
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
              <span className="secondary-text ml-2">{card.address.country}</span>
            </p>
            <p>
              <span className="font-semibold">City:</span>
              <span className="secondary-text ml-2">{card.address.city}</span>
            </p>
            <p>
              <span className="font-semibold">House Num:</span>
              <span className="secondary-text ml-2">{card.address.houseNumber}</span>
            </p>
          </div>
          <div className="flex flex-row px-3 my-2 space-x-4">
            <button className="accent">
              <FaPhoneAlt />
            </button>
            <button className="accent">
              <CiHeart className="text-2xl" />
            </button>
            {user?.isBusiness && <button className="accent">Im Business</button>}
          </div>
        </div>
      ))}
    </div>
  </div>
</>
  );
};

export default Cards;
