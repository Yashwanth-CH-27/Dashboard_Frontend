import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from "./Login";
import Layout from "./Layout";
import Core from "./Core"
import ProtectedRoute from "./ProtectedRoutes";


const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (<ProtectedRoute>
            <Core/>
          </ProtectedRoute>),
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default Body;
