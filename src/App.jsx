import Todo from "./components/Todo";
import initialState from "./data/data";
import { useReducer, useState } from "react";

import './App.css'

// Reducer
function todosReducer(state, action) {
  console.log(action);

  switch (action.type) {
    case "toggle_todo": {

      const newTodo = {
        title: action.payload,
        completed: false,
        id: state.length + 1,
        userId: 1,
      };
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    }

    case "edit_todo": {
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.newTitle } : todo
      );
    }
    case "delete_todo": {
      return state.filter(todo => todo.id !== action.payload);
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, dispatch] = useReducer(todosReducer, initialState);
  // console.log(todos);

  const handleAdd = () => {
    if (newTodo.trim() === "") return; 
    dispatch({ type: "add_todo", payload: newTodo });
    setNewTodo(""); 
  };

  const handleEdit = (id) => {
    const newTitle = prompt("Edit todo:");
    if (newTitle && newTitle.trim() !== "") {
      dispatch({ type: "edit_todo", payload: { id, newTitle } });
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: "delete_todo", payload: id });
  };

  const handleToggle = (id) => {
    dispatch({ type: "toggle_todo", payload: id });
  };

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {todos.map((t) => (
        <Todo todo={t} key={t.id} onEdit={handleEdit} 
        onDelete={handleDelete} />
      ))}
    </>
  );
}

export default App
