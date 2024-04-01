import {BsFillPersonFill} from "react-icons/bs";

const Navbar = () => {
    return (
        <div className="flex flex-row m-5">
          <h1 className="mr-auto text-2xl font-extrabold">
              Task Board

          </h1>
            <div className="rounded-3xl p-2 text-2xl  bg-white">
                <BsFillPersonFill />


            </div>
        </div>
    );
};

export default Navbar;