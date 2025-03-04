import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { getAllCards } from "../services/cardsCrud";
import { userContext } from "../services/userContext";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";
import CardLinks from "./CardLinks";



interface CardsProps {}

const ITEMS_PER_PAGE: number = 8;

const Cards: FunctionComponent<CardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const { user } = useContext(userContext);
  const { theme } = useContext(ThemeContext);
  const {search} = useContext(searchContext);

  const filteredCards = cards.filter((card) => card.title.toLowerCase().includes(search.toLowerCase()))


  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const indexOfLastCard = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCard = indexOfLastCard - ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

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
        {currentCards.length > 0 ? (currentCards.map((card: Card) => (
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
                <span className="secondary-text ml-2">{card.address.city}</span>
              </p>
              <p>
                <span className="font-semibold">House Num:</span>
                <span className="secondary-text ml-2">
                  {card.address.houseNumber}
                </span>
              </p>
            </div>
            <div className="flex flex-row px-3 my-2 space-x-4">
              <CardLinks myCardComponent={false}/>
            </div>
          </div>
        ))) : (
          <p className="my-10 text-2xl ">
            Sorry! No cards found!
          </p>
        )}
      </div>
      <div className="flex justify-center my-4">
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : `hover:bg-${theme} card`
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : `hover:bg-${theme} card`
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Cards;
