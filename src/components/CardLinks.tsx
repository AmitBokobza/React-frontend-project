import { FunctionComponent, useContext } from "react";
import { FaPhoneAlt, FaRegTrashAlt } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { userContext } from "../services/userContext";

interface CardLinksProps {
myCardComponent?:boolean

}

const CardLinks: FunctionComponent<CardLinksProps> = ({myCardComponent}) => {
  const { user } = useContext(userContext);

  if (!user) {
    return (
      <button className="accent">
        <FaPhoneAlt />
      </button>
    );
  }

  if (user.isAdmin) {
    return (
      <>
        <button className="accent">
          <FaPhoneAlt />
        </button>
        <button className="accent">
          <CiHeart className="text-2xl" />
        </button>
        <button className="accent">
          <FaRegTrashAlt className="text-xl" />
        </button>
      </>
    );
  }

  if (user.isBusiness) {
    return (
      <>
        <button className="accent">
          <FaPhoneAlt />
        </button>
        <button className="accent">
          <CiHeart className="text-2xl" />
        </button>
        {myCardComponent  && (
          <button className="accent">
            <FaRegTrashAlt className="text-xl" />
          </button>
        )}
      </>
    );
  }

  return (
    <>
      <button className="accent">
        <FaPhoneAlt />
      </button>
      <button className="accent">
        <CiHeart className="text-2xl" />
      </button>
    </>
  );
};


export default CardLinks;
