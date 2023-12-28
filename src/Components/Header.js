import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import LoginContext from "../utils/loginContext";
import { BsFillCartFill, BsFillInfoSquareFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import Location from "../utils/location";
import Food from "../Images/Food.png";
import { FaBowlFood } from "react-icons/fa6";
import useLocation1 from "../utils/useLocation";
import { CiLocationOn } from "react-icons/ci";

const Heading = () => {
  const [loc, city] = useLocation1();
  return (
    <>
      <a href="/" className="">
        <div className="bg-white-50 flex">
          <img
            data-testid="logo"
            className="h-[80px] mt-2 ml-10"
            src="https://cdn-icons-png.flaticon.com/128/9425/9425742.png"
            alt="logo"
          />
        </div>
      </a>
      <div className="mt-9 2xl:mr-[600px] xl:mr-[300px] text-xl flex">
        <CiLocationOn
          style={{
            fontSize: "1.6rem",
            fontWeight: 800,
            margin: "1px",
          }}
        />
        {city ? (
          <div className="mb-6 ">
            <span className="font-semibold m-1 ">
              <span className="border-b-2 border-black m-1">{city.city}</span>
              <span className="m-1 ">{city.state},</span>
              <span className="m-1">{city.country}</span>
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const { login } = useContext(LoginContext);
  const location = useContext(Location);

  return (
    <div className="flex justify-center shadow-lg ">
      <Heading />

      {/* LOGIN */}
      <div>
        <ul className="flex py-10">
          {location.pathname === "/" ? (
            <li className=" px-8 text-red-500 text-xl ">
              <Link to="/">
                <p style={{ fontSize: "1.2rem", marginRight: "8px" }}>Home</p>
              </Link>
            </li>
          ) : (
            <li className=" px-8 hover:text-red-500 text-xl">
              <Link to="/">
                <p style={{ fontSize: "1.2rem", marginRight: "8px" }}>Home</p>
              </Link>
            </li>
          )}
          {location.pathname === "/about" ? (
            <li className=" px-4 text-red-500 text-xl">
              <Link to="/about">
                <p
                  style={{
                    fontSize: "1.2rem",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  About
                </p>
              </Link>
            </li>
          ) : (
            <li className=" px-4 hover:text-red-500 text-xl">
              <Link to="/about">
                <p
                  style={{
                    fontSize: "1.2rem",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  About
                </p>
              </Link>
            </li>
          )}

          {location.pathname === "/cart" ? (
            <Link to="/cart">
              <li className="px-8 text-medium font-semibold flex items-center  text-red-500 ">
                <BsFillCartFill
                  style={{ fontSize: "1.8rem", marginRight: "8px" }}
                />
                Cart
                {cartItems.length >= 10 ? (
                  <div className="mx-2.5  mb-1 text-xs text-white absolute font-semibold">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </div>
                ) : (
                  <div className="mx-3  mb-1 text-xs text-white absolute font-semibold">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </div>
                )}
              </li>
            </Link>
          ) : (
            <Link to="/cart">
              <li className="px-8 text-medium font-semibold flex items-center text-gray-600 hover:text-red-500 ">
                <BsFillCartFill
                  style={{ fontSize: "1.8rem", marginRight: "8px" }}
                />
                Cart
                {cartItems.length >= 10 ? (
                  <div className="mx-2.5  mb-1 text-xs text-white absolute font-semibold">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </div>
                ) : (
                  <div className="mx-3  mb-1 text-xs text-white absolute font-semibold">
                    {cartItems.length === 0 ? "" : cartItems.length}
                  </div>
                )}
              </li>
            </Link>
          )}

          {login != undefined && login.name != "Login name" ? (
            <li className="hover:text-red-500 text-xl font-semibold flex">
              Hi,{login.name.toUpperCase()}
            </li>
          ) : location.pathname === "/login" ? (
            <li className=" px-8 text-red-500 text-xl">
              <Link to="/login">
                <p
                  style={{
                    fontSize: "1.2rem",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Login
                </p>
              </Link>
            </li>
          ) : (
            <li className=" px-8 hover:text-red-500 text-xl">
              <Link to="/login">
                <p
                  style={{
                    fontSize: "1.2rem",
                    marginRight: "8px",
                    marginTop: "2px",
                  }}
                >
                  Login
                </p>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
