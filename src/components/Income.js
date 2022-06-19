import React, { useContext, useEffect } from "react";
import { Trash2Fill } from "react-bootstrap-icons";
import "../Table.css";
import AddNewIncome from "./AddNewIncome";
import firebase from "../firebase";
import { TodoContext } from "../context";
import EditIncome from "./EditIncome";

const Income = () => {
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);
  const { incomes } = useContext(TodoContext);

  const deleteIncome = (income) => {
    firebase
      .firestore()
      .collection("incomes")
      .doc(income.id)
      .delete()
      .then(() => {
        console.log("Delete income successfully");
      })
      .then(() => {
        if (selectedProject === income.name) {
          setSelectedProject(defaultProject);
        }
      });
  };

  return (
    <>
      <AddNewIncome />
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
          {incomes.length > 0 ? (
            incomes.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.data.date}</td>
                  <td>{item.data.category}</td>
                  <td>{item.data.amount}</td>
                  <td>{item.data.description}</td>
                  <td>{item.data.note}</td>
                  <td>
                    <EditIncome data={item} />
                    <button
                      type="button"
                      className="btn-delete-table"
                      onClick={() => deleteIncome(item)}
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

export default Income;
