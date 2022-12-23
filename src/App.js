import { useState,useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(()=> {
    getLocalTodos();
  }, [])
useEffect (()=> {
  filterHandler(todos);
  saveLocalTodos();
}, [todos, status]) 

const filterHandler=() => {
  switch (status) {
    case "Completed":
      setFilteredTodos(todos.filter((todo)=> todo.completed === true))
      break;
      case "Uncompleted":
      setFilteredTodos(todos.filter((todo)=> todo.completed === false))
      break;
    default:
      setFilteredTodos(todos);
      break;
  }
}

//!SAVE TO LOCAL
const saveLocalTodos= () => {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = ()=> {
  if(localStorage.getItem("todos")=== null) {
    localStorage.setItem("todos", JSON.stringify([]))
  }else {
    setTodos(JSON.parse(localStorage.getItem("todos")));
  }
}

  return (
    <div className="App">
     <header>
      <h1>My ToDo List{inputText}</h1>
      <Form
      inputText ={inputText}
      setInputText={setInputText}
      todos = {todos}
      setTodos = {setTodos}
      setStatus = {setStatus}
      />
      <TodoList 
      todos= {todos}
      setTodos={setTodos}
      filteredTodos = {filteredTodos}
      />
     </header>
    </div>
  );
}

export default App;
