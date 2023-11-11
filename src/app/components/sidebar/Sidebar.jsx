"use client"
import { useEffect, useState, useRef, } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./sidebar.module.css";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useRefreshMutation } from "@/app/redux/features/auth/authApiSlice";
import { selectCurrentToken } from "@/app/redux/features/auth/authSlice";

const menuItems = [
  {
    name: "Home",
    exact: true,
    to: "/",
  },
  {
    name: "Admin",
    exact: true,
    to: "/admin",
  },
  {
    name: "Creator",
    exact: true,
    to: `/creator`,
  },
  {
    name: "User",
    exact: true,
    to: `/user`,
  },

];

const Sidebar = () => {
  const { roles } = useAuth();
  const pathname = usePathname()


  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Find the index of the menu item with a matching "to" value
    const foundIndex = menuItems.findIndex((menuItem) => menuItem.to === pathname);

    // Update the activeIndex if a match is found
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }

    if (pathname.toLowerCase() == "/login" || pathname.toLowerCase() == "/signup" || pathname.toLowerCase() == "/unauthorized") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);

  const token = useSelector(selectCurrentToken);

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
    <>
      {show ?
        <div className={styles.SidebarParent}>
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
            >
              {(menuItem.name === "Home" || (roles.some((role) => role.toLowerCase() === menuItem.name.toLowerCase()))) && (
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  href={menuItem.to}
                >
                  <div
                    className={`${styles.SidebarItem} ${index === activeIndex ? styles.active : ""
                      }`}
                  >
                    <p>{menuItem.name}</p>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div> : <div></div>}
    </>
  )
}

export default Sidebar