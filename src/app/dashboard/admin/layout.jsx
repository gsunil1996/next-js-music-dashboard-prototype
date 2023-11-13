import React from 'react'
import RequireAuth from '../../components/RequireAuth'
import PersistLogin from '../../components/PersistLogin'

const Layout = ({ children }) => {
  return (
    <div>
      <PersistLogin>
        <RequireAuth allowedRoles={['Admin']}>
          {children}
        </RequireAuth>
      </PersistLogin>
    </div>
  )
}

export default Layout