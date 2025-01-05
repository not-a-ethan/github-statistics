'use client'

import styles from "./page.module.css";

import React, { useState, useRef } from "react";

import { UserStats } from "./components/stats";
import { CompareStats } from "./components/compare";

export default function Home() {
  const usernameInput = useRef(null);
  const userContainer = useRef(null);
  const compareContainer = useRef(null);

  const [userHTML, setUserHTML] = useState(<></>);
  const [compareStats, setCompareStats] = useState([]);
  const [comparePfp, setComparePfp] = useState(null);

  let firstUsername = '';

  function compare() {
    const username = prompt("What account should it be compared to?").trim();

    if (username === firstUsername) {
      alert("Thats the same account");
      return;
    }

    CompareStats(username, firstUsername).then(data => {
      setCompareStats(data["diff"]);
      setComparePfp(data["pfp"]);

      compareContainer.current.style.display = 'block';
    })
  }

  function getStats() {
    const username = usernameInput['current'].value;
    firstUsername = username;

    UserStats(username).then(data => {
      setUserHTML(data);
      userContainer.current.style.display = 'block';
    })
  }

  return (
    <div className={`${styles.App}`}>
      <h1>Github statistics</h1>

      <label htmlFor="username">Username: </label>
      <input type='text' name="username" id="username" ref={usernameInput} />

      <button id="Get stats" onClick={getStats}>Get stats!</button>

      <div ref={userContainer} className={`${styles.container}`}>
        <div className={`${styles.firstUser}`}>
          {userHTML}

          <button onClick={compare}>Compare!</button>
        </div>

        <div className={`${styles.compareDiv}`} ref={compareContainer}>
          <img src={comparePfp} alt="User's profile picture" />

          <ul>
            {compareStats.map((stat) => <li key={stat}>{stat}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
     