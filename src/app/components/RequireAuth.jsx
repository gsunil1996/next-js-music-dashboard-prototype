"use client"
import useAuth from "../hooks/useAuth"
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { redirect } from "next/navigation";

const RequireAuth = ({ allowedRoles, children }) => {
  const { roles } = useAuth();
  const token = useSelector(selectCurrentToken)

  const content = (
    roles.some(role => allowedRoles?.includes(role))
      ? children
      : token
        ? redirect("/unauthorized")
        : redirect("/login")
  )

  return content
}

export default RequireAuth