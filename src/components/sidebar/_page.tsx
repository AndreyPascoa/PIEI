'use client';

import { useState } from "react";
import styles from "./page.module.css";
import { style } from "framer-motion/client";


export default function Sidebar() {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <h1 className={styles.title}>SEIREN TÊXTIL</h1>

            <div className={styles.dropdown}>
                <div className={styles.dropdown_item} onClick={() => setOpen(!open)}>
                    <img src="/assets/overview.png" className={styles.icon} />
                    <span className={styles.dropdown_text}>Overview</span>
                </div>

                {
                    open && (
                        <>
                            <div className={styles.dropdown_item}>
                                <img src="/assets/calendar.png" className={styles.icon} />
                                <span className={styles.dropdown_text}>Calendar</span>
                            </div>
                            <div className={styles.dropdown_item}>
                                <img src="/assets/Analytics.png" className={styles.icon} />
                                <span className={styles.dropdown_text}>Analytics</span>
                            </div>
                            <div className={styles.dropdown_item}>
                                <img src="/assets/activity.png" className={styles.icon} />
                                <span className={styles.dropdown_text}>Activity</span>
                            </div>
                            <div className={styles.dropdown_item}>
                                <img src="/assets/folder.png" className={styles.icon} />
                                <span className={styles.dropdown_text}>Projects</span>
                            </div>
                        </>
                    )
                }
            </div>

            <div className={styles.dropdown}>

                <h2 className={styles.sub_title} >Projetos</h2>

            </div>
        </div>
    )
}