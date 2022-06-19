import React, { useContext, useEffect, useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TodoContext } from "../context";
import moment from "moment";
import "../Table.css";

const Report = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reports, setReports] = useState([]);
  const { incomes, expenses } = useContext(TodoContext);
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const filteredCustom = (data) => {
    var start = moment(startDate, "MM/DD/YYYY").subtract(1, "days");
    var end = moment(endDate, "MM/DD/YYYY");

    let result = data.filter((item) => {
      const itemDate = moment(item.data.date, "MM/DD/YYYY");
      return itemDate >= start && itemDate <= end;
    });

    return result;
  };

  const groupByType = (type, array) => {
    let res = array.filter((item) => {
      return item.type === type;
    });

    let sum = res.reduce((item, object) => {
      return item + parseInt(object.data.data.amount);
    }, 0);
    return sum;
  };

  const filteredData = () => {
    let res_incomes = filteredCustom(incomes);
    let res_expenses = filteredCustom(expenses);
    let data = [];

    res_incomes.map((item) => {
      data.push({
        type: "income",
        data: item,
      });
    });

    res_expenses.map((item) => {
      data.push({
        type: "expenses",
        data: item,
      });
    });

    const groups = data.reduce((groups, item) => {
      const date = item.data.data.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      // let total = groups[date].reduce((item, object) => {
      //   return item + parseInt(object.data.data.amount);
      // }, 0);
      return {
        date,
        total_income: groupByType("income", groups[date]),
        total_expenses: groupByType("expenses", groups[date]),
      };
    });

    let total_inc = groupArrays.reduce((item, object) => {
      return item + parseInt(object.total_income);
    }, 0);
    setTotalIncomes(total_inc);
    let total_exp = groupArrays.reduce((item, object) => {
      return item + parseInt(object.total_expenses);
    }, 0);
    setTotalExpenses(total_exp);
    
    setReports(groupArrays);
  };

  useEffect(() => {
    filteredData();
  }, [incomes, expenses]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "30px" }}>
          <label htmlFor="">Start Date</label> <br />
          <DatePicker value={startDate} onChange={(day) => setStartDate(day)} />
        </div>
        <div>
          <label htmlFor="">End Date</label> <br />
          <DatePicker value={endDate} onChange={(day) => setEndDate(day)} />
        </div>
        <button className="btn-add-table" onClick={filteredData}>
          Check
        </button>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Income</th>
            <th>Expenses</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.total_income}</td>
                  <td>{item.total_expenses}</td>
                  <td>{item.total_income - item.total_expenses}</td>
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
      <div style={{marginTop: "20px"}}>
        <h3>TOTAL INCOMES : {totalIncomes}</h3>
        <br />
        <h3>TOTAL EXPENSES : {totalExpenses}</h3>
        <br />
        <h3>DIFFERENCE : {totalIncomes - totalExpenses}</h3>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default Report;
