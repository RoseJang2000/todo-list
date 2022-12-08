import './App.css';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import ListItem from './components/ListItem';
import TodoTitle from './components/TodoTitle';

function App() {
  const [todoText, setTodoText] = useState('');
  const [allTodos, setAllTodos] = useState([]);

  /** 새로운 할 일을 추가할 때 작동시킬 함수 */
  const addTodo = e => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todoText,
      isChecked: false,
      isEdit: false
    };

    if (todoText !== '') {
      setAllTodos([...allTodos, todoItem]);
      setTodoText('');
    }
  }

  /** localStorage에 있는 이전 todo 목록들을 불러와 allTodos에 담아준다 */
  const getAllTodos = () => {
    let stored = JSON.parse(localStorage.getItem('todo'));

    if (stored) {
      setAllTodos(stored);
    }
  }

  /** 체크박스 토글기능 */
  const toggleChecked = id => {
    let updatedTodos = allTodos.map(todo => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    })

    setAllTodos(updatedTodos);
  }

  /** todo 아이템 삭제 */
  const deleteTodo = id => {
    const filteredTodo = allTodos.filter(todo => todo.id !== id);
    setAllTodos(filteredTodo);
  }

  const toggleEdit = id => {
    const editTodos = allTodos.map(todo => {
      if (todo.id === id) todo.isEdit = !todo.isEdit;
      return todo;
    })

    setAllTodos(editTodos);
  }

  const onEditTodo = (e, id) => {
    const editTodo = allTodos.map(todo => {
      if (todo.id === id) todo.text = e.target.value;
      return todo;
    })

    setAllTodos(editTodo);
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
        <form className='App_input_wrapper' onSubmit={e => addTodo(e)}>
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
                todo={todo}
                toggleChecked={toggleChecked}
                deleteTodo={deleteTodo}
                toggleEdit={toggleEdit}
                onEditTodo={onEditTodo} />
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