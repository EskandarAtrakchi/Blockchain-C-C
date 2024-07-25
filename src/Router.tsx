import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calculate from "./pages/Calculate";
import App from "./App";
import RetrieveRecords from "./pages/fetchRecords";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Calculate />,
    },
    {
      path: "/App",
      element: <App />,
    },
    {
      path: "/RetrieveRecords",
      element: <RetrieveRecords />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
