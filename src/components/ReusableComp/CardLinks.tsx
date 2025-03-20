import { FunctionComponent, useContext, useState } from "react";
import { FaPhoneAlt, FaRegTrashAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { userContext } from "../../services/userContext";
import { deleteCard, likeCard } from "../../services/cardsApiServices";
import Card from "../../interfaces/Card/Card";
import toastEmitter from "../../emitter/toastEmitter";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface CardLinksProps {
  myCardComponent?: boolean;
  card?: Card;
  deletCardFromList?: (deleteCardId: string) => void;
}

const CardLinks: FunctionComponent<CardLinksProps> = ({
  myCardComponent,
  card,
  deletCardFromList,
}) => {
  const { user } = useContext(userContext);
  const userId = String(user?._id);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";

  const [likeColor, setLikeColor] = useState<boolean>(() => {
    return card?.likes?.includes(userId) ?? false;
  });

  if (!user) {
    return (
      <a href={`tel:${card?.phone}`} className="accent mt-1">
        <FaPhoneAlt />
      </a>
    );
  }

  if (user.isAdmin) {
    return (
      <>
        <a href={`tel:${card?.phone}`} className="accent mt-1">
          <FaPhoneAlt />
        </a>
        <button className="accent cursor-pointer">
          <CiHeart
            onClick={() => {
              likeCard(card?._id as string, token)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
              setLikeColor(!likeColor);
            }}
            className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
          />
        </button>
        <button
          className="accent cursor-pointer"
          onClick={() => {
            deleteCard(card?._id as string, token)
              .then(() => {
                toastEmitter.success("Card Deleted!");
                if (deletCardFromList) {
                  deletCardFromList(card?._id as string);
                }
              })
              .catch(() => {
                toastEmitter.error("Error deleting card!");
              });
          }}
        >
          <FaRegTrashAlt className="text-xl" />
        </button>
        <button
          className="accent cursor-pointer"
          onClick={() => navigate(`../edit-card/${card?._id}`)}
        >
          <FaEdit className="text-xl" />
        </button>
      </>
    );
  }

  if (user.isBusiness) {
    return (
      <>
        <a href={`tel:${card?.phone}`} className="accent mt-1">
          <FaPhoneAlt />
        </a>
        <button className="accent cursor-pointer">
          <CiHeart
            onClick={() => {
              likeCard(card?._id as string, token)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
              setLikeColor(!likeColor);
            }}
            className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
          />
        </button>
        {myCardComponent && (
          <>
            <button
              className="accent cursor-pointer"
              onClick={() => {
                deleteCard(card?._id as string, token)
                  .then(() => {
                    toastEmitter.success("Card Deleted!");
                    if (deletCardFromList) {
                      deletCardFromList(card?._id as string);
                    }
                  })
                  .catch(() => {
                    toastEmitter.error("Error deleting card!");
                  });
              }}
            >
              <FaRegTrashAlt className="text-xl" />
            </button>
            <button
              className="accent cursor-pointer"
              onClick={() => navigate(`../edit-card/${card?._id}`)}
            >
              <FaEdit className="text-xl" />
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <a href={`tel:${card?.phone}`} className="accent mt-1">
        <FaPhoneAlt />
      </a>
      <button className="accent cursor-pointer">
        <CiHeart
          onClick={() => {
            likeCard(card?._id as string, token)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
            setLikeColor(!likeColor);
          }}
          className={`text-2xl ${likeColor ? `text-red-700` : `accent`}`}
        />
      </button>
    </>
  );
};

export default CardLinks;
