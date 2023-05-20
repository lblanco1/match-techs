import React from 'react';
import styles from "./Forms.module.css"
import { useForm, useController } from 'react-hook-form';
import InputMask from 'react-input-mask';
import User from "../../../../../../../assets/img/User.svg"
import Email from "../../../../../../../assets/img/Email.svg"
import Cellphone from "../../../../../../../assets/img/Cellphone.svg"

export default function Forms() {
   const { control, handleSubmit } = useForm();

   const nameRef = React.useRef(null);
   const emailRef = React.useRef(null);
   const telefoneRef = React.useRef(null);

   const { field: nameField } = useController({
      name: 'nome',
      control,
      rules: { required: true },
   });

   const { field: emailField } = useController({
      name: 'email',
      control,
      rules: {
         required: true,
         pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      },
   });

   const { field } = useController({
      name: 'telefone',
      control,
      rules: { required: true },
   });

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className={styles.container}>
         <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
            <h1 className={styles.form_title}>Cadastro</h1>
            <h2 className={styles.form_subtitle}>Excelentes vagas esperando por você</h2>

            <div className={styles.content}>
               <label>Nome<span className={styles.required_symbol}></span></label>
               <input 
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...nameField}
                  required
                  ref={nameRef}
               />
               <img src={User} alt="User" className={styles.img}/>
            </div>

            <div className={styles.content}>
               <label>Seu melhor E-mail<span className={styles.required_symbol}></span></label>
               <input 
                  type="email" 
                  placeholder="Email@exemplo.com"
                  {...emailField}
                  ref={emailRef}
                  required
               />
               <img src={Email} alt="Email" className={styles.img}/>
            </div>

            <div className={styles.content}>
               <label>Celular<span className={styles.required_symbol}></span></label>
               <InputMask 
                  mask="(99) 99999-9999" 
                  {...field}
                  pattern="(\([0-9]{2}\)\s?|[0-9]{2}\s?)[9]?[0-9]{4}-?[0-9]{4}"
                  ref={telefoneRef}
               />
               <img src={Cellphone} alt="Cellphone" className={styles.img}/>
            </div>

            <button type="submit">Continuar</button>
            <h2 className={styles.form_accout}>Já possuo conta</h2>
         </form>

      </div>
   );
};
