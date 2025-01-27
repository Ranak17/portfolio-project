import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import { StoreContext, store } from './app/stores/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
import 'react-toastify/dist/ReactToastify.min.css'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </StoreContext.Provider>
  </React.StrictMode>
)
