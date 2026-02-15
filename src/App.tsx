import { RouterProvider } from 'react-router-dom'

import { router } from '@/presentation/routes/router'

function App() {
  return <RouterProvider router={router} />
}

export default App
