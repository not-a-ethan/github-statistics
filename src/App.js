import React, { useRef } from "react";

import './App.css';

function App() {
  const usernameInput = useRef(null);
  const container = useRef(null);

  function getStats() {
    const username = usernameInput['current'].value;

    fetch(`https://api.github.com/users/${username.trim()}`, {
      method: "GET",
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(response => response.json())
    .then(json => {
      const keys = Object.keys(json);
      let innerHTML = "";
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "avatar_url") {
          innerHTML += (<span><img src={json["avatar_url"]} alt="User's profile picture" /> <br /></span>);
          continue;
        }

        innerHTML += keys[i] + ": " + json[keys[i]] + " <br />";
      }
      container['current'].innerHTML = innerHTML
    })
  }
  return (
    <div className="App">
      <h1>Github statistics</h1>

      <label for="username">Username</label>
      <input type='text' name="username" id="username" ref={usernameInput} />

      <button id="Get stats" onClick={getStats}>Get stats!</button>

      <p>The data for the inputted user is:</p>
      <div ref={container}></div>
    </div>
  );
}

export default App;