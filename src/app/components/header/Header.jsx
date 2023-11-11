"use client"
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { redirect, usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useSendLogoutMutation } from "../../redux/features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";

const Header = () => {
  const [show, setShow] = useState(true);
  const pathname = usePathname();
  const token = useSelector(selectCurrentToken)
  const { username } = useAuth();
  const router = useRouter()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error,
    reset
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      redirect('/login')
      reset()
    } else if (isError) {
      alert(JSON.stringify(error.data?.message))
      reset()
    }
  }, [isSuccess, isError, pathname])

  useEffect(() => {

    if (pathname.toLowerCase() == "/login" || pathname.toLowerCase() == "/signup" || pathname.toLowerCase() == "/unauthorized") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);
  return (
    <>
      {show ?
        <div className={styles.HeaderParent} >
          <div style={{ width: "99%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className={styles.heading}>
              Dashboard
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>
                <h3 style={{ color: "#ff014f" }} >{username}</h3>
              </div>
              <div>
                {token ?
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={sendLogout}
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging Out..." : "Logout"}
                  </Button> : <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>}
              </div>
            </div>
          </div>
        </div> : <div></div>}
    </>
  )
}

export default Header