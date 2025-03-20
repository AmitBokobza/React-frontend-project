import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card/Card";
import { useNavigate, useParams } from "react-router-dom";
import { getCardById, updateCard } from "../services/cardsApiServices";
import { userContext } from "../services/userContext";
import { FormikValues, useFormik } from "formik";
import * as yup from "yup";
import { normalizeCard } from "../util/Normalize";
import toastEmitter from "../emitter/toastEmitter";
import CardForm from "./ReusableComp/CardComponents/CardForm";
import NoAccess from "./ReusableComp/NoAccess";

interface EditCardProps {}

const EditCard: FunctionComponent<EditCardProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState<Card | null>(null);
  const { user } = useContext(userContext);
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response: any = await getCardById(id as string);
        setCard(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCard();
  }, []);

  const formik: FormikValues = useFormik<FormikValues>({
    initialValues: {
      title: card?.title,
      subtitle: card?.subtitle,
      description: card?.description,
      phone: card?.phone,
      email: card?.email,
      web: card?.web,
      url: card?.image.url,
      alt: card?.image.alt,
      state: card?.address.state,
      country: card?.address.country,
      city: card?.address.city,
      street: card?.address.street,
      houseNum: card?.address.houseNumber,
      zip: card?.address.zip,
    },
    enableReinitialize: true,
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
      zip: yup.number(),
    }),
    onSubmit: (values, { resetForm }) => {
      const normalizedCard = normalizeCard(values);
      updateCard(id as string, normalizedCard, token)
        .then(() => {
          toastEmitter.success("Card Updated!");
          navigate("/my-cards");
        })
        .catch((err) => {
          toastEmitter.error("Failed Creating Card");
          console.log(err);
        });
      resetForm();
    },
  });

  if (!user) {
    return <NoAccess />;
  }
  if (String(user?._id) === card?.user_id || user?.isAdmin) {
    return (
      <>
        <div className="text-center">
          <h1 className="text-3xl my-5">Edit Card</h1>
        </div>
        <CardForm formik={formik} />
      </>
    );
  }

  return <NoAccess />;
};

export default EditCard;
