import React, { useState, useRef, use } from "react";

import './App.css';

function App() {
  const usernameInput = useRef(null);
  const container = useRef(null);
  const dialogElm = useRef(null);

  const [userHTML, setUserHTML] = useState(<></>);
  const [compareStats, setCompareStats] = useState([]);
  const [comparePfp, setComparePfp] = useState(null);

  const firstUser = {
    username: '',
    avatar: '',
    profile_url: '',
    following_url: '',
    followers_url: '',
    following_count: 0,
    followers_count: 0,
    public_repos: 0,
    bio: ''
  };

  function compare() {
    const username = prompt("What account should it be compared to?").trim();

    if (username === firstUser.username) {
      alert("Thats the same account");
      return;
    }

    fetch(`https://api.github.com/users/${username.trim()}`, {
      method: "GET",
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(response => response.json())
    .then(json => {
      const thisUser = {
        username: json["login"],
        avatar: json["avatar_url"],
        profile_url: json["html_url"],
        following_url: `https://github.com/${username}?tab=following`,
        followers_url: `https://github.com/${username}?tab=followers`,
        following_count: json["following"],
        followers_count: json["followers"],
        public_repos: json["public_repos"],
        bio: json["public_repos"]
      };

      const diffrences = [];

      if (thisUser.followers_count > firstUser.followers_count) {
        diffrences.push(`${thisUser.username} has ${thisUser.followers_count - firstUser.followers_count} more followers than ${firstUser.username}.`);
      } else if (thisUser.followers_count < firstUser.followers_count) {
        diffrences.push(`${thisUser.username} has ${firstUser.followers_count - thisUser.followers_count} less followers than ${firstUser.username}.`);
      } else {
        diffrences.push(`${thisUser.username} has the same number of followers as ${firstUser.username}.`);
      }

      if (thisUser.following_count > firstUser.following_count) {
        diffrences.push(`${thisUser.username} is following ${thisUser.following_count - firstUser.following_count} more people than ${firstUser.username}.`);
      } else if (thisUser.following_count < firstUser.following_count) {
        diffrences.push(`${thisUser.username} is following ${firstUser.following_count - thisUser.following_count} fewer people than ${firstUser.username}.`);
      } else {
        diffrences.push(`${thisUser.username} is following the same number of people as ${firstUser.username}`);
      }

      console.log(thisUser.public_repos)
      console.log(firstUser.public_repos)
      if (thisUser.public_repos > firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${thisUser.public_repos - firstUser.public_repos} more public repositories than ${firstUser.username}`);
      } else if (thisUser.public_repos < firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${firstUser.public_repos - thisUser.public_repos} fewer public repositories than ${firstUser.username}`);
      } else {
        diffrences.push(`${thisUser.username} has the same number of public repositories as ${firstUser.username}`);
      }

      setComparePfp(thisUser.avatar);

      setCompareStats(diffrences);
      dialogElm.current.open = true;
    })
  }

  function getStats() {
    const username = usernameInput['current'].value;

    fetch(`https://api.github.com/users/${username.trim()}`, {
      method: "GET",
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then(response => response.json())
    .then(json => {
      console.log(json)

      firstUser.username = json["login"];
      firstUser.avatar = json["avatar_url"];
      firstUser.profile_url = json["html_url"];
      firstUser.following_url = `https://github.com/${username}?tab=following`;
      firstUser.followers_url = `https://github.com/${username}?tab=followers`;
      firstUser.following_count = json["following"];
      firstUser.followers_count = json["followers"];
      firstUser.bio = json["bio"];
      firstUser.public_repos = json["public_repos"];

      setUserHTML(
        <div className="userContainer">
          <picture>
            <img src={firstUser.avatar} alt="User's profile picture" />
          </picture>
          <h2><a href={firstUser.html_url}>{firstUser.username}</a></h2>
          <span><a href="{firstUser.following_url}">Following: {firstUser.following_count}</a> | <a href="{firstUser.followers_url}">Followers: {firstUser.followers_count}</a></span>
          <p>{json['bio'] ? firstUser.bio : ''}</p>

          <ul>
            <li>Number of (public) repos: {firstUser.public_repos}</li>
          </ul>

          <button onClick={compare}>Compare!</button>
        </div>
      )
    })
  }

  function closeDialog() {
    dialogElm.current.open = false;
  }

  return (
    <div className="App">
      <h1>Github statistics</h1>

      <label htmlFor="username">Username</label>
      <input type='text' name="username" id="username" ref={usernameInput} />

      <button id="Get stats" onClick={getStats}>Get stats!</button>

      <div>
        <div ref={container} className="firstUser">{userHTML}</div>

        <div ref={dialogElm} className="compareDialog">
          <img src={comparePfp} alt="User's profile picture" />

          <ul>
            {compareStats.map((stat) => <li key={stat}>{stat}</li>)}
          </ul>

          <button onClick={closeDialog}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default App;