'use server'

import { getStats } from "./getStats"

export async function CompareStats(username: string, firstUsername: string) {
    const firstUser = await getStats(firstUsername);
    const thisUser = await getStats(username);
    
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

    if (thisUser.public_repos > firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${thisUser.public_repos - firstUser.public_repos} more public repositories than ${firstUser.username}`);
    } else if (thisUser.public_repos < firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${firstUser.public_repos - thisUser.public_repos} fewer public repositories than ${firstUser.username}`);
    } else {
        diffrences.push(`${thisUser.username} has the same number of public repositories as ${firstUser.username}`);
    }

    return {
        diff: diffrences, 
        pfp: thisUser.avatar
    }
}