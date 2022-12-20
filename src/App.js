import './App.css';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import ListItem from './components/ListItem';
import TodoTitle from './components/TodoTitle';

function App() {
  const [todoText, setTodoText] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [count, setCount] = useState(0);

  /** 새로운 할 일을 추가할 때 작동시킬 함수 */
  const addTodo = (e) => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todoText,
      isChecked: false,
      isEdit: false,
    };

    if (todoText !== '') {
      setAllTodos((current) => [...current, todoItem]);
      setTodoText('');
    }
  };

  /** 체크박스 토글기능 */
  const toggleChecked = (id) => {
    let updatedTodos = allTodos.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });

    setAllTodos(updatedTodos);
  };

  /** todo 아이템 삭제 */
  const deleteTodo = (id) => {
    const filteredTodo = allTodos.filter((todo) => todo.id !== id);
    setAllTodos(filteredTodo);
  };

  const toggleEdit = (id) => {
    const editTodos = allTodos.map((todo) => {
      if (todo.id === id) todo.isEdit = !todo.isEdit;
      return todo;
    });

    setAllTodos(editTodos);
  };

  const onEditTodo = (e, id) => {
    const editTodo = allTodos.map((todo) => {
      if (todo.id === id) todo.text = e.target.value;
      return todo;
    });

    setAllTodos(editTodo);
  };

  /** localStorage에 있는 이전 todo 목록들을 불러와 allTodos에 담아준다 */
  const getAllTodos = () => {
    let stored = JSON.parse(localStorage.getItem('todo'));

    if (stored) {
      setAllTodos(stored);
    }
  };

  // ! 처음 렌더링될 때 localStrage에서 아이템들 가져오기
  useEffect(() => {
    getAllTodos();
  }, []);

  // ! allTodos가 바뀔 때마다 localStorage에 추가해주기
  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(allTodos));
  }, [allTodos]);

  // ! 체크된 항목의 개수를 뺀 count 상태를 지정
  useEffect(() => {
    setCount(allTodos.length - allTodos.filter((todo) => todo.isChecked).length);
  }, [allTodos]);

  return (
    <main className="App">
      <TodoTitle count={count} />
      <div className="App_todo">
        <form className="App_input_wrapper" onSubmit={(e) => addTodo(e)}>
          <input
            type="text"
            className="App_input"
            value={todoText}
            placeholder="Create a new todo..."
            onChange={(e) => setTodoText(e.target.value)}
          />
          <div className="App_input_button" onClick={(e) => addTodo(e)}>
            <IoMdAdd size={24} />
          </div>
        </form>
        <div className="App_todo_list">
          {allTodos.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              toggleChecked={toggleChecked}
              deleteTodo={deleteTodo}
              toggleEdit={toggleEdit}
              onEditTodo={onEditTodo}
            />
          ))}
          {allTodos.length === 0 && <p className="empty">There are no todos</p>}
        </div>
      </div>
    </main>
  );
}

export default App;
