import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CustomersPage from "./pages/customers";
import OrdersPage from "./pages/orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomersPage />,
  },
  {
    path: "/customers/:customerId",
    element: <OrdersPage />,
  },
]);

function App() {
  return (
    <main className="container mx-auto min-h-screen grid items-center">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
