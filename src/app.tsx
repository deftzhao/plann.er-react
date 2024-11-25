import { QueryClientProvider } from '@tanstack/react-query'
import { ptBR } from 'date-fns/locale'
import { setDefaultOptions } from 'date-fns/setDefaultOptions'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { queryClient } from './lib/react-query'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'
import { Toaster } from 'sonner'

setDefaultOptions({ locale: ptBR })

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster richColors theme="dark" duration={3000} />
    </QueryClientProvider>
  )
}
