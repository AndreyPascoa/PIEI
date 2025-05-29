'use client';

import Sidebar from "@/components/sidebar/_page";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import RightBar from "@/components/chat/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const auth = true;
    if(!auth){
      router.push('/login')
    }
  },[])

  return (
    <div className={styles.grid_container}>
      <div className={styles.sidebar_left}>
        <Sidebar />
      </div>
      <div className={styles.middle}>
        <div className={styles.top}>

        </div>
        <div className={styles.bottom}>

        </div>
      </div>
      <div className={styles.sidebar_right}>
        <RightBar/>
      </div>
    </div>
  );
}
