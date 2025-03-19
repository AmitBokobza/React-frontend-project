import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { getAllCards } from "../services/cardsCrud";
import { ThemeContext } from "./Provider/ThemeProvider";
import { searchContext } from "../App";
import CardLinks from "./ReusableComp/CardLinks";
import Spinner from "./ReusableComp/Spinner";
import CardTemp from "./ReusableComp/CardTemp";

interface CardsProps {}

const ITEMS_PER_PAGE: number = 8;

const Cards: FunctionComponent<CardsProps> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<Card[]>([]);
  const { theme } = useContext(ThemeContext);
  const { search } = useContext(searchContext);
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  const deleteCardFromList = (deletedCardId: string) => {
    setCards((prevCards) =>
      prevCards.filter((card) => card._id !== deletedCardId)
    );
  };

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
      } finally {
        setLoading(false);
      }
    };
    fetchCards();
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
      <div className="container mx-auto px-4 py-8">
        {currentCards.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <div className="text-gray-400 text-6xl mb-4">😕</div>
            <h3 className="text-xl font-medium mb-1">Sorry! No cards found!</h3>
            <p className="secondary-text">
              Try adjusting your search criteria or browse all cards
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentCards.map((card: Card) => (
            <CardTemp key={card._id} card={card}>
              <div className="flex space-x-2 mt-2">
                <CardLinks
                  myCardComponent={false}
                  card={card}
                  deletCardFromList={deleteCardFromList}
                />
              </div>
            </CardTemp>
          ))}
        </div>

        {/* Original pagination */}
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
      </div>
    </>
  );
};

export default Cards;
