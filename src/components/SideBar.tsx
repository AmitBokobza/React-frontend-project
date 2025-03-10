import { FunctionComponent, useContext } from "react";
import NavLinks from "./ReusableComp/NavLinks";
import NavUser from "./ReusableComp/NavUser";
import { IoMdClose } from "react-icons/io";

interface SideBarProps {
  isOpen?: boolean;
  handleOpen: () => void;
}

const SideBar: FunctionComponent<SideBarProps> = ({ isOpen, handleOpen }) => {
  

  return (
    <>
      <div
        className={`z-50 fixed top-0 bottom-0 right-0 w-[350px] h-full transform navbar transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <button onClick={handleOpen}>
            <IoMdClose className="text-2xl" />
          </button>
        </div>

        <div className="flex flex-col items-center my-20">
          <NavLinks isSideBar={true} />
        </div>

        <div>
          <NavUser />
        </div>
      </div>
    </>
  );
};

export default SideBar;
