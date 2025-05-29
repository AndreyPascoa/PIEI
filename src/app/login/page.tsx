'use client';

import { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        localStorage.setItem('auth', 'true');
        router.push('/dashboard');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <form className={styles.form_container} onSubmit={handleLogin}>
                    <h1 className={styles.title}>Login</h1>
                    <p className={styles.subtitle}>Please enter your credentials</p>

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

                    <button type="submit" className={styles.submit_button}>Login</button>
                </form>
            </div>

            <img src="/assets/logo.png" className={styles.logo} alt="Logo" />
            <img src="/assets/pano_logo.png" className={styles.img} alt="Background" />
            <img src="/assets/arco.svg" className={styles.arco} alt="Arco" />
        </div>
    );
}
