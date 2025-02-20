import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import InputForm from "./InputForm";
import { normalizeUser } from "../util/NormalizeUser";
import { registerUser } from "../services/usersCrud";
import toastEmitter from "../emitter/toastEmitter";
import { useNavigate } from "react-router-dom";


interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
        first: "",
        middle: "" ,
        last: "" ,
        phone: "" ,
        email: "" , 
        password: "" , 
        url: "",
        alt: "" ,
        state: "" ,
        country: "" ,
        city: "",
        street: "" ,
        houseNum: "",
        zip: "",
        isBusiness: false
    },
    validationSchema: yup.object({
        first: yup.string().min(2).max(256).required(),
        middle: yup.string().min(2).max(256),
        last: yup.string().min(2).max(256).required(),
        phone: yup.string().min(9).max(11) .matches(
          /^(?:(?:\+972-?(?:[2-9]\d{7}|5\d{8}))|(?:0(?:[2-9]\d{7}|5\d{8})))$/,
          'Phone number must be a valid Israeli phone number'
        ).required(),
        email: yup.string().min(5).required(),
        password: yup.string().min(7).max(20) .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/,
          'Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*-'
        ).required(),
        url: yup.string().min(14),
        alt: yup.string().min(14).max(256),
        state: yup.string().min(2).max(256),
        country: yup.string().min(2).max(256).required(),
        city: yup.string().min(2).max(256).required(),
        street: yup.string().min(2).max(256).required(),
        houseNum: yup.number().required(),
        zip: yup.number().required()
    }),
    onSubmit: (values, {resetForm}) => {
      const newUser = normalizeUser(values);
      registerUser(newUser)
      .then((res:any) => {
        toastEmitter.success(`User ${res.data.email} Successfully Registered!`),
        navigate("/")
      })
      .catch((err) => {
        toastEmitter.error("Registration Failed!");
        console.log(err);
      })
      resetForm();
    },
  });

  return (
    <>
      <div className="container w-75 py-3 px-3 mx-auto ">
        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          <InputForm type="text" name="first" id="firstName" formik={formik} required/>
          <InputForm type="text" name="middle" id="middleName" formik={formik}/>
          <InputForm type="text" name="last" id="lastName" formik={formik} required/>
          <InputForm type="tel" name="phone" id="phone" formik={formik} required/>
          <InputForm type="email" name="email" id="email" formik={formik} required/>
          <InputForm type="password" name="password" id="password" formik={formik} required/>
          <InputForm type="url" name="url" id="url" formik={formik}/>
          <InputForm type="text" name="alt" id="alt" formik={formik}/>
          <InputForm type="text" name="state" id="state" formik={formik}/>
          <InputForm type="text" name="country" id="country" formik={formik} required/>
          <InputForm type="text" name="city" id="city" formik={formik} required/>
          <InputForm type="text" name="street" id="street" formik={formik} required/>
          <InputForm type="number" name="houseNum" id="houseNum" formik={formik} required/>
          <InputForm type="number" name="zip" id="zip" formik={formik} required/>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                name="isBusiness"
                id="isBusiness"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.isBusiness}
              />
            </div>
            <label
              htmlFor="isBusiness"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Business Account?
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
