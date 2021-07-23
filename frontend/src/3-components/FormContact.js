import React, { useEffect } from "react";
/* import { useDispatch, useSelector } from "react-redux";
 */ import { useForm } from "react-hook-form";
import "../1-css/FormContact.css";
/* import {
  emailSuccessReset,
  sendEmailHandler,
} from "../../3-actions/emailActions";
import { toast } from "react-toastify";
 */
export default function FormContact() {
  /*   const sendEmail = useSelector((state) => state.sendEmail);
  const { loading, success, error } = sendEmail;
 */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /*   const dispatch = useDispatch();
   */
  const onSubmit = (data) => {
    const message = {
      lastname: data.lastname,
      firstname: data.firstname,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };
    console.log(message);
    /*     dispatch(sendEmailHandler(message));
     */
  };

  useEffect(
    () => {
      /*    if (success) {
      toast.success(success.message);
      reset({});
      dispatch(emailSuccessReset());
    }
    if (error) {
      toast.error(error);
      dispatch(emailSuccessReset());
    } */
      return () => {};
    },
    [
      /* success, error */
    ]
  );

  return (
    <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-text-container">
        <h1>Plus d'infos ?</h1>
        <p>
          N’hésitez pas à me contacter pour toute question, je vous répondrai
          dans les meilleurs délais.
        </p>
      </div>
      <div className="inputs-container">
        <input {...register("lastname")} placeholder="Nom" />
        <input {...register("firstname")} placeholder="Prénom" />
      </div>
      <div className="inputs-container">
        <input {...register("email")} placeholder="Email" />

        <input {...register("phone")} placeholder="Téléphone (optionnel)" />
      </div>
      <textarea {...register("message")} placeholder="Message" />
      <button type="submit">Envoyer</button>
    </form>
  );
}
