import React, { useState } from 'react';
import styles from "./Forms_password.module.css";
import { useForm, useController } from 'react-hook-form';
import Eye from "../../../../../../../assets/img/Eye.png"
import Nosee from "../../../../../../../assets/img/Nosee.png"



export default function Forms() {
   const { control, handleSubmit } = useForm();

   const[passwordVisible, setPasswordVisible]=useState(false)
   const passwordVisibility=()=>{
      setPasswordVisible(!passwordVisible
         )
   }


   //const {viewpassword} = (data) => {

   //}


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

            <div className={styles.content}>
               <label>Crie uma senha<span className={styles.required_symbol}></span></label>
               <input 
                  type={passwordVisible ? 'text' : 'password'}
                  {...senhaField}
                  required
                  ref={senhaRef}
               />

               <img src={Eye} alt="Eye" className={styles.img} onClick={passwordVisibility}/>

               <img src={Nosee} alt="Nosee" className={styles.img} onClick={passwordVisibility}/>


            </div>



            


            <div className={styles.list}>
               <ul>
                  <li>Mínimo de 8 caracteres.</li>
                  <li>Mínimo de um caracter especial ($#@%)</li>
                  <li>Mínimo de um número</li>
                  <li>Ter letras MAIÚSCULAS</li>
                  <li>Ter letras minúsculas</li>
               </ul>
            </div>

            
            <div className={styles.conteiner}>
                  <div className={styles.voltar}>
                  <button type="submit">Voltar</button>
                  </div>

               <div className={styles.concluir}>
                  <button type="submit">Concluir</button>
                </div>

                </div>
            

            <h2 className={styles.form_accout}>Já possuo conta</h2>
         </form>

      </div>
   );
};
