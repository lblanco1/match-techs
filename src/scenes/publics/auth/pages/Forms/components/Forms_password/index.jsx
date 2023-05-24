import React, { useState } from 'react';
import styles from "./Forms_password.module.css";
import { useForm, useController } from 'react-hook-form';
import Eye from "../../../../../../../assets/img/Eye.png"
import Nosee from "../../../../../../../assets/img/Nosee.png"
import { Link } from 'react-router-dom';


export default function FormsPassword() {
   const { control, handleSubmit } = useForm();

   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };


   const senhaRef = React.useRef(null);

   const { field: senhaField } = useController({
      name: 'senha',
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
            <h2 className={styles.form_security}>Para sua segurança</h2>

            <label>Crie uma senha<span className={styles.required_symbol}></span></label>
            <div className={styles.content}>
               <input
                  type={showPassword ? 'text' : 'password'}
                  {...senhaField}
                  required
                  ref={senhaRef}
               />
               <img src={showPassword ? Eye : Nosee} className={styles.img} onClick={togglePasswordVisibility} />
               {/* <img src={Nosee} alt="Nosee" className={styles.img} onClick={passwordVisibility} /> */}
            </div>

            <div className={styles.list}>
               <ul>
                  <li>Mínimo de 8 caracteres.</li>
                  <li>Mínimo de um caracter especial (!@#$%_+?/&*)</li>
                  <li>Mínimo de um número</li>
                  <li>Ter letras MAIÚSCULAS</li>
                  <li>Ter letras minúsculas</li>
               </ul>
            </div>

            <div className={styles.conteiner}>
               <div>
                  <Link to="/cadastro">
                     <button type="button">Voltar</button>
                  </Link>
               </div>

               <div>
                  <button type="submit">Concluir</button>
               </div>
            </div>
            <h2 className={styles.form_accout}>Já possuo conta</h2>
         </form>
      </div>
   );
};
