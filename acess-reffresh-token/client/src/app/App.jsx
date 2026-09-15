import { RouterProvider } from "react-router";
import "./App.css";
import { AuthProvider } from "../modules/auth/context/AuthProvider";
import router from "./app.routes";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
