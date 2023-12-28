import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import wrong from "../Images/SWW.png";

const Error = () => {
  const navigate = useNavigate();
  const err = useRouteError();
  console.log(err);
  const { status, statusText } = err;
  return (
    <>
      <div className="flex flex-col items-center p-2">
        <div className="">
          <h1 className="font-bold p-4">{`status is ${status} and the statusText is ${statusText}`}</h1>
        </div>
        <div className="bg-pink-50 flex items-center w-[450px] m-4 flex-col">
          <img className="" src={wrong} />
        </div>
        <div className="flex m-2 p-3">
          <span
            className="font-bold text-3xl text-pink-500  hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Home Page
          </span>
        </div>
      </div>
    </>
  );
};

export default Error;
