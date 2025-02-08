import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import DemoPage from "./pages/DemoPage";
import HomePage from "./pages/HomePage";
import Background from "./components/Background";
import PuzzlePage from "./pages/PuzzlePage";
import HvdPage from "./pages/HvdPage";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Background />}>
        <Route index element={<HomePage />} />
        <Route path="/puzzle/:id" element={<PuzzlePage />} />
        <Route path="/hvd" element={<HvdPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
