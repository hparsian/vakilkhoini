import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { RouterProvider } from './router.jsx'
import 'vazirmatn/Vazirmatn-font-face.css'
import './index.css'

const container = document.getElementById('root')
const tree = (
  <React.StrictMode>
    <RouterProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </RouterProvider>
  </React.StrictMode>
)

// Build-time prerendering fills #root with real markup, so hydrate it; in
// `vite dev` the container is empty and the app mounts normally.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, tree)
} else {
  ReactDOM.createRoot(container).render(tree)
}

