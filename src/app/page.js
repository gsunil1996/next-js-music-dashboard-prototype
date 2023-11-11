"use client";
import { useSelector } from "react-redux";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./redux/features/auth/authApiSlice";
import { selectCurrentToken } from "./redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const token = useSelector(selectCurrentToken);
  const router = useRouter();
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        //  console.log('verifying refresh token')
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1>Home page</h1>
      </div>
      <button onClick={() => router.push("/pricing")}>
        Go to pricing page
      </button>
    </main>
  );
}
