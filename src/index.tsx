import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './ErrorPage';
import ContactDetails, { loader as contactLoader } from './ContactDetails';
import ContactsApp from './ContactsApp';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/contacts",
        element: <ContactsApp></ContactsApp>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: ":contactId",
            element: <ContactDetails></ContactDetails>,
            errorElement: <ErrorPage></ErrorPage>,
            loader: contactLoader
          }
        ]
      },
    ]
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
