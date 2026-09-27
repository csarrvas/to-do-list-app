import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import '@fontsource-variable/atkinson-hyperlegible-next'
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@/index.css'
import { router } from '@/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
