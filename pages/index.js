import useSWR, { mutate } from "swr";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.css";
import Link from 'next/link'
const URL = "http://localhost:3001/api/pets";
const URL_BUY = "http://localhost:3001/api/purchase";
const fetcher = (key) => fetch(key).then((res) => res.json());
const index = () => {
  const { data, error } = useSWR(URL, fetcher, { revalidateOnFocus: false });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>Loading...</div>;
  console.log("data", data);
  
  const buyPet = async (id) => {
    let result = await axios.post(`${URL_BUY}/${id}`)
    mutate(URL, data);
  }

  const showPets = () => {
    if (data.list && data.list.length) {
      return data.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>
            <div><b>Price :</b> {item.price}</div>
            <div><b>Weight :</b> {item.weight}</div>
             <div> <b>Age :</b> {item.age} </div>
            <div><b>Type :</b> {item.type}</div>
            
            <div>
            <button
              className={styles.btn}
              onClick={() => buyPet(item.id)}
            >
              Buy
            </button></div>
          </div>
        );
      });
    } else {
      return <p>Loading...</p>;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>PET SHOP</div>
      <div className={styles.list}>
        {showPets()}
      </div>
      
    </div>
  );
};
export default index;
