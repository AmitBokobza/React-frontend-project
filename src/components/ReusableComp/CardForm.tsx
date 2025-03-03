import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import InputForm from "./InputForm";
import { ThemeContext } from "../Provider/ThemeProvider";

interface CardFormProps {
  formik: FormikValues;
}

const CardForm: FunctionComponent<CardFormProps> = ({ formik }) => {
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
            <div className="grid grid-cols-3 gap-6">
              <InputForm
                type="text"
                name="title"
                id="title"
                formik={formik}
                required
              />

              <InputForm
                type="text"
                name="subtitle"
                id="subtitle"
                formik={formik}
                required
              />
              <InputForm
                type="text"
                name="description"
                id="description"
                formik={formik}
                required
              />
            </div>
          </div>
          <div>
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
              <InputForm type="url" name="web" id="web" formik={formik} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold light:text-gray=800 mb-3">
              Image
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
              <InputForm type="number" name="zip" id="zip" formik={formik} />
            </div>
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

export default CardForm;
