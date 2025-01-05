import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from "./containers/Admin.jsx";
import AdminDetail from "./containers/AdminDetail.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import EditShow from "./containers/EditShow.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/detailed-page-admin/:theatre/:showname",
    element: <AdminDetail />,
  },
  {
    path: "/detailed-page-admin/:theatre/:showname/edit",
    element: <EditShow />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
