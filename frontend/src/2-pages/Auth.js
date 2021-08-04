import React, { useEffect, useState } from "react";
import "../1-css/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  loginUserHandler,
  registerUserHandler,
  userReset,
} from "../5-actions/userActions";
import { toast } from "react-toastify";
import { LoadingSVG } from "../3-components/LoadingComponents";

export default function Auth(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const user = {
      username: data.username,
      password: data.password,
    };
    dispatch(loginUserHandler(user));
  };

  const loginUser = useSelector((state) => state.loginUser);
  const {
    loading: loadingLogin,
    success: successLogin,
    error: errorLogin,
  } = loginUser;

  useEffect(() => {
    if (successLogin) {
      dispatch(userReset());
      toast.success(successLogin.message);
    }
    if (errorLogin) {
      toast.error(errorLogin);
    }
    if (localStorage.getItem("token")) {
      props.history.push("/admin/mon-espace/mon-compte");
    }
    return () => {};
  }, [successLogin, errorLogin]);

  return (
    <form className="page auth" onSubmit={handleSubmit(onSubmit)}>
      <h2>Connexion</h2>
      <input
        {...register("username")}
        type="text"
        placeholder="Nom d'utilisateur"
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Mot de passe"
      />
      <button type="submit" disabled={loadingLogin ? true : false}>
        {loadingLogin ? <LoadingSVG /> : "Valider"}
      </button>
    </form>
  );
}
