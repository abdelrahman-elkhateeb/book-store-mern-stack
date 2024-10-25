import { Link } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { IoCart, IoSearch } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { CiHeart } from "react-icons/ci";
import avatar from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Cart page",
    href: "/cart",
  },
  {
    name: "Check Out",
    href: "/checkout",
  },
];

function NavBar() {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const currentUser = false;
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6 sticky top-0 z-50 bg-white">
      <nav className=" flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <LuHome />
          </Link>
          {/* search input */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="what are you looking for ?"
              className="bg-[#eaeaea] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side */}
        <div className="flex items-center relative md:space-x-3 space-x-2">
          <div className="flex items-center">
            {currentUser ? (
              <>
                <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                  <img
                    src={avatar}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* show dropdowns */}
                {isDropDownOpen && (
                  <div className="absolute right-9 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul>
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropDownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <CiHeart className="size-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <IoCart className="size-6" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
