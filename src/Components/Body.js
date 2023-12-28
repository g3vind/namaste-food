import { Restocard } from "./Restuarant";
import { RestuarantList } from "../Constant";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/common";
import useOnline from "../utils/useOnline";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";
import useLocation1 from "../utils/useLocation";

export const Body = () => {
  const [allRestCard, setAllRestCard] = useState([]);
  const [restacard, setRestaCard] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [location, city] = useLocation1();

  useEffect(() => {
    let loading;
    toast.remove(loading);
    loading = toast.loading("Loading", { duration: 2000 });
    RestaurantCardData();
  }, [location]);

  const isOnline = useOnline();

  if (!isOnline) {
    return <h1>OFFLINE!! Please check your internet connection😥</h1>;
  }
  const toastId = (e) => {
    let id;
    toast.remove(id);
    id = toast.custom(
      <span className="bg-white p-2 py-2 px-2.5 rounded-md flex items-center leading-[1.3rem] will-change-transform shadow-md after:shadow-sm max-w-[350px] ">
        😥 Sorry, we dont have{" "}
        <span className="font-bold m-1">{e.target.value}</span> right now.
      </span>,
      {
        style: {
          minWidth: "250px",
        },
        duration: 500,
      }
    );
    return id;
  };

  async function RestaurantCardData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location?.latitude}&lng=${location?.longitude}`
      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.437973605399232&lng=73.86362334666698"
    );

    const json = await data.json();

    setRestaCard(
      !json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
        ? json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        : json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
    );
    setAllRestCard(
      !json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
        ? json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
        : json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants
    );
  }

  return !restacard || restacard.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="p-3 flex justify-center my-2 ">
        <input
          type="text"
          placeholder="search restaurant"
          className="p-3 flex space-x-1 w-[500px] rounded-lg m-1"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            const data = filterData(e.target.value.toLowerCase(), allRestCard);
            e.target.value === "" || data.length === 0
              ? setRestaCard(allRestCard)
              : setRestaCard(data);
            data.length === 0 ? toastId(e) : null;
          }}
        />
        <button
          className="m-1 bg-pink-50 rounded-md hover:bg-pink-200"
          onClick={() => {
            if (searchText === "") {
              toast("Not anything to search!", {
                icon: "🤔",
              });
              setRestaCard(allRestCard);
            } else {
              const data = filterData(searchText.toLowerCase(), allRestCard);
              if (data.length === 0) {
                toast.custom(
                  <span className="bg-white p-2 py-2 px-2.5 rounded-md flex items-center leading-[1.3rem] will-change-transform shadow-md after:shadow-sm max-w-[350px] ">
                    😥 Sorry, we dont have{" "}
                    <span className="font-bold m-1">{searchText}</span> right
                    now.
                  </span>,
                  {
                    style: {
                      minWidth: "250px",
                    },
                  }
                );
                setRestaCard(allRestCard);
              } else {
                setRestaCard(data);
              }
            }
          }}
        >
          <FiSearch
            style={{
              fontSize: "1.5rem",
              margin: "10px",
            }}
          />
        </button>
      </div>

      <div className="flex flex-wrap cursor-pointer justify-center">
        {restacard?.map((e) => {
          return (
            <Link to={"/restaurant/" + e.info.id} key={e.info.id}>
              <Restocard {...e.info} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
