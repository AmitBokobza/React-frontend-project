import { FunctionComponent, useContext } from "react";
import InputForm from "./InputForm";
import { FormikValues } from "formik";
import { ThemeContext } from "../Provider/ThemeProvider";

interface RegisterFormProps {
  formik: FormikValues;
  isCreate?: boolean;
}

const RegisterForm: FunctionComponent<RegisterFormProps> = ({
  formik,
  isCreate,
}) => {
  const { theme } = useContext(ThemeContext);
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
              {isCreate && (
                <InputForm
                  type="email"
                  name="email"
                  id="email"
                  formik={formik}
                  required
                />
              )}
              {isCreate && (
                <InputForm
                  type="password"
                  name="password"
                  id="password"
                  formik={formik}
                  required
                />
              )}
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
          {isCreate && (
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
          )}
          <button
            disabled={isCreate ? !formik.dirty || !formik.isValid : false}
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

export default RegisterForm;
