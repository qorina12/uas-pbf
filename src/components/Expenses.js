import React, { useContext } from "react";
import { Trash2Fill } from "react-bootstrap-icons";
import "../Table.css";
import firebase from "../firebase";
import { TodoContext } from "../context";
import EditExpenses from "./EditExpenses";
import AddNewExpenses from "./AddNewExpenses";

const Expenses = () => {
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);
  const { expenses } = useContext(TodoContext);

  const deleteExpenses = (income) => {
    firebase
      .firestore()
      .collection("expenses")
      .doc(income.id)
      .delete()
      .then(() => {
        console.log("Delete expenses successfully");
      })
      .then(() => {
        if (selectedProject === income.name) {
          setSelectedProject(defaultProject);
        }
      });
  };

  return (
    <>
      <AddNewExpenses />
      <table id="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.data.date}</td>
                  <td>{item.data.category}</td>
                  <td>{item.data.amount}</td>
                  <td>{item.data.description}</td>
                  <td>{item.data.note}</td>
                  <td>
                    <EditExpenses data={item} />
                    <button
                      type="button"
                      className="btn-delete-table"
                      onClick={() => deleteExpenses(item)}
                    >
                      <Trash2Fill size="10" /> Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Empty Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Expenses;
