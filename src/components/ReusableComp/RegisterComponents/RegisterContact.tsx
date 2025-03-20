import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import InputForm from "../InputForm";

interface RegisterContactProps {
  isCreate: boolean;
  formik: FormikValues;
}

const RegisterContact: FunctionComponent<RegisterContactProps> = ({
  isCreate,
  formik,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div
        className={`p-4 md:p-6 ${
          theme === "dark" ? "bg-gray-800/20" : "bg-white/50"
        } rounded-lg`}
      >
        <h3
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          } mb-4 pb-2 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
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
    </>
  );
};

export default RegisterContact;
