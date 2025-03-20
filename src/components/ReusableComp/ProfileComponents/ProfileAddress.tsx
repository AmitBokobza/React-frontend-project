import { FunctionComponent } from "react";
import User from "../../../interfaces/User";
import Card from "../../../interfaces/Card/Card";

interface ProfileAddressProps {
  loggedUser?: User;
  card?: Card;
}

const ProfileAddress: FunctionComponent<ProfileAddressProps> = ({
  loggedUser,
  card,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Street</div>
          <div className="font-medium">
            {loggedUser?.address.street}
            {card?.address.street}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            House Number
          </div>
          <div className="font-medium">
            {loggedUser?.address.houseNumber}
            {card?.address.houseNumber}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">City</div>
          <div className="font-medium">
            {loggedUser?.address.city}
            {card?.address.city}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Country
          </div>
          <div className="font-medium">
            {loggedUser?.address.country}
            {card?.address.country}
          </div>
        </div>

        {loggedUser?.address.state && (
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              State
            </div>
            <div className="font-medium">
              {loggedUser.address.state}
              {card?.address.state}
            </div>
          </div>
        )}

        {loggedUser?.address.zip && (
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ZIP Code
            </div>
            <div className="font-medium">
              {loggedUser.address.zip}
              {card?.address.zip}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileAddress;
