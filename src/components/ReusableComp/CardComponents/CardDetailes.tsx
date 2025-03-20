import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import InputForm from "../Misc/InputForm";

interface CardDetailesProps {
    formik:FormikValues;
}
 
const CardDetailes: FunctionComponent<CardDetailesProps> = ({formik}) => {
    return ( 
        <>
            <div className="p-4 md:p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Card Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        </>
     );
}
 
export default CardDetailes;