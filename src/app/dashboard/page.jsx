"use client"

import { useRouter } from "next/navigation"

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => router.push("/")} >Go to Home</button>
    </div>
  )
}

export default Dashboard