import { FormikValues } from "formik";
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../Provider/ThemeProvider";
import CardDetailes from "./CardDetailes";
import CardContact from "./CardContact";
import CardImg from "./CardImg";
import CardAddress from "./CardAddress";

interface CardFormProps {
  formik: FormikValues;
}

const CardForm: FunctionComponent<CardFormProps> = ({ formik }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
     <div className="py-12 px-4 md:px-6">
  <div
    className={`container max-w-4xl py-8 px-6 md:px-8 mx-auto bg-${theme} rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden`}
  >
    <div className="absolute top-0 left-0 w-full h-1 gradient-background z-10" />

    <form
      className="max-w-3xl mx-auto space-y-8"
      onSubmit={formik.handleSubmit}
    >
     
      <CardDetailes formik={formik}/>

      
      <CardContact formik={formik}/>

      <CardImg formik={formik}/>

      <CardAddress formik={formik}/>
      
      <div className="flex justify-center py-4">
        <button
          disabled={!formik.dirty || !formik.isValid}
          type="submit"
          className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-3 text-center 
      dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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

export default CardForm;
