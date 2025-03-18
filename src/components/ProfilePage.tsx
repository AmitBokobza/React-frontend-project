import { FunctionComponent, useContext, useEffect, useState } from "react";
import { userContext } from "../services/userContext";
import { ThemeContext } from "./Provider/ThemeProvider";
import { getUserById } from "../services/usersCrud";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";

interface ProfilePageProps {}

const ProfilePage: FunctionComponent<ProfilePageProps> = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const userId = String(user?._id);
  const { theme } = useContext(ThemeContext);
  const token: string = localStorage.getItem("token") || "";
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      const fetchUser = async () => {
        try {
          const response: any = await getUserById(userId, token);
          setLoggedUser(response.data);
        } catch (error) {
          console.log(error);
          setLoggedUser(null);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, token]);

  if(loading){
    return(
      <p>loading</p>
    )
  }

  if (!user || !token) {
    // If no user or token, show "Must Be Logged In"
    return (
      <div className="text-center">
        <h3 className="my-10">Must Be Logged In!</h3>
      </div>
    );
  }


  if (loggedUser) {
    return (
      <>
        <div
          className={`flex flex-col items-center justify-center min-h-screen bg-${
            theme === "dark" ? "gray-900" : "gray-100"
          } p-6`}
        >
          <div
            className={`w-full max-w-4xl bg-${
              theme === "dark" ? "gray-800" : "white"
            } shadow-lg p-10 rounded-lg card`}
          >
            <div className="flex items-center gap-6">
              <img
                src={
                  loggedUser?.image?.url || "https://via.placeholder.com/150"
                }
                alt={loggedUser?.image?.alt || "Profile Picture"}
                className="w-32 h-32 rounded-full shadow-md border-2 border-gray-300"
              />
              <div>
                <h2
                  className={`text-4xl font-bold text-${
                    theme === "dark" ? "white" : "gray-900"
                  }`}
                >
                  {loggedUser?.name.first}{" "}
                  {loggedUser?.name.middle ? loggedUser.name.middle + " " : ""}
                  {loggedUser?.name.last}
                </h2>
                <p
                  className={`text-lg text-${
                    theme === "dark" ? "gray-300" : "gray-700"
                  }`}
                >
                  {loggedUser?.email}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 text-lg">
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {loggedUser?.phone || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Account Type:</span>{" "}
                {loggedUser?.isBusiness
                  ? "Business"
                  : user?.isAdmin
                  ? "Admin"
                  : "Personal"}
              </div>
            </div>

            <h2
              className={`text-2xl font-semibold mt-8 mb-4 text-${
                theme === "dark" ? "white" : "gray-900"
              }`}
            >
              Address
            </h2>
            <div className="grid grid-cols-2 gap-6 text-lg">
              <div>
                <span className="font-semibold">Street:</span>{" "}
                {loggedUser?.address.street}
              </div>
              <div>
                <span className="font-semibold">House Number:</span>{" "}
                {loggedUser?.address.houseNumber}
              </div>
              <div>
                <span className="font-semibold">City:</span>{" "}
                {loggedUser?.address.city}
              </div>
              <div>
                <span className="font-semibold">Country:</span>{" "}
                {loggedUser?.address.country}
              </div>
              {loggedUser?.address.state && (
                <div>
                  <span className="font-semibold">State:</span>{" "}
                  {loggedUser.address.state}
                </div>
              )}
              {loggedUser?.address.zip && (
                <div>
                  <span className="font-semibold">ZIP Code:</span>{" "}
                  {loggedUser.address.zip}
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={() => navigate(`../edit-user/${loggedUser._id}`)} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
                Edit Profile
              </button>
            </div>

            <p
              className={`text-sm mt-8 text-${
                theme === "dark" ? "gray-500" : "gray-600"
              } text-center`}
            >
              © 2025 AmitBusiness
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default ProfilePage;
