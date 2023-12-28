import { Provider } from "react-redux";
import Header from "../Header";
import { render } from "@testing-library/react";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";

test("logo should load on rendering header", () => {
  const header = render(
    <StaticRouter>
    <Provider store={store}>
      <Header />
    </Provider>
    </StaticRouter>
  );
  // console.log(header);
 const logo = header.getAllByTestId('logo');
//  console.log(logo); 
 expect(logo[0].src).toBe("https://cdn3.vectorstock.com/i/1000x1000/58/37/food-concept-word-art-vector-21505837.jpg");
});
