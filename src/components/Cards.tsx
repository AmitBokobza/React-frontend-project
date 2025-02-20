import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { getAllCards } from "../services/cardsCrud";
import { FaPhoneAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { userContext } from "../services/userContext";


interface CardsProps {}

const Cards: FunctionComponent<CardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const {user} = useContext(userContext) ?? {};
  
  

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
      <div className="flex flex-wrap justify-center">
        {cards.map((card: Card) => (
          <div
            className="w-[350px] mix-h-[400px] my-10 mx-3 border border-gray-400 rounded-xl"
            key={card._id}
          >
            <div className="">
              <img
                className="w-full h-[200px] rounded-tl-xl rounded-tr-xl"
                src={card.image.url}
                alt={card.image.alt}
              />
            </div>
            <div className="font-semibold text-2xl px-3">
              <h3>{card.title}</h3>
            </div>
            <div className="px-3 text-m text-gray-400">
              <p>{card.description}</p>
            </div>
            <div className="flex flex-col p-3">
              <p>
                <span className="font-semibold">Country: </span>
                <span className="text-gray-400 ml-2">
                  {card.address.country}
                </span>
              </p>
              <p>
                <span className="font-semibold">City: </span>
                <span className="text-gray-400 ml-2">{card.address.city}</span>
              </p>
              <p>
                <span className="font-semibold">House Num: </span>
                <span className="text-gray-400 ml-2">
                  {card.address.houseNumber}
                </span>
              </p>
            </div>
            <div className="flex flex-row justify-between px-3 my-2">
              <button>
                <FaPhoneAlt />
              </button>
              <button>
                <CiHeart className="text-2xl"/>
              </button>
              {user?.isBusiness && (
                <button>Im Business</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
