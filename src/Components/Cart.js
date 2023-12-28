import { useDispatch, useSelector } from "react-redux";
import { FoodCart } from "./Restuarant";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import CartImage from "../Images/CartEmpty.png";
import { useContext, useEffect, useState, useRef } from "react";
import LoginContext from "../utils/loginContext";
import { useNavigate } from "react-router-dom";
import { Navigatetologinpage } from "../utils/location";
import { FcApproval } from "react-icons/fc";

const Cart = () => {
  const navigate = useNavigate();
  const [Navigatetologin, setNavigateToLogin] = useContext(Navigatetologinpage);
  const { login } = useContext(LoginContext);
  const [loginbtn, setLoginbtn] = useState(false);
  const [notification, setNotification] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const [newiteminCards, setNewIteminCards] = useState([]);

  useEffect(() => {
    let uniqueCards;
    if (cartItems.length > 0) {
      uniqueCards = [...new Set(cartItems)];
    }
    setNewIteminCards(uniqueCards);
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const showToast = (a) => {
    setTimeout(() => {
      setNotification(true);
    }, 2000);

    setTimeout(() => {
      toast.dismiss(a);

      dispatch(clearCart());
    }, 3000);
  };

  const handlePlaceOrder = () => {
    if (login.name === "Login name") {
      toast("To place your order now, kindly log in to your account", {
        position: "top-right",
      });
      setNavigateToLogin("cart");
      setLoginbtn(true);
    } else {
      let a = toast.loading("Placing Order");
      showToast(a);
    }
  };
  const navigateToLogin = () => {
    navigate("/login");
  };

  let totalAmount = 0;
  cartItems.map((e) => {
    e.price
      ? (totalAmount = totalAmount + e.price / 100).toFixed(2)
      : (totalAmount = totalAmount + e.defaultPrice / 100).toFixed(2);
  });
  const toPay = totalAmount + 29 + 49;
  return cartItems.length === 0 && !notification ? (
    <div className="flex justify-center ">
      <div className="">
        <div className="flex justify-center">
          <span className=" m-1 ml-14 mt-12 font-semibold text-3xl flex justify-center">
            You can go to{" "}
            <Link
              className="text-pink-500 ml-1 mr-1 hover:border-b-[1px] border-b-pink-300"
              to="/"
            >
              Home Page
            </Link>
            to view more restaurants.
          </span>
        </div>
        <div className=" flex  flex-col items-center">
          <img className="w-[500] bg-pink-50 " src={CartImage} />
          <span className="font-bold text-3xl text-pink-500 flex justify-center ">
            Cart is EMPTY!!
          </span>
        </div>
      </div>
    </div>
  ) : notification ? (
    <div className="h-[500px]">
      <div className="">
        <div className="">
          <div className="flex items-center flex-col">
            <div className="animate-bounce mt-32">
              <FcApproval
                style={{
                  fontSize: "3rem",
                  marginRight: "",
                  marginTop: "",
                }}
              />
            </div>
            <span className="m-1 font-medium text-2xl">
              Order Placed successfully
            </span>
            <button
              className="rounded-md bg-orange-500 text-white p-3 m-6"
              onClick={() => {
                navigate("/");
              }}
            >
              Go to restaurant
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col bg-pink-50 m-1 p-2 shadow-lg">
      {loginbtn && (
        <div className="fixed  left-1/2 transform -translate-x-1/2 z-50">
          <button
            className=" text-white px-4 py-2 rounded-lg shadow-md"
            onClick={navigateToLogin}
          >
            Click here to logIn
          </button>
        </div>
      )}
      <div className="flex justify-between">
        {cartItems.length === 1 ? (
          <h1 className="font-bold text-3xl p-2 m-3">
            Cart Item - {cartItems.length}
          </h1>
        ) : (
          <h1 className="font-bold text-3xl p-2 m-3">
            Cart Items - {cartItems.length}
          </h1>
        )}

        <button
          className="p-2 m-3 bg-red-500 font-bold rounded-md"
          onClick={() => handleClearCart()}
        >
          Clear Cart
        </button>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col   p-1 m-1 w-[50%] ml-40">
          {newiteminCards.map((e) => {
            //  iteminCards
            let a = cartItems.filter((c) => {
              return c.id === e.id;
            }).length;

            return a === 0 ? null : <FoodCart food={e} count={a} key={e.id} />;
          })}
        </div>

        <div className="h-[400px]">
          <div className="flex  my-4 border-b-2 border-b-black  mt-28">
            <div className="">
              <div className="border-b-2 p-2">
                <h2 className="mx-14 px-10">Bill Details</h2>
              </div>
              <div className="my-2">
                <div className="flex items-center justify-between">
                  <p>Item Total</p>{" "}
                  <span className="mx-10">₹ {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>Delivery Fee</p> <span className="mx-10">₹ 29</span>
                </div>
                <div className="flex items-center justify-between">
                  <p>GST and Restaurant Charges</p>
                  <span className="mx-10">₹ 49</span>
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold flex items-center justify-between">
            <p>TO PAY</p> <span className="mx-12">₹ {toPay.toFixed(2)}</span>
          </div>
        </div>

        <div className="m-16 ">
          <div>
            <button
              className="p-2 m-1 bg-green-500 font-bold rounded-md text-white"
              onClick={() => {
                handlePlaceOrder();
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
