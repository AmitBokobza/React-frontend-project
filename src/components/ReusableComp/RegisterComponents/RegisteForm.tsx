import { FunctionComponent, useContext } from "react";
import { FormikValues } from "formik";
import { ThemeContext } from "../../Provider/ThemeProvider";
import RegisterName from "./RegisterName";
import RegisterContact from "./RegisterContact";
import RegisterImg from "./RegisterImg";
import RegisterAddress from "./RegisterAddress";

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
        <div
          className={`
          container 
          max-w-4xl 
          py-8 
          px-6 
          md:px-8 
          mx-auto 
          bg-${theme} 
          rounded-xl 
          shadow-lg 
          border 
          relative 
          overflow-hidden
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
        >
          <div className="absolute top-0 left-0 w-full h-1 gradient-background z-10" />

          <form
            className="max-w-3xl mx-auto space-y-10"
            onSubmit={formik.handleSubmit}
          >
            {/* Full Name Section */}
            <RegisterName formik={formik} />

            {/* Contact Information Section */}
            <RegisterContact formik={formik} isCreate />

            {/* Image & Alternate Text Section */}
            <RegisterImg formik={formik} />

            {/* Address Section */}
            <RegisterAddress formik={formik} />

            {isCreate && (
              <div
                className={`flex items-center gap-3 mb-6 p-4 md:p-6 ${
                  theme === "dark" ? "bg-gray-800/20" : "bg-white/50"
                } rounded-lg`}
              >
                <input
                  name="isBusiness"
                  id="isBusiness"
                  type="checkbox"
                  className={`w-5 h-5 rounded border ${
                    theme === "dark"
                      ? "border-gray-600 bg-gray-700 focus:ring-blue-600"
                      : "border-gray-400 text-blue-600 focus:ring-blue-500"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.isBusiness}
                />
                <label
                  htmlFor="isBusiness"
                  className={`text-lg font-medium ${
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Business Account?
                </label>
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                disabled={isCreate ? !formik.dirty || !formik.isValid : false}
                type="submit"
                className={`w-full sm:w-auto text-white ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300"
                } 
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
