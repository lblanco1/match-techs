import React, { useState } from 'react';
import styles from "./SignInPage.module.css"
import { useForm, useController } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import Lock from "../../../../../../src/assets/img/Lock.png"
import Email from "../../../../../../src/assets/img/Email.svg"

export default function SignInPage() {
    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();

    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    const { field: email } = useController({
        name: 'email',
        control,
        rules: {
            required: true,
            pattern: emailPattern,
        },
    });

    const { field: senha } = useController({
        name: 'senha',
        control,
        rules: { required: true },
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate('/manutencao'); // Navegar para a página desejada após a submissão do formulário
    };

    const handleEmailChange = (e) => {
        setEmailValid(emailPattern.test(e.target.value));
        email.onChange(e);
    };

    const handlePasswordChange = (e) => {
        setPasswordValid(e.target.value.length > 0);
        senha.onChange(e);
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h1 className={styles.form_title}>LOGIN DO CLIENTE</h1>

                <div className={styles.content}>
                    <label>Digite seu usuário<span className={styles.required_symbol}></span></label>
                    <input
                        type="email"
                        placeholder="Ex: email@example.com"
                        {...email}
                        onChange={handleEmailChange}
                    />
                    <img src={Email} alt="Email" className={styles.img} />
                </div>

                <div className={styles.flex}>
                    <label> Senha<span className={styles.required_symbol}></span></label>
                    <h3>Esqueceu sua senha?</h3>
                </div>

                <div className={styles.content}>
                    <input
                        type="password"
                        placeholder='Insira aqui a sua senha'
                        {...senha}
                        onChange={handlePasswordChange}
                    />
                    <img src={Lock} alt="Lock" className={styles.img} />
                </div>

                <div className={styles.custom_button}>
                    <button
                        className={styles.custom_button_submit}
                        type="submit"
                        disabled={!emailValid || !passwordValid}
                    >
                        Entrar
                    </button>
                </div>

                <div className={styles.conteiner}>
                    <div className={styles.form_question}>Não tem cadastro?</div>
                    <Link className={styles.form_start} to="/cadastro">
                        Comece por aqui
                    </Link>
                </div>
            </form>
        </div>
    );
}
