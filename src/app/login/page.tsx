'use client';

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { API } from "@/utils/API";

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const sessionAuth = sessionStorage.getItem('auth');
        if (sessionAuth === 'true') {
            router.push('/');
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await API.post('/auth', {
                user: name,
                password: password
            });

            const { token, user } = response.data;

            sessionStorage.setItem('auth', 'true');
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));

            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Erro ao fazer login.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <form className={styles.form_container} onSubmit={handleLogin}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.subtitle}>Please enter your credentials</p>

                    {error && <p className={styles.error}>{error}</p>}

                    <div className={styles.input_group}>
                        <input
                            type="text"
                            placeholder=" "
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className={styles.input}
                            required
                        />
                        <label className={styles.floating_label}>Username</label>
                    </div>

                    <div className={styles.input_group}>
                        <input
                            type="password"
                            placeholder=" "
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className={styles.input}
                            required
                        />
                        <label className={styles.floating_label}>Password</label>
                    </div>

                    <div className={styles.options_row}>
                        <button
                            type="button"
                            className={styles.link_button}
                            onClick={() => router.push('/forgot-password')}
                        >
                            Esqueci a senha
                        </button>
                    </div>

                    <button type="submit" className={styles.submit_button}>
                        Entrar
                    </button>

                </form>
            </div>

            <img src="/assets/logo.png" className={styles.logo} alt="Logo" />
            <img src="/assets/pano_logo.png" className={styles.img} alt="Background" />
            <img src="/assets/arco.svg" className={styles.arco} alt="Arco" />
        </div>
    );
}
