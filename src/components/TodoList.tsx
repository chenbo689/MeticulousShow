import React, { useState } from 'react';
import './TodoList.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h2>待办事项列表</h2>
      <p className="todo-description">
        演示 Meticulous 如何追踪列表操作、表单输入和状态管理。
      </p>

      <div className="todo-input-section">
        <input
          type="text"
          className="todo-input"
          placeholder="输入待办事项..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="todo-add-btn" onClick={addTodo}>
          添加
        </button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">暂无待办事项</li>
        ) : (
          todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                删除
              </button>
            </li>
          ))
        )}
      </ul>

      {todos.length > 0 && (
        <div className="todo-stats">
          <span>总计: {todos.length}</span>
          <span>已完成: {todos.filter(t => t.completed).length}</span>
          <span>未完成: {todos.filter(t => !t.completed).length}</span>
        </div>
      )}
    </div>
  );
}

export default TodoList;
