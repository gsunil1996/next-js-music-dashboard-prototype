"use client"
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useRef } from "react";
import { useState } from "react";
import { useRefreshMutation } from "../redux/features/auth/authApiSlice";
import { useEffect } from "react";
import Link from "next/link";


const PersistLogin = ({ children }) => {
  const token = useSelector(selectCurrentToken)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        //  console.log('verifying refresh token')
        try {
          //const response = 
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        }
        catch (err) {
          console.error(err)
        }
      }

      if (!token) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content
  if (isLoading) { // token: no
    //  console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) { // token: no
    //   console.log('error')
    content = (
      <p className='errmsg'>
        {`${error.data?.message} - `}
        <Link href="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) { // token: yes
    //  console.log('success')
    content = children
  } else if (token && isUninitialized) { //, token: yes
    //   console.log('token and uninit')
    //  console.log(isUninitialized)
    content = children
  }

  return content
}

export default PersistLogin