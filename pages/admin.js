import axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "../styles/Pet.module.css";
import Link from "next/link";
const URL = "http://localhost:3001/api/pets";
const URL_IN = "http://localhost:3001/api/income";
const admin = () => {
  const [pets, setPets] = useState({});
  const [income, setIncome] = useState();
  const [type, setType] = useState("");
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [price, setPrice] = useState();
  const [pet, setPet] = useState({});
  useEffect(() => {
    getPets();
    getIncome();
  }, []);

  const getPetById = async (id) => {
    let result = await axios.get(`${URL}/${id}`);
    console.log(result.data);
    setPet(result.data);
  };

  const getIncome = async () => {
    let result = await axios.get(URL_IN);
    setIncome(result.data);
  };

  const getPets = async () => {
    let result = await axios.get(URL);
    setPets(result.data.list);
  };

  const addPet = async () => {
    let result = await axios.post(URL, {
      type,
      age,
      weight,
      price,
    });
    console.log(result);
    getPets();
  };

  const deletePet = async (id) => {
    let result = await axios.delete(`${URL}/${id}`);
    getPets();
  };

  const updatePet = async (id) => {
    let result = await axios.put(`${URL}/${id}`, {
      type,
      age,
      weight,
      price,
    });
    console.log(result);
    getPets();
  };

  const showPets = () => {
    if (pets && pets.length) {
      return pets.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <b>Price :</b> {item.price} <br />
            <b>Weight :</b> {item.weight} <br />
            <b>Age :</b> {item.age} <br />
            <b>Type :</b> {item.type}
            <div className={styles.edit_button}>
              <button
                className={styles.button_get}
                onClick={() => getPetById(item.id)}
              >
                Get
              </button>
              <button
                className={styles.button_update}
                onClick={() => updatePet(item.id)}
              >
                Update
              </button>
              <button
                className={styles.button_delete}
                onClick={() => deletePet(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <h1>PET SHOP</h1>
      <h3>Income : {income}</h3>
      <div className={styles.form_add}>
        <h2>Add Pets</h2>
        Type:
        <input
          type="text"
          name="type"
          onChange={(e) => setType(e.target.value)}
        ></input>
        Age:
        <input
          type="number"
          name="age"
          onChange={(e) => setAge(e.target.value)}
        ></input>
        Weight:
        <input
          type="number"
          name="weight"
          onChange={(e) => setWeight(e.target.value)}
        ></input>
        Price:
        <input
          type="number"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <button className={styles.button_add} onClick={() => addPet(type, age, weight, price)}>Add</button>
      </div>
      
      <div className={styles.list}>{showPets()}</div>
    </div>
  );
};
export default admin;
