import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Calculate from "./pages/Calculate";
import App from "./App";
import RetrieveRecords from "./pages/fetchRecords";
import Disclaimer from "./pages/Disclaimer";

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
    {
      path: "https://calorie-calculator-project.vercel.app/Disclaimer",
      element: <Disclaimer />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
