import { useCallback, useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

// debounce generica

function debounce(func, delay) {
  let timeoutId;
  return (value) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(value);
    }, delay);
  };
} 


export default function TaskList() {
  const { tasks } = useContext(GlobalContext);
  console.log("Tasks:", tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSetSearchQuery = useCallback(debounce(setSearchQuery, 300), []);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  const sortIcon = sortOrder === 1 ? "▲" : "▼";

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder * -1);
    } else {
      setSortBy(field);
      setSortOrder(1);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    return [...tasks]
    .filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison;
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title);
      }
      else if (sortBy === "status") {
        const statusOpt = ["To do", "Doing", "Done"];
        comparison = statusOpt.indexOf(a.status) - statusOpt.indexOf(b.status);
      }
      else if (sortBy === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); 
      }
      return comparison * sortOrder;
    });
     }, [tasks, sortBy, sortOrder, searchQuery]);


  return (
    <div className="TaskList">
      <h1>Lista delle mie tasks</h1>
      <input 
      type="text"
      placeholder="Cerca una task"
      onChange={e => debouncedSetSearchQuery(e.target.value)}
       />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Nome {sortBy === "title" && sortIcon}</th>
            <th onClick={() => handleSort('status')}>Status {sortBy === "status" && sortIcon}</th>
            <th onClick={() => handleSort('createdAt')}>Data di creazione {sortBy === "createdAt" && sortIcon}</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
