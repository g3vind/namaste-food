import { createContext } from "react";

const UserContext = createContext({
  user: {
    name: "Govind Kumar",
    email: "g3vind@gmail.com",
  },
});

export default UserContext;
