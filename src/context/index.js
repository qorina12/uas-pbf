import React, { createContext, useState } from "react";
import {
  useTodos,
  useProjects,
  useFilterTodos,
  useProjectsWithStats,
  useIncomes,
  useExpenses,
} from "../hooks";

const TodoContext = createContext();

function TodoContextProvider({ children }) {
  const defaultProject = "today";
  const [selectedProject, setSelectedProject] = useState(defaultProject);
  const [selectedTodo, setSelectedTodo] = useState(undefined);

  const todos = useTodos();
  const projects = useProjects();
  const incomes = useIncomes();
  const expenses = useExpenses();
  const projectsWithStats = useProjectsWithStats(projects, todos);
  const filteredTodos = useFilterTodos(todos, selectedProject);

  return (
    <TodoContext.Provider
      value={{
        defaultProject,
        selectedProject,
        setSelectedProject,
        todos: filteredTodos,
        projects: projectsWithStats,
        incomes,
        expenses,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContextProvider, TodoContext };
