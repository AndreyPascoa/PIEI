'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Plus, Settings, ChevronDown, Folder, ChartNoAxesGantt } from 'lucide-react';
import { API } from "@/utils/API";
import { Projeto, Task } from "./type.module";


export default function Sidebar() {
    const [open, setOpen] = useState(false);
    const [nameUser, setNameUser] = useState("");
    const [positionuser, setPositionUser] = useState("");
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {

        const userData = sessionStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setNameUser(user.nome);
            setPositionUser(user.cargo);
            const projects = () => {
                API.post('projeto', { user: user.id_user })
                    .then((response) => {
                        const data = response.data;
                        if (data && data.projetos && data.projetos.length > 0) {
                            setProjetos(data.projetos);
                        }
                    });
            }

            const tasks = () => {
                API.post('tasks', {user: user.id_user })
                    .then((response) => {
                        const data = response.data;
                        if (data && data.tasks && data.tasks.length > 0) {
                            setTasks(data.tasks);
                        }
                    })
            }

            tasks();
            projects();
        }

    }, []);

    return (
        <div className={styles.sidebar_container}>
            <h1 className={styles.title}>Painel de Inteligencia Empresarial Integrado (PIEI)</h1>

            <div className={styles.dropdown}>
                <div className={styles.dropdown_item} onClick={() => setOpen(!open)}>
                    <img src="/assets/overview.png" className={styles.icon} />
                    <span className={styles.dropdown_text}>Overview</span>
                    <ChevronDown className={`${styles.icon} ${open ? styles.open : styles.close}`} />
                </div>

                {open && (
                    <>
                        {[
                            { icon: "/assets/calendar.png", label: "Calendar" },
                            { icon: "/assets/Analytics.png", label: "Analytics" },
                            { icon: "/assets/activity.png", label: "Activity" },
                            { icon: "/assets/folder.png", label: "Projects" },
                        ].map((item, index) => (
                            <div
                                key={item.label}
                                className={`${styles.dropdown_item} ${styles.dropdown_enter}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <img src={item.icon} className={styles.icon} />
                                <span className={styles.dropdown_text}>{item.label}</span>
                            </div>
                        ))}
                    </>
                )}

            </div>

            <div className={styles.dropdown}>
                <div className={styles.project}>
                    <h2 className={styles.sub_title}>Projetos</h2>
                    <Plus className={styles.add_item} />
                </div>

                <div className={styles.itens_project}>
                    {projetos.map((p, index) => {
                        const categoriaTask = tasks.find(task => task.nome === p.categoria);

                        const corCategoria = categoriaTask ? `#${categoriaTask.color_text}` : '#ccc';
                        const bgCategoria = categoriaTask ? `#${categoriaTask.color_text}20` : '#eee';

                        return (
                            <div key={index} className={styles.dropdown_item}>
                                <Folder className={styles.icon} />
                                <span className={styles.name_user}>{p.projeto}</span>
                                <span
                                    className={styles.tags}
                                    style={{
                                        color: corCategoria,
                                        backgroundColor: bgCategoria,
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                    }}
                                >
                                    {p.categoria}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.dropdown} style={{ borderBottom: 'none' }}>
                <div className={styles.project}>
                    <h2 className={styles.sub_title}>TASKS</h2>
                    <Plus className={styles.add_item} />
                </div>

                {tasks.map((p, index) => (
                    <div key={index} className={styles.dropdown_item} style={{ padding: 0, margin: 3 }}>
                        <ChartNoAxesGantt
                            className={`${styles.tasks}`}
                            style={{
                                color: `#${p.color_text}`,
                                backgroundColor: `#${p.color_text}71`,
                            }}
                        />
                        <span className={styles.name_user}>{p.nome}</span>
                    </div>
                ))}

            </div>

            <div className={styles.user}>
                <img src="/assets/user.png" className={styles.perfil} />
                <div>
                    <h3 className={styles.name_user}>{nameUser}</h3>
                    <span className={styles.position_user}>{positionuser}</span>
                </div>
                <Settings className={styles.icon} style={{marginLeft: 'auto'}}/>
            </div>
        </div>
    );
}
