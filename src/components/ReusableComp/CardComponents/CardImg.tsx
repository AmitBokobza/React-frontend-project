import { FormikValues } from "formik";
import { FunctionComponent } from "react";
import InputForm from "../Misc/InputForm";

interface CardImgProps {
  formik: FormikValues;
}

const CardImg: FunctionComponent<CardImgProps> = ({ formik }) => {
  return (
    <>
      <div className="p-4 md:p-6 bg-white/50 dark:bg-gray-800/20 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Image
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputForm type="url" name="url" id="url" formik={formik} />
          <InputForm type="text" name="alt" id="alt" formik={formik} />
        </div>
      </div>
    </>
  );
};

export default CardImg;
