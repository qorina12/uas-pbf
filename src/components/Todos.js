import React, { useContext } from "react";
import Todo from "./Todo";
import Next7Days from "./Next7Days";
import { TodoContext } from "../context";
import Expenses from "./Expenses";
import Income from "./Income";
import Report from "./Report";

function Todos() {
  const { todos, selectedProject, isBudget } = useContext(TodoContext);

  const MyComponent = () => {
    if (selectedProject === "income") {
      return <Income />;
    } else if (selectedProject === "expenses") {
      return <Expenses />;
    } else if (selectedProject === "report") {
      return <Report />;
    } else if (selectedProject === "next 7 days") {
      return <Next7Days todos={todos} />;
    } else {
      return todos.map((todo) => <Todo todo={todo} key={todo.id} />);
    }
  };

  return (
    <>
      <div className="Todos">
        <div className="selected-project">{selectedProject}</div>
        <div className="todos">
          {<MyComponent />}
          {/* {selectedProject === "next 7 days" ? (
            <Next7Days todos={todos} />
          ) : (
            todos.map((todo) => <Todo todo={todo} key={todo.id} />)
          )} */}
        </div>
      </div>
    </>
  );
}

export default Todos;
