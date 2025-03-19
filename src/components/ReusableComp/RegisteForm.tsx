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
       <div className="py-12 px-4 md:px-6">
      <div className={`container max-w-4xl py-8 px-6 md:px-8 mx-auto bg-${theme} rounded-xl shadow-lg border ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <form
          className="max-w-3xl mx-auto space-y-10"
          onSubmit={formik.handleSubmit}
        >
          <div className={`p-4 md:p-6 ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"} mb-4 pb-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              Full Name
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className={`p-4 md:p-6 ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"} mb-4 pb-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          <div className={`p-4 md:p-6 ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"} mb-4 pb-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              Image & Alternate Text
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputForm type="url" name="url" id="url" formik={formik} />
              <InputForm type="text" name="alt" id="alt" formik={formik} />
            </div>
          </div>

          <div className={`p-4 md:p-6 ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"} rounded-lg`}>
            <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"} mb-4 pb-2 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className={`flex items-center gap-3 mb-6 p-4 md:p-6 ${theme === "dark" ? "bg-gray-800/20" : "bg-white/50"} rounded-lg`}>
              <input
                name="isBusiness"
                id="isBusiness"
                type="checkbox"
                className={`w-5 h-5 rounded border ${theme === "dark" ? "border-gray-600 bg-gray-700 focus:ring-blue-600" : "border-gray-400 text-blue-600 focus:ring-blue-500"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.isBusiness}
              />
              <label
                htmlFor="isBusiness"
                className={`text-lg font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
              >
                Business Account?
              </label>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              disabled={isCreate ? !formik.dirty || !formik.isValid : false}
              type="submit"
              className={`w-full sm:w-auto text-white ${theme === "dark" 
                ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" 
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"} 
                font-medium rounded-lg text-lg px-8 py-3 text-center 
                transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default RegisterForm;
