import React, { useEffect, useState } from 'react';
import styles from "./Reset.module.css";
import { useForm } from 'react-hook-form';
import Email from '../../../../../../../assets/img/Email.svg';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { debounce } from 'lodash';

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegex, "E-mail inválido")
    .required("Campo obrigatório"),
});

export default function Reset() {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const validateField = debounce(async (fieldName, value) => {
    try {
      await schema.fields[fieldName].validate(value);
      setError(fieldName, '');
    } catch (error) {
      const errorMessage = error.message || 'Campo inválido';
      setError(fieldName, {
        type: 'manual',
        message: errorMessage,
      });
    }
  }, 300);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value); // Atualiza o valor usando setValue do react-hook-form
    validateField(name, value);
  };

  const onSubmit = (data) => {
    console.log('Submit data:', data);
    navigate('/password');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1 className={styles.form_title}>Problemas com seu login?</h1>
        <h2 className={styles.form_subtitle}>Não tem problema, digite seu e-mail que iremos te ajudar a recuperar sua conta!</h2>

        <div className={styles.content}>
          <label className={styles.rename_label} htmlFor="email">
            Digite seu usuário<span className={styles.required_symbol}></span>
          </label>
          <div className={styles.input_container}>
            <input
              className={styles.rename_input}
              autoComplete='none'
              type="email"
              id="email"
              name="email"
              placeholder="Ex: email@example.com"
              {...register("email")}
              onChange={handleChange}
            />

            <img src={Email} alt="Email" className={styles.img} />
            {errors.email && (
              <span className={`${styles.error_menssage}`}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.custom_button}>
          <button className={styles.custom_button_submit} type="submit">
            Enviar e-mail de recuperação
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.form_question}>Não recebeu o e-mail?</div>
          <Link className={styles.form_start} to="/cadastro">
            Reenviar
          </Link>
        </div>
      </form>
    </div>
  );
}
