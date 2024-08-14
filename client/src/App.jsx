import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem("name")) {
        return redirect("/");
      }
      return null;
    },
    children: [
      {
        path: "/login",
        element: <StartPage />,
      },
    ],
  },
  {
    // element: <Navbar />,
    loader: () => {
      if (!localStorage.getItem("name")) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <GamePage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
