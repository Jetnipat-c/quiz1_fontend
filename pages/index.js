import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
const URL = "http://localhost:6969/api/todo";

const index = () => {
  const [todo, setTodo] = useState({});
  console.log(todo);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    let result = await axios.get(URL);
    setTodo(result.data.list);
  };

  const showTodo = () => {
    if (todo && todo.length) {
      return todo.map((item, index) => {
        return (
          <li>
            <b>Title :</b> {item.title} <b>Status :</b> {item.status}
            <button className={styles.button}>Get</button>
            <button className={styles.button}>Update</button>
            <button className={styles.button}>Delete</button>
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
      <h2>Add todo</h2>
      Title: <input type="text" name="title"></input>
      status: <input type="text" name="status"></input>
    </div>
  );
};
export default index;
