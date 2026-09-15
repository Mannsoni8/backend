import { RouterProvider } from "react-router";
import router from "../../../server/src/router/auth.route";
import "./App.css";
import { AuthProvider } from "../modules/auth/context/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
};

export default App;
