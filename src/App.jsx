import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Category from "./pages/Category.jsx";
import GifPages from "./pages/GifPages.jsx";
import  Favorites  from "./pages/Favorites.jsx";

import "./App.css";

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:category",
      element: <Category />,
    },
    {
      path: "/search/:query",
      element: <Search />,
    },
    {
      path: "/:type/:slug",
      element: <GifPages />,
    },
    {
      path: "/favorites",
      element: <Favorites />,
    },
  ],
}]);

function App() {
  return <RouterProvider router={router}/>;
}
export default App;
