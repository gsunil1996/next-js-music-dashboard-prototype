import React from 'react'
import RequireAuth from '../components/RequireAuth'
import PersistLogin from '../components/PersistLogin'
import Header from '../components/header/Header'
import Sidebar from '../components/sidebar/Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <PersistLogin>
          <RequireAuth allowedRoles={['Admin', 'Creator']}>
            <div style={{ width: "100%" }}>{children}</div>
          </RequireAuth>
        </PersistLogin>
      </div>
    </div>
  )
}

export default Layout