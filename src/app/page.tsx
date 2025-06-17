'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/components/sidebar/_page";
import RightBar from "@/components/rightbar/page";
import styles from "./page.module.css";
import Dashboard from "@/components/dashboard/page";
import Projeto from "@/components/kanban/project";
import { CalendarDays, Kanban, Logs } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("auth") === "true";
    if (!isAuth) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <div className={styles.grid_container}>
      <div className={styles.sidebar_left}>
        <Sidebar />
      </div>
      <div className={styles.middle}>
        <div className={styles.top}>
          <Dashboard />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bar_options}>
            <div className={styles.icons_container}>
              <CalendarDays className={styles.icons}/>
              <span className={styles.text_icons}>Calendar</span>
            </div>
            <div className={styles.icons_container}>
              <Kanban className={styles.icons}/>
              <span className={styles.text_icons}>Kanban</span>
            </div>
            <div className={styles.icons_container}>
              <Logs className={styles.icons}/>
              <span className={styles.text_icons}>List</span>
            </div>
          </div>
          <Projeto />
        </div>
      </div>
      <div className={styles.sidebar_right}>
        <RightBar />
      </div>
    </div>
  );
}
