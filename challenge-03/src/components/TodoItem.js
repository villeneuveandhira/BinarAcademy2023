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
            <span className="editing" onClick={() => setIsEditing(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
              </svg>
            </span>
            <span className="close" onClick={deleteTodo}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

export default TodoItem;