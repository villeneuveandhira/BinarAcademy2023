/* import(s) */
import { useState } from "react";

const TodoItem = ({ todo, setRefresh }) => {
  // 'edit/update data' state
  const [editText, setEditText] = useState(todo.task);
  const [isEditing, setIsEditing] = useState(false);

  /* update task (completed or not) */
  const updateTodo = () => {
    todo.complete = !todo.complete;
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }).then(() => {
      console.log('todo updated.')
      setRefresh(true)
    });
  };

  /* delete task */
  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log('todo deleted.')
      setRefresh(true);
    });
  };

  /* update task (task's name) */
  const changeTodo = () => {
    const editedTodo = {...todo, task: editText}
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTodo)
    }).then(() => {
      console.log('todo updated.')
      setIsEditing(false);
      setRefresh(true)
    });
  };

  return (
    /* shows todo list-item */
    <li className={`${todo.complete ? "checked" : ""}`}>
      {/* ternary operator with isEditing status */}
      <div>
        {isEditing ? (
          /* editing input form */
          <div className="task-container">
            <input 
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              />
            <span className="add-button" onClick={changeTodo}>Edit</span>
          </div> 
        ) : (
          /* non-editing input form */
          <div className="task-container">
            <div className="task-item" onClick={updateTodo}>{todo.task}</div>
            <span className="editing" onClick={() => setIsEditing(true)}>i</span>
            <span className="close" onClick={deleteTodo}>x</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;