import React, { useState } from 'react';
import styles from "./SignInPage.module.css"
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Eye from "../../../../../../src/assets/img/Eye.png"
import Nosee from "../../../../../../src/assets/img/Nosee.png"
import Email from "../../../../../../src/assets/img/Email.svg"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { debounce } from 'lodash';

const schema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório, por favor preencha.'),
  password: yup.string()
   .required('Campo obrigatório, por favor preencha.'),
});

export default function SignInPage() {
  // const { control, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  // const [emailValid, setEmailValid] = useState(false);
  // const [passwordValid, setPasswordValid] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const { field: senha } = useController({
  //   name: 'senha',
  //   control,
  //   rules: { required: true },
  // });

  const onSubmit = (data) => {
    console.log(data);
    navigate('/manutencao'); // Navegar para a página desejada após a submissão do formulário
  };

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

  // const handleEmailChange = (e) => {
  //   setEmailValid(emailPattern.test(e.target.value));
  //   email.onChange(e);
  // };

  // const handlePasswordChange = (e) => {
  //   setPasswordValid(e.target.value.length > 0);
  //   senha.onChange(e);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue(name, value); // Atualiza o valor usando setValue do react-hook-form
    validateField(name, value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h1 className={styles.form_title}>LOGIN DO CLIENTE</h1>

        <div className={styles.content}>
          <label htmlFor="email">Digite seu usuário<span className={styles.required_symbol}></span></label>
          <div className={styles.input_container}>
            <input
              type="email"
              id='email'
              placeholder="Ex: email@example.com"
              {...register('email')}
              onChange={handleChange}
            />
            <img src={Email} alt="Email" className={styles.img} />
            {errors.email && (
            <span className={`${styles.error_message} ${styles.error_red}`}>{errors.email.message}</span>
          )}
          </div>
        </div>

        <div className={styles.flex}>
          <label htmlFor="password">Senha<span className={styles.required_symbol}></span></label>
          <Link to="/" className={styles.forgot_password}>Esqueceu sua senha?</Link>
        </div>

        <div className={styles.content}>
          <div className={styles.input_container}>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='Insira aqui a sua senha'
              {...register('password')}
              onChange={handleChange}
            />
            <img src={showPassword ? Eye : Nosee} className={`${styles.img} ${styles.img_eye}`} onClick={togglePasswordVisibility} />
            {errors.password && (
            <span className={`${styles.error_message} ${styles.error_red}`}>{errors.password.message}</span>
          )}
          </div>
        </div>

        <div className={styles.custom_button}>
          <button
            className={styles.custom_button_submit}
            type="submit">
            Entrar
          </button>
        </div>

        <div className={styles.container}>
          <div className={styles.form_question}>Não tem cadastro?</div>
          <Link className={styles.form_start} to="/cadastro">
            Comece por aqui
          </Link>
        </div>
      </form>
    </div>
  );
}
