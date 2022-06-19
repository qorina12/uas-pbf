import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { TodoContext } from "../context";
import firebase from "../firebase";
import moment from "moment";
import "../Table.css";
import IncomeForm from "./IncomeForm";
import { budgetTrackerItems } from "../constants/budgetTrackerConstant";
import { PencilFill } from "react-bootstrap-icons";

function EditIncome({ data }) {
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
      const projectsRef = firebase.firestore().collection("incomes");

      projectsRef
        .doc(data.id)
        .update({
          category: category,
          amount: amount,
          note: note,
          description: description,
          date: moment(date).format("MM/DD/YYYY"),
        })
        .then(() => {
          console.log("Document successfully updated!");
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
    setCategory(data.data.category);
    setAmount(data.data.amount);
    setNote(data.data.note);
    setDescription(data.data.description);
    setDate(data.data.date);
    setTodoProject(selectedProject);
  }, [selectedProject, data]);

  return (
    <>
      <button
        type="button"
        className="btn-edit-table"
        onClick={() => setShowModal(true)}
      >
        <PencilFill size="10" /> Edit
      </button>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <IncomeForm
          handleSubmit={handleSubmit}
          heading="Edit income"
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
    </>
  );
}

export default EditIncome;
