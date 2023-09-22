/* import(s) */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({isRefresh, setRefresh}) => {
  // 'todo' state
  const [todos, setTodos] = useState([]);
  // 'filter' state
  const [filter, setFilter] = useState("all");
  // 'search' state
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  /* fetch data 'todo' from json-server */
  useEffect(() => {
    // memanggil API untuk mengambil data todos
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRefresh(false);
          // if Rest API succeeded, save data from response to local state
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false)
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  /* search feature */
  const searchHandler = () => {
    // checks if search null/not
		if (query.length === 0) {
      // reset if null
			setQueryResults([]);
			return;
		}

    // otherwise, search result
		setQueryResults(
			todos.filter((todo) =>
				todo.task.toLowerCase().includes(query.toLowerCase())
			)
		);
	};

  // results variable (not-empty: queryResults, empty: todos)
  const results = queryResults.length !== 0 ? queryResults : todos;

  // filtered todos with result
  const filteredTodos =
    filter === "all" ? results : filter === "done"
      ? results.filter((todo) => todo.complete === true)
      : filter === "todo" &&
        results.filter((todo) => todo.complete === false);
  console.log(queryResults);

  return (
    <>
      {/* buttons & features */}
      <div className="filter-and-search">
        <h1>Todo-List</h1>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="add-button" onClick={searchHandler}>
            Search
          </span>
          <Link to="/addtask" className="add-button">
            Add
          </Link>
        </div>
        <div className="filter">
          <button
            className="filter-button"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="filter-button"
            onClick={() => setFilter("done")}
          >
            Done
          </button>
          <button
            className="filter-button"
            onClick={() => setFilter("todo")}
          >
            Todo
          </button>
        </div>
      </div>
      {/* data 'todo list-item' */}
      <ul id="todo-list">
        {filteredTodos.length === 0 ? (
          <h3 className="result-text">There is no TODO left.</h3>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              todo={todo}
              setRefresh={setRefresh}
              key={todo.id}
            />
          ))
        )}
      </ul>
    </>
  );
};

export default TodoList;