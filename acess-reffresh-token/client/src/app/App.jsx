import { RouterProvider } from "react-router";
import router from "../../../server/src/router/auth.route";
import "./App.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
