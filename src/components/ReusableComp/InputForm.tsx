import { FormikValues } from "formik";
import { FunctionComponent } from "react";

interface InputFormProps {
  type: string;
  name: string;
  id: string;
  formik: FormikValues;
  required?: boolean;
}

const InputForm: FunctionComponent<InputFormProps> = ({
  required,
  type,
  name,
  id,
  formik,
}) => {
  return (
    <>
      <div className="relative w-full group">
        <label
          htmlFor={id}
          className="block text-base font-medium text-gray-800 dark:text-gray-200 mb-2"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </label>
        
        <input
          type={type}
          name={name}
          id={id}
          required={required}
          placeholder=""
          className="block w-full py-3 px-4 text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
        />
        
        {formik.errors[name] && formik.touched[name] && (
          <span className="block mt-1 text-sm text-red-600 dark:text-red-400">
            {formik.errors[name]}
          </span>
        )}
      </div>
    </>
  );
};

export default InputForm;
