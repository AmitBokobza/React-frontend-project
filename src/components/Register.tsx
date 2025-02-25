import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import InputForm from "./ReusableComp/InputForm";
import { normalizeUser } from "../util/NormalizeUser";
import { registerUser } from "../services/usersCrud";
import toastEmitter from "../emitter/toastEmitter";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./Provider/ThemeProvider";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNum: "",
      zip: "",
      isBusiness: false,
    },
    validationSchema: yup.object({
      first: yup.string().min(2).max(256).required("First name is required!"),
      middle: yup.string().min(2).max(256),
      last: yup.string().min(2).max(256).required("Last name is required!"),
      phone: yup
        .string()
        .min(9)
        .max(11)
        .matches(
          /^(?:(?:\+972-?(?:[2-9]\d{7}|5\d{8}))|(?:0(?:[2-9]\d{7}|5\d{8})))$/,
          "Phone number must be a valid Israeli phone number"
        )
        .required("Phone number is required!"),
      email: yup.string().min(5).required("Email is required!"),
      password: yup
        .string()
        .min(7)
        .max(20)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*\-]).{9,}$/,
          "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following special characters: !@#$%^&*-"
        )
        .required("Password is required!"),
      url: yup.string().min(14),
      alt: yup.string().min(14).max(256),
      state: yup.string().min(2).max(256),
      country: yup.string().min(2).max(256).required("Country is required!"),
      city: yup.string().min(2).max(256).required("City is required"),
      street: yup.string().min(2).max(256).required("Street is required!"),
      houseNum: yup.number().required("House number is required!"),
      zip: yup.number().required("Zip code is required!"),
    }),
    onSubmit: (values, { resetForm }) => {
      const newUser = normalizeUser(values);
      registerUser(newUser)
        .then((res: any) => {
          toastEmitter.success(
            `User ${res.data.email} Successfully Registered!`
          ),
            navigate("/");
        })
        .catch((err) => {
          toastEmitter.error("Registration Failed!");
          console.log(err);
        });
      resetForm();
    },
  });

  return (
    <>
      <div
        className={`container max-w-4xl py-8 px-8 mx-auto bg-${theme} rounded-lg shadow-lg`}
      >
        <form
          className="max-w-3xl mx-auto space-y-8"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <h3 className="text-lg font-semibold light:text-gray-700 mb-3">
              Full Name
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <InputForm
                type="text"
                name="first"
                id="firstName"
                formik={formik}
                required
              />

              <InputForm
                type="text"
                name="middle"
                id="middleName"
                formik={formik}
              />
              <InputForm
                type="text"
                name="last"
                id="lastName"
                formik={formik}
                required
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold light:text-gray-700 mb-3">
              Contact Information
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <InputForm
                type="tel"
                name="phone"
                id="phone"
                formik={formik}
                required
              />
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
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold light:text-gray-700 mb-3">
              Image & Alternate Text
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <InputForm type="url" name="url" id="url" formik={formik} />
              <InputForm type="text" name="alt" id="alt" formik={formik} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold light:text-gray=800 mb-3">
              Address
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <InputForm type="text" name="state" id="state" formik={formik} />
              <InputForm
                type="text"
                name="country"
                id="country"
                formik={formik}
                required
              />
              <InputForm
                type="text"
                name="city"
                id="city"
                formik={formik}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-6 mt-4">
              <InputForm
                type="text"
                name="street"
                id="street"
                formik={formik}
                required
              />
              <InputForm
                type="number"
                name="houseNum"
                id="houseNum"
                formik={formik}
                required
              />
              <InputForm
                type="number"
                name="zip"
                id="zip"
                formik={formik}
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <input
              name="isBusiness"
              id="isBusiness"
              type="checkbox"
              className="w-6 h-6 border border-gray-400 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:border-gray-600 transition duration-300"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.isBusiness}
            />
            <label
              htmlFor="isBusiness"
              className="text-lg font-medium light:text-gray-800"
            >
              Business Account?
            </label>
          </div>
          <button
            disabled={!formik.dirty || !formik.isValid}
            type="submit"
            className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-4 text-center 
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
