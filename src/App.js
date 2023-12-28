import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
import { Body } from "./Components/Body";
import { Footer } from "./Components/Footer";
import About from "./Components/About";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurentMenu";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import Shimmer from "./Components/Shimmer";
import UserContext, { LoginUser } from "./utils/userContext";
import { Provider } from "react-redux";
import store from "./utils/store";

import Login from "./Components/Login";
import LoginContext from "./utils/loginContext";
import { Toaster } from "react-hot-toast";
import Location, { Navigatetologinpage } from "./utils/location";
const Cart = lazy(() => import("./Components/Cart"));
const root = ReactDOM.createRoot(document.getElementById("root"));
const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Prajval Sorate",
    email: "prajwals345@gamil.com",
    contact: "+91-7030587528",
  });
  const location = useLocation();
  const [login, setLogin] = useState({
    name: "Login name",
  });
  const [navigatetologin,setNavigateToLogin] = useState('X');

  return (
    <>
      <Provider store={store}>
        <UserContext.Provider
          value={{
            user: user,
            setUser: setUser,
          }}
        >
          <Navigatetologinpage.Provider value={[navigatetologin,setNavigateToLogin]}>
          <Location.Provider value={location}>
            <LoginContext.Provider
              value={{
                login: login,
                setLogin: setLogin,
              }}
            >
              <Header />
              <Outlet />
              <Footer />
              <Toaster position="top-center" />
            </LoginContext.Provider>
          </Location.Provider>
          </Navigatetologinpage.Provider>
        </UserContext.Provider>
      </Provider>
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
        children: [],
      },

      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },

      {
        path: "/cart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

root.render(<RouterProvider router={appRouter} />);
