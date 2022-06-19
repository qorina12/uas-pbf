import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { TodoContext } from "../context";
import firebase from "../firebase";
import moment from "moment";
import "../Table.css";
import { budgetTrackerItems } from "../constants/budgetTrackerConstant";
import ExpensesForm from "./ExpensesForm";

function AddNewExpenses() {
  // CONTEXT
  const { selectedProject } = useContext(TodoContext);

  // STATE
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date());
  const [todoProject, setTodoProject] = useState(selectedProject);

  function handleSubmit(e) {
    e.preventDefault();
    if (category && amount && budgetTrackerItems.includes(todoProject)) {
      firebase
        .firestore()
        .collection("expenses")
        .add({
          createdAt: new Date(),
          category: category,
          amount: amount,
          note: note,
          description: description,
          date: moment(date).format("MM/DD/YYYY"),
        });

      setShowModal(false);
      setCategory("");
      setAmount("");
      setNote("");
      setDescription("");
      setDate(new Date());
    }
  }

  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="AddNewExpenses">
      <button className="btn-add-table" onClick={() => setShowModal(true)}>
        + New expenses
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ExpensesForm
          handleSubmit={handleSubmit}
          heading="Add new expenses"
          showButtons={true}
          setShowModal={setShowModal}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          date={date}
          setDate={setDate}
          description={description}
          setDescription={setDescription}
          note={note}
          setNote={setNote}
        />
      </Modal>
    </div>
  );
}

export default AddNewExpenses;
