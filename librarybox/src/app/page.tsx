import styles from "./page.module.css";
import { Button } from "antd";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Content */}
      <div className={styles.column}>
        <div className={styles.content}>
          <h1>Welcome Siyakwamukela!</h1>
          <h3>A Library for the community established in 1950</h3>
        </div>
      </div>

      {/* Trading Hours */}
      <div className={styles.column}>
        <div className={styles.tradingHours}>
          <h4>Trading Hours</h4>
          <ul>
            <li>Weekdays: 07:30 - 22:00</li>
            <li>Saturday: 08:00 - 15:00</li>
          </ul>
        </div>
        <div className={styles.buttonContainer}>
          <Button href="/signin" className={styles.button} >Sign In</Button>
          <Button href="/signup" className={styles.button} >Sign Up</Button>
        </div>
      </div>
    </main>
  );
}
