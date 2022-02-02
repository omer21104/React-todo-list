import "./App.css";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">
      <h1>Todolist:</h1>
      <main>
        <TodoList />
      </main>
      <Sidebar />
    </div>
  );
}

export default App;
