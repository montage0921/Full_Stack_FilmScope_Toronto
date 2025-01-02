import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./containers/Admin.jsx";
import AdminDetail from "./containers/AdminDetail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/detailed-page-admin/:theatre/:showname",
    element: <AdminDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
