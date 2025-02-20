import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

interface UserLayoutProps {}

const UserLayout: FunctionComponent<UserLayoutProps> = () => {
  return (
    <>
        <Outlet/>
    </>
  );
};

export default UserLayout;
