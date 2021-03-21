import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
const URL = "http://localhost:6969/api/todo";

const index = () => {
  const [todo, setTodo] = useState({});
  const [s_todo, setS_todo] = useState({});
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  console.log(todo);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    let result = await axios.get(URL);
    setTodo(result.data.list);
  };

  const getTodoById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setS_todo(result.data);
  };

  const addTodo = async () => {
    let result = await axios.post(URL, {
      title,
      status,
    });
    console.log(result);
    getTodo();
  };

  const updateTodo = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      title,
      status,
    });
    console.log(result);
    getTodo();
  };

  const deleteTodo = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getTodo();
  };

  const showTodo = () => {
    if (todo && todo.length) {
      return todo.map((item, index) => {
        return (
          <li key={index}>
            <b>Title :</b> {item.title} <b>Status :</b> {item.status}
            <button
              className={styles.button}
              onClick={() => getTodoById(item.id)}
            >
              Get
            </button>
            <button
              className={styles.button}
              onClick={() => updateTodo(item.id)}
            >
              Update
            </button>
            <button
              className={styles.button}
              onClick={() => deleteTodo(item.id)}
            >
              Delete
            </button>
          </li>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <h2>Todo list</h2>
      <div>{showTodo()}</div>
      <h2>Select</h2>
      <p>
        <b>Title :</b> {s_todo.title} <b>Status :</b> {s_todo.status}
      </p>
      <h2>Add todo</h2>
      Title:{" "}
      <input
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      status:{" "}
      <input
        type="text"
        name="status"
        onChange={(e) => setStatus(e.target.value)}
      ></input>
      <button onClick={() => addTodo(title, status)}>Add</button>
    </div>
  );
};
export default index;
