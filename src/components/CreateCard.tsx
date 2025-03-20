import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext } from "react";
import * as yup from "yup";
import CardForm from "./ReusableComp/CardComponents/CardForm";
import { userContext } from "../services/userContext";
import { normalizeCard } from "../util/Normalize";
import { useNavigate } from "react-router-dom";
import { createCard } from "../services/cardsApiServices";
import toastEmitter from "../emitter/toastEmitter";
import NoAccess from "./ReusableComp/Misc/NoAccess";

interface CreateCardProps {}

const CreateCard: FunctionComponent<CreateCardProps> = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const token: string = localStorage.getItem("token") || "";

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNum: "",
      zip: "",
    },
    validationSchema: yup.object({
      title: yup.string().min(2).max(256).required("Title is required!"),
      subtitle: yup.string().min(2).max(256).required("Subtitle is required!"),
      description: yup
        .string()
        .min(2)
        .max(1024)
        .required("Description is required!"),
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
      web: yup.string().min(14).required("Web is required!"),
      url: yup.string().min(14),
      alt: yup.string().min(2).max(256),
      state: yup.string(),
      country: yup.string().required("Country is required!"),
      city: yup.string().required("City is required!"),
      street: yup.string().required("Street is required!"),
      houseNum: yup.number().min(1).required("House Number is required!"),
      zip: yup.number().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedCard = normalizeCard(values);
      createCard(normalizedCard, token)
        .then(() => {
          toastEmitter.success("Card Succesfully Created!");
          navigate("/");
        })
        .catch(() => {
          toastEmitter.error("Failed Creating Card");
        });
      resetForm();
    },
  });

  if (user?.isBusiness || user?.isAdmin) {
    return (
      <>
        <div className="text-center">
          <h1 className="text-3xl my-5">Create Card</h1>
        </div>
        <CardForm formik={formik} />
      </>
    );
  } else {
    return <NoAccess />;
  }
};

export default CreateCard;
