"use client"

import { useRouter } from "next/navigation"

const Pricing = () => {
  const router = useRouter()
  return (
    <div>
      <h1>Pricing</h1>
      <button onClick={() => router.push("/login")}>
        Go to Login page
      </button>
    </div>
  )
}

export default Pricing