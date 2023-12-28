import React from "react";

const About = () => {
  return (
    <div className="mt-2 flex flex-col items-center justify-center bg-pink-50 p-4">
      <div className="flex my-2 text-xl">
        <h1 className="font-semibold">App Description:</h1>
        <span>
          This food ordering app is built using{" "}
          <span className="text-pink-600">React</span>.
        </span>
      </div>

      <p className="text-lg font-semibold">
        Here are some key details about the application:
      </p>

      <ul className="my-4 text-lg">
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">Parcel</span> is used as the bundler
          for the application.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          Functional components, inbuilt hooks (e.g.,{" "}
          <span className="text-pink-600">useState</span>,{" "}
          <span className="text-pink-600">useEffect</span>,{" "}
          <span className="text-pink-600">useContext</span>), and custom hooks
          are employed.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          The application utilizes Swiggy's Public API for fetching restaurant
          lists and menus.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          Custom hooks like <span className="text-pink-600">
            useRestaurant
          </span>{" "}
          are created to obtain a list of menu items for a selected restaurant.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          The login page is implemented using{" "}
          <span className="text-pink-600">Formik</span>.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">Shimmer</span> is employed to enhance
          the UI and provide a user-friendly experience.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">Lazy Loading</span> is implemented to
          optimize resource loading.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">Tailwind CSS</span> is used for
          designing and styling the UI.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">React Router</span> handles routing
          within the application.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">Redux Toolkit</span> manages state in
          the application.
        </li>
        <li>
          <span className="font-extrabold mx-2">-</span>
          <span className="text-pink-600">react-hot-toast</span> is used for
          notification pop-ups.
        </li>
      </ul>
    </div>
  );
};

export default About;
