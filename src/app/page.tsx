import Sidebar from "@/components/sidebar/_page";
import styles from "./page.module.css";

export default function Home() {
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

      </div>
    </div>
  );
}
