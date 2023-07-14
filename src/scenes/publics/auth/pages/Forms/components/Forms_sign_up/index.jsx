import React, { useEffect, useState } from 'react';
import styles from './Forms.module.css';
import { useForm } from 'react-hook-form';
import User from '../../../../../../../assets/img/User.svg';
import Email from '../../../../../../../assets/img/Email.svg';
import Cellphone from '../../../../../../../assets/img/Cellphone.svg';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { debounce } from 'lodash';

const schema = yup.object().shape({
  name: yup.string()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 'O nome deve conter somente letras')
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .required('Campo obrigatório, por favor preencha.'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  phone: yup
    .string()
    .required('Campo obrigatório')
    .matches(
      /(\([0-9]{2}\)\s?|[0-9]{2}\s?)[9]?[0-9]{4}-?[0-9]{4}/,
      'Número de celular inválido'
    ),
});

export default function Forms() {
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
  // const [setIsValid] = useState(false);

  // useEffect(() => {
  //   setIsValid(Object.keys(errors).length === 0);
  // }, [errors]);

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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.form_title}>Cadastro</h1>
        <h2 className={styles.form_subtitle}>Excelentes vagas esperando por você</h2>

        <div className={styles.content}>
          <label className={styles.rename_label} htmlFor="name">
            Nome<span className={styles.required_symbol}></span>
          </label>
          <input
            className={styles.rename_input}
            autoComplete='none'
            maxLength={50}
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome completo"
            {...register('name')}
            onChange={handleChange}
          />
          <img src={User} alt="User" className={styles.img} />
          {errors.name && (
            <span className={`${styles.error_message} ${styles.error_red}`}>{errors.name.message}</span>
          )}
        </div>

        <div className={styles.content}>
          <label className={styles.rename_label} htmlFor="email">
            Seu melhor E-mail<span className={styles.required_symbol}></span>
          </label>
          <input
            className={styles.rename_input}
            autoComplete='none'
            type="email"
            id="email"
            name="email"
            placeholder="Email@exemplo.com"
            {...register('email')}
            onChange={handleChange}
          />
          <img src={Email} alt="Email" className={styles.img} />
          {errors.email && (
            <span className={`${styles.error_message} ${styles.error_red}`}>{errors.email.message}</span>
          )}
        </div>

        <div className={styles.content}>
          <label className={styles.rename_label} htmlFor="phone">
            Celular<span className={styles.required_symbol}></span>
          </label>
          <InputMask
            className={styles.rename_input}
            autoComplete='none'
            placeholder="(xx) xxxxx-xxxx"
            mask="(99) 99999-9999"
            id="phone"
            name="phone"
            {...register('phone')}
            onChange={handleChange}
          />
          <img src={Cellphone} alt="Cellphone" className={styles.img} />
          {errors.phone && (
            <span className={`${styles.error_message} ${styles.error_red}`}>{errors.phone.message}</span>
          )}
        </div>

        <div className={styles.custom_button}>
          <button className={styles.custom_button_submit} type="submit" >
            Continuar
          </button>
        </div>

        <Link className={styles.form_accout} to="/">
          Já possuo conta
        </Link>
      </form>
    </div>
  );
}
