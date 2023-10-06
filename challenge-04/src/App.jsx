import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  /* routing paths */
  const routes = createBrowserRouter([
    {
      path: "/",
			element: <Home />,
		},
    {
      path: "/detail-movie/:id",
      element: <Detail />,
    },
	]);

  return <RouterProvider router={routes} />;
}

export default App