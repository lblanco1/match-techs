import React from 'react';
import styles from "./Forms.module.css"
import { useForm, useController } from 'react-hook-form';
import InputMask from 'react-input-mask';

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
               <label>Nome</label>
               <input 
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...nameField}
                  required
                  ref={nameRef}
               />
            </div>

            <div className={styles.content}>
               <label>Seu melhor E-mail</label>
               <input 
                  type="email" 
                  {...emailField}
                  ref={emailRef}
               />
            </div>

            <div className={styles.content}>
               <label>Celular</label>
               <InputMask 
                  mask="(99) 99999-9999" 
                  {...field}
                  pattern="(\([0-9]{2}\)\s?|[0-9]{2}\s?)[9]?[0-9]{4}-?[0-9]{4}"
                  ref={telefoneRef}
               />
            </div>

            <button>Continuar</button>
            <h2 className={styles.form_accout}>Ja possuo conta</h2>
         </form>

      </div>
   );
};
