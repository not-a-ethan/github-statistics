'use server'

import { getStats } from "./getStats"

export async function UserStats(username: string) {
    const userObj = await getStats(username);

    return (
        <div>
          <picture>
            <img src={userObj.avatar} alt="User's profile picture" />
          </picture>
          <h2><a href={userObj.html_url}>{userObj.username}</a></h2>
          <span><a href="{firstUser.following_url}">Following: {userObj.following_count}</a> | <a href={`${userObj.followers_url}`}>Followers: {userObj.followers_count}</a></span>
          <p>{userObj['bio'] ? userObj.bio : ''}</p>

          <ul>
            <li>Number of (public) repos: {userObj.public_repos}</li>
          </ul>

          
        </div>
    )
}