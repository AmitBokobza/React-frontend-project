import { FunctionComponent } from "react";
import InputForm from "./InputForm";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../services/usersCrud";
import toastEmitter from "../emitter/toastEmitter";
import { useNavigate } from "react-router-dom";


interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().min(5).required(),
      password: yup
        .string()
        .min(7)
        .max(20)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/,
          "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*-"
        )
        .required(),
    }),
    onSubmit: (values, { resetForm }) => {
        loginUser(values)
        .then((res:any) => {
            sessionStorage.setItem("token", res.data)
            toastEmitter.success("User Logged In Succesfully!"),
            navigate("/")

        })
        .catch((err) => {
            console.log(err),
            toastEmitter.error("Failed to Log In!")
        })
        resetForm()
    },
  });
  return (
    <>
      <div className="container w-75 mx-auto px-3 py-3">
        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
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
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
