import "./App.css";
import Sidebar from "./components/Sidebar";
import TodoList from "./components/TodoList";
import { useState } from "react";

function App() {
  const [selectedList, setSelectedList] = useState("");

  const listClickedCallback = (listName) => {
    setSelectedList(listName);
  };

  return (
    <div className="App">
      <h1>{selectedList || "hi"}:</h1>
      <main>{selectedList && <TodoList activeListName={selectedList} />}</main>
      <Sidebar listClickedCallback={listClickedCallback} />
    </div>
  );
}

export default App;
