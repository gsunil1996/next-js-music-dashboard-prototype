"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <main className={styles.main}>
      <div>
        <h1>Home page</h1>
        <button onClick={() => router.push("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </main>
  );
}
