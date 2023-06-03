import React from 'react';
import styles from "./SignInPage.module.css"
import { useForm, useController } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Lock from "../../../../../../src/assets/img/Lock.png"
import User from "../../../../../../src/assets/img/User.svg"

export default function SignInPage() {
    const { control, handleSubmit } = useForm();

    const emailField = React.useRef(null);
    const password = React.useRef(null);

    const { field: email } = useController({
        name: 'email',
        control,
        rules: {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
        },
    });

    const { field: senha } = useController({
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
                <h1 className={styles.form_title}>LOGIN DO CLIENTE</h1>

                <div className={styles.content}>
                    <label>Digite seu usuário<span className={styles.required_symbol}></span></label>
                    <input
                        type="email"
                        placeholder="Ex: email@email.com"
                        {...email}
                        required
                        ref={emailField}
                    />
                    <img src={User} alt="User" className={styles.img} />
                </div>

                <div className={styles.content}>
                    <div className={styles.group_password}>
                        <label>Esqueceu sua senha?</label>
                        <label>Senha<span className={styles.required_symbol}></span></label>
                    </div>
                    <div className={styles.content}>
                        <input
                            type="password"
                            placeholder='Insira aqui a sua senha'
                            {...senha}
                            required
                            ref={password}
                        />
                        {/* <img src={showPassword ? Eye : Nosee} className={styles.img} onClick={togglePasswordVisibility} /> */}
                        {/* <img src={Nosee} alt="Nosee" className={styles.img} onClick={passwordVisibility} /> */}
                        <img src={Lock} alt="User" className={styles.img} />
                    </div>
                </div>
                <div className={styles.custom_button}>
                    <Link to="/password">
                        <button type="submit">Entrar</button>
                    </Link>
                </div>
                <h2 className={styles.form_accout}>Já possuo conta</h2>
            </form>
        </div>
    );
}