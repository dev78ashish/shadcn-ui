import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'sonner'
import AppRoutes from './Routes/AppRoutes'

const App = () => {
  return (
      <Router>
        <AppRoutes />
        <Toaster richColors position="top-center" />
      </Router>
  )
}

export default App