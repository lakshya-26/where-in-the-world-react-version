import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App'
import ErrorPage from './components/error-page'
import Home from './components/home';
import CountryDetails from './components/CountryDetails';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children:[
        {
            path:'/',
            element:<Home />
        },
        {
            path:'/:CountryDetails',
            element: <CountryDetails />
        }
      ],
      errorElement: <ErrorPage />
    }
  ]);

const root = createRoot(document.querySelector('#root'));

root.render(<RouterProvider router={router} />);