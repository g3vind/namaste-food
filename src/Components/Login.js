import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import LoginContext from "../utils/loginContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Navigatetologinpage } from "../utils/location";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is a required field"),

  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});
const Login = () => {
  const navigate = useNavigate();
  const [navigatetocart] = useContext(Navigatetologinpage);
  const { login, setLogin } = useContext(LoginContext);
  return (
    <>
      <div className=" flex justify-center bg-pink-200 p-2 mt-1">
        <h1 className="font-bold text-3xl">Login Page</h1>
      </div>
      <div className="bg-pink-50 m-1">
        <Formik
          validationSchema={schema}
          initialValues={{ name: "", password: "" }}
          onSubmit={(values) => {
            // Alert the input values of the form that we filled
            toast.success(`Hello,${values.name}`);
            setLogin({
              name: values.name,
            });
            setTimeout(() => {
              navigatetocart === "cart" ? navigate("/cart") : navigate("/"); // this is used to navigate to body component
            }, 1000);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="flex justify-center">
              <div className="p-2 m-4">
                {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                <form noValidate onSubmit={handleSubmit} className="p-10 m-10">
                  <label className="font-bold p-2 m-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter username"
                    className="p-4 m-7 rounded-md"
                    id="email"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-red-900">
                    {errors.name && touched.name && errors.name}
                  </p>

                  <label className="font-bold">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Enter password"
                    className="p-4 m-7 mr-4 rounded-md"
                  />

                  <p className="text-red-900">
                    {errors.password && touched.password && errors.password}
                  </p>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-pink-400 p-3 m-4 rounded-md"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
