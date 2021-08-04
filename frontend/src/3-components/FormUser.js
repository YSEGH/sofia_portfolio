import React, { useEffect } from "react";
import "../1-css/FormUser.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getUserHandler,
  resetPasswordHandler,
  updateUserHandler,
  userReset,
} from "../5-actions/userActions";
import { toast } from "react-toastify";
import { LoadingSVG } from "./LoadingComponents";

export default function FormUser() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const getUser = useSelector((state) => state.getUser);
  const { loading, user, error } = getUser;

  const updateUser = useSelector((state) => state.updateUser);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = updateUser;

  const passwordReset = useSelector((state) => state.passwordReset);
  const {
    loading: loadingReset,
    success: successReset,
    error: errorReset,
  } = passwordReset;

  const onSubmit = (data) => {
    const userUpdate = {
      username: user.username,
      password: data.password,
      newPassword: data.newPassword,
    };
    dispatch(updateUserHandler(userUpdate));
  };

  useEffect(() => {
    dispatch(getUserHandler());
    return () => {};
  }, []);

  useEffect(() => {
    if (successUpdate) {
      reset({});
      toast.success(successUpdate.message);
      dispatch(userReset());
    }
    if (successReset) {
      reset({});
      toast.success(successReset.message);
      dispatch(userReset());
    }
    if (errorUpdate) {
      toast.error(errorUpdate);
      dispatch(userReset());
    }
    if (errorReset) {
      toast.error(errorReset);
      dispatch(userReset());
    }
    return () => {};
  }, [successUpdate, successReset, errorUpdate, errorReset]);

  return (
    <form
      className="form-user"
      id="form-user"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Vos informations</h2>
      <input
        type="text"
        defaultValue={user.username}
        placeholder="Votre nom de compte"
        disabled
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Votre mot de passe"
      />
      <input
        {...register("newPassword")}
        type="password"
        placeholder="Votre nouveau mot de passe (optionnel)"
      />

      <button form="form-user" type="submit">
        MODIFIER
      </button>
      <p
        onClick={(e) => {
          e.preventDefault();
          dispatch(resetPasswordHandler());
        }}
      >
        Réinitialiser mon mot de passe.
      </p>
    </form>
  );
}
