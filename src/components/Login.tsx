import { FunctionComponent, useContext } from "react";
import InputForm from "./ReusableComp/InputForm";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../services/usersCrud";
import toastEmitter from "../emitter/toastEmitter";
import { useNavigate } from "react-router-dom";
import { IUser, userContext } from "../services/userContext";
import decodeUser from "../util/Decode";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const { setUser } = useContext(userContext);

  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5).required("Email is required!"),
      password: yup.string().required("Password is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      loginUser(values)
        .then((res: any) => {
          localStorage.setItem("token", res.data);
          const decodedUser = decodeUser(res.data);
          setUser(decodedUser as IUser);
          toastEmitter.success("User Logged In Succesfully!");
          navigate("/");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          toastEmitter.error("Wrong Email or Password!");
        });
    },
  });
  return (
    <div className="container w-75 mx-auto px-4 py-8">
      <h2 className="text-4xl font-semibold text-center light:text-gray-800 mb-6">
        Login
      </h2>
      <form
        className="max-w-md mx-auto space-y-6"
        onSubmit={formik.handleSubmit}
      >
        <InputForm
          type="email"
          name="email"
          id="email"
          formik={formik}
          required
        />
        <InputForm
          type="password"
          name="password"
          id="password"
          formik={formik}
          required
        />

        <button
          disabled={!formik.dirty || !formik.isValid}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
