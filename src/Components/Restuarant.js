import { IMG_URL } from "../Constant";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { addItem, removeItem, increment, decrement } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const Restocard = ({ name, cuisines, cloudinaryImageId }) => {
  return (
    <div className=" w-[300px] p-2 m-2  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-200 duration-300">
      <img src={IMG_URL + cloudinaryImageId}></img>
      <h2 className="font-bold text-1xl">{name}</h2>
      <h3>{cuisines.join(", ")}</h3>
    </div>
  );
};

export const RestoInfo = ({
  name,
  cuisines,
  cloudinaryImageId,
  avgRating,
  totalRatingsString,
  areaName,
  city,
  costForTwoMessage,
  aggregatedDiscountInfo,
  sla,
}) => {
  return (
    <div className="flex">
      <div className="flex flex-col w-[300px]">
        <div className="border-b-2">
          <p className="font-bold m-1 text-2xl">{name}</p>
          <p className="font-thin">{cuisines.join(", ")}</p>
        </div>
        <div className="border-b-2">
          <p className="p-2 ">
            {areaName},{city}
          </p>
        </div>
        <div className="flex justify-between w-[120%] ">
          <p className="m-1">{costForTwoMessage}</p>
          {sla.lastMileTravel < 15 ? (
            <>
              <p className="text-lg m-1">|</p>
              <p className="text-sm m-1 ">{sla.slaString}</p>
              <p className="text-lg m-1 ">|</p>
              <p className="text-sm m-1 p-1">{sla.lastMileTravelString}</p>
            </>
          ) : null}
        </div>
        <div className="flex py-4 ">
          {aggregatedDiscountInfo.descriptionList.map((offer) => {
            return (
              <div className="flex border justify-between w-[200px] mx-2  hover:shadow-lg">
                <p className="w-[200px] p-2 bg-blue-200">
                  <BiSolidOffer />
                  {offer.meta}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-2 ml-[600px] w-[350px] hover:cursor-pointer hover:shadow-2xl bg-pink-100 shadow-lg">
        <img className="rounded-lg" src={IMG_URL + cloudinaryImageId}></img>

        <div className="flex items-center">
          {avgRating >= 4 ? (
            <div className="flex space-x-2 p-1 rounded-sm ml-[68px]">
              <i className="text-green-500 text-xl">
                <AiFillStar />
              </i>
              <p className="text-black text-sm">
                {avgRating} <span className="m-2 py-1">|</span>{" "}
                {totalRatingsString}
              </p>
            </div>
          ) : (
            <div className="flex space-x-2 p-1 rounded-sm  ml-12">
              <i className="text-orange-500 text-xl">
                <AiFillStar />
              </i>
              <p className="text-black text-sm">
                {avgRating}
                <span className="m-2 py-1">|</span> {totalRatingsString}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const FoodCart = ({ food, count }) => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleAddItem = (e) => {
    dispatch(addItem(e));
  };

  const handleRemoveItem = (e) => {
    dispatch(removeItem(e));
  };

  return (
    <>
      <div className="  w-[55%]">
        <div className="flex  justify-between ">
          <div className="">
            <h3 className="text-lg ">{food.name} - </h3>
            <div className="flex text-gray-600 font-medium">
              <div className="flex items-center my-2 text-md ml-0">
                {/* <p className="px-2">Quantity {count}</p> */}
                <span>
                  {" "}
                  ₹{" "}
                  {food.price
                    ? (food.price / 100).toFixed(2)
                    : (food.defaultPrice / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-1 flex-col">
            <img
              className="h-[75] rounded-lg ml-3 p-1"
              alt="res-img"
              src={IMG_URL + food.imageId}
            />
            <div className="flex items-center  bg-pink-50 font-bold w-[100px] justify-between ml-4">
              <button
                className="text-2xl text-green-600"
                onClick={() => handleAddItem(food)}
              >
                +
              </button>
              <span className="text-orange-400 mt-1"> {count}</span>
              <button
                className=" text-2xl text-red-600 mt-1"
                onClick={() => handleRemoveItem(food)}
              >
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
