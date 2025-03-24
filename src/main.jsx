import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { AllTodo, CreateNew, Done } from './pages/Index'
import { UpdateItem } from './components/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <AllTodo />
      },
      {
        path: '/create-new',
        element: <CreateNew />
      },
      {
        path: '/done',
        element: <Done />
      },
      {
        path: '/:category/:id',
        element: <UpdateItem />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)