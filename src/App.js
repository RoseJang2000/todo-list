import './App.css';
// import './App.scss';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import ListItem from './components/ListItem';
import TodoTitle from './components/TodoTitle';
import { ImBold } from 'react-icons/im';

function App() {
  const [todoText, setTodoText] = useState('');
  const [allTodos, setAllTodos] = useState([]);

  const addTodo = e => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todoText,
      isChecked: false
    };

    if (todoText !== '') {
      setAllTodos([...allTodos, todoItem]);
      setTodoText('');
    }
  }

  const getAllTodos = () => {
    let stored = JSON.parse(localStorage.getItem('todo'));

    if (stored) {
      setAllTodos(stored);
    }
  }

  const toggleChecked = id => {
    let updatedTodos = allTodos.map(todo => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    })

    setAllTodos(updatedTodos);
  }

  const deleteTodo = id => {
    const filteredTodo = allTodos.filter(todo => todo.id !== id);
    setAllTodos(filteredTodo);
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <main className='App'>
      <TodoTitle len={allTodos.length}/>
      <div className='App_todo'>
        <form className='App_input_wrapper' onSubmit={addTodo}>
          <input 
            type='text' 
            className='App_input' 
            value={todoText}
            placeholder='Create new todo...'
            onChange={e => setTodoText(e.target.value)} />
          <div className='App_input_button' onClick={e => addTodo(e)}>
            <IoMdAdd size={24} />
          </div>
        </form>

        <div className='App_todo_list'>
          {
            allTodos.map(todo => (
              <ListItem
                key={todo.id}
                text={todo.text}
                isChecked={todo.isChecked}
                toggleChecked={() => toggleChecked(todo.id)}
                deleteTodo={() => deleteTodo(todo.id)} />
            ))
          }
          {
            allTodos.length === 0 && (
              <p className='empty'>
                There are no todos
              </p>
            )
          }
        </div>
      </div>
    </main>
  );
}

export default App;