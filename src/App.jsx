import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import { GlobalProvider } from "./context/GlobalContext";
import TaskDetail from "./pages/TaskDetail";

function App() {
  return (
    <>
      <GlobalProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Task List</NavLink>
          <NavLink to="/add">Add Task</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
        
      </BrowserRouter>
      </GlobalProvider>
    </>
  );
}

export default App;