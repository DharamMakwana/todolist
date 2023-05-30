import React, { useReducer, useState } from "react";

const initialState = {
  todos: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload }],
      };
    case "edit":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    case "delete":
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editId !== null) {
        dispatch({ type: "edit", payload: { id: editId, text: inputValue } });
        setEditId(null);
      } else {
        dispatch({ type: "add", payload: inputValue });
      }
      setInputValue("");
    }
  };

  const handleEditTodo = (id, text) => {
    setInputValue(text);
    setEditId(id);
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "delete", payload: id });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>
        {editId !== null ? "Update" : "Add"}
      </button>

      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleEditTodo(todo.id, todo.text)}>
              Edit
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
