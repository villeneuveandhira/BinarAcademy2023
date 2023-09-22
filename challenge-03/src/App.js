/* import(s) */
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

function App() {
  // 'refresh' state
  const [isRefresh, setIsRefresh] = useState(true);
  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  // router provider paths
  const routes = createBrowserRouter([
    {
      path: "/",
			element: <TodoList setRefresh={setRefresh} isRefresh={isRefresh} />,
		},
    {
      path: "/addtask",
      element: <AddTask setRefresh={setRefresh} />,
    },
	]);

  return <RouterProvider router={routes} />;
}

export default App;
