import React, { useState } from 'react';
import styles from "./Forms_password.module.css";
import { useForm } from 'react-hook-form';
import Eye from "../../../../../../../assets/img/Eye.png"
import Nosee from "../../../../../../../assets/img/Nosee.png"
import { Link } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
   password: yup
      .string()
      .required('Campo obrigatório')
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .matches(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%_+?/&*]).*$/,
         'A senha deve atender aos requisitos mínimos de segurança'
      ),
   confirmPassword: yup
      .string()
      .required('Campo obrigatório')
      .oneOf([yup.ref('password')], 'As senhas não coincidem'),
});

export default function FormsPassword() {
   const { handleSubmit } = useForm();

   const [requirements, setRequirements] = useState({
      length: false,
      specialChar: false,
      number: false,
      uppercase: false,
      lowercase: false,
   });

   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };


   const onSubmit = (data) => {
      console.log(data);
   };

   const checkRequirements = (value) => {
      const length = value.length >= 8;
      const specialChar = /[!@#$%_+?/&*]/.test(value);
      const number = /\d/.test(value);
      const uppercase = /[A-Z]/.test(value);
      const lowercase = /[a-z]/.test(value);

      setRequirements({
         length,
         specialChar,
         number,
         uppercase,
         lowercase,
      });
   };

   return (
      <Formik
         initialValues={{
            password: '',
            confirmPassword: '',
         }}
         validationSchema={schema}
         onSubmit={values => {
            console.log('botao submit acionado')
            // Lógica de envio do formulário
         }}
      >
         {({ handleChange, values }) => (
            <div className={styles.container}>
               <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
                  <h1 className={styles.form_title}>Cadastro</h1>
                  <h2 className={styles.form_subtitle}>Excelentes vagas esperando por você</h2>
                  <h2 className={styles.form_security}>Para sua segurança</h2>

                  <label htmlFor="password">Crie uma senha<span className={styles.required_symbol}></span></label>
                  <div className={styles.content}>
                     {/* <input
                     type={showPassword ? 'text' : 'password'}
                  /> */}
                     <Field
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        onChange={(e) => {
                           handleChange(e);
                           checkRequirements(e.target.value);
                        }}
                        value={values.password}
                     />
                     <img src={showPassword ? Eye : Nosee} className={styles.img} onClick={togglePasswordVisibility} />
                     <ErrorMessage name="password" component="div" />
                  </div>

                  <label htmlFor="confirmPassword">Confirme sua senha<span className={styles.required_symbol}></span></label>
                  <div className={styles.content}>
                     {/* <input
                        type={showPassword ? 'text' : 'password'}
                     /> */}
                     <Field
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={values.confirmPassword}
                     />
                     <img src={showPassword ? Eye : Nosee} className={styles.img} onClick={togglePasswordVisibility} />
                     <ErrorMessage name="confirmPassword" component="div" />
                  </div>


                  <div className={styles.list}>

                     <ul>
                        <li className={requirements.length ? styles.green : styles.red}>Mínimo de 8 caracteres</li>
                        <li className={requirements.specialChar ? styles.green : styles.red}>Mínimo de um caracter especial</li>
                        <li className={requirements.number ? styles.green : styles.red}>Mínimo de um número</li>
                        <li className={requirements.uppercase ? styles.green : styles.red}>Ter letras MAIÚSCULAS</li>
                        <li className={requirements.lowercase ? styles.green : styles.red}>Ter letras minúsculas</li>
                     </ul>

                  </div>

                  <div className={styles.conteiner}>
                     <div>
                        <Link to="/cadastro">
                           <button className={styles.custom_button_submit} type="button">Voltar</button>
                        </Link>
                     </div>

                     <div>
                        <button className={styles.custom_button_submit} type="submit">
                           Concluir
                        </button>
                     </div>
                  </div>
                  <h2 className={styles.form_accout}>Já possuo conta</h2>
               </form>
            </div>
         )}
      </Formik>
   );
};
