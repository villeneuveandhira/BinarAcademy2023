/* import(s) */
import { useState } from "react";
import { Link } from "react-router-dom";

const AddTask = ({setRefresh}) => {
  // init state
  const [task, setTask] = useState("");

  /* add new data API if "Add" button is clicked */
  const addTodo = () => {
	  const newTodo = {task, complete: false}
	  fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        }).then(() => {
      // after successfully added new task, reset form state task with empty string
			setTask("")
			setRefresh(true)
			setTimeout(() => {
				alert('New task added.')
			}, 500)
        });
  }

  return (
    /* add task fields */
    <div id="todo-header" className="header">
      <h2>TodoList</h2>
      <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <span className="add-button" onClick={addTodo}>Add</span>
      <Link to="/" className="add-button">
        Back
      </Link>
    </div>
  );
};

export default AddTask;