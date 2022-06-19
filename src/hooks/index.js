import moment from "moment";
import { useState, useEffect } from "react";
import firebase from "../firebase";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("todos")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setTodos(data);
      });

    return () => unsubscribe();
  }, []);

  return todos;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    let data;
    const todayDateFormated = moment().format("MM/DD/YYYY");

    if (selectedProject === "today") {
      data = todos.filter((todo) => todo.date === todayDateFormated);
    } else if (selectedProject === "next 7 days") {
      data = todos.filter((todo) => {
        const todoDate = moment(todo.date, "MM/DD/YYYY");
        const todayDate = moment(todayDateFormated, "MM/DD/YYYY");

        const diffDays = todoDate.diff(todayDate, "days");

        return diffDays >= 0 && diffDays < 7;
      });
    } else if (selectedProject === "all days") {
      data = todos;
    } else {
      data = todos.filter((todo) => todo.projectName === selectedProject);
    }

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useFilterIncome(incomes) {
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  useEffect(() => {
    var start_date = new Date();
    var end_date = new Date();
    end_date.setDate(end_date.getDate() + 5);

    var start = moment(start_date, "MM/DD/YYYY");
    var end = moment(end_date, "MM/DD/YYYY");

    let data = incomes.filter((item) => {
      const itemDate = moment(item.data.date, "MM/DD/YYYY");
      return itemDate >= start && itemDate <= end;
    });
  }, [incomes]);
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("projects")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
          };
        });
        setProjects(data);
      });

    return () => unsubscribe();
  }, []);

  return projects;
}

export function useIncomes() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("incomes")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        });
        setIncomes(data);
      });

    return () => unsubscribe();
  }, []);

  return incomes;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection("expenses")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data(),
          };
        });
        setExpenses(data);
      });

    return () => unsubscribe();
  }, []);

  return expenses;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);

  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(
          (todo) => todo.projectName === project.name && !todo.checked
        ).length,
        ...project,
      };
    });

    setProjectsWithStats(data);
  }, [projects, todos]);

  return projectsWithStats;
}
