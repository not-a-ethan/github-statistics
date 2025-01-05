'use server'

import { getStats } from "./getStats"

export async function CompareStats(username: string, firstUsername: string) {
    const firstUser = await getStats(firstUsername);
    const thisUser = await getStats(username);
    
    const diffrences = [];

    if (thisUser.followers_count > firstUser.followers_count) {
        diffrences.push(`${thisUser.username} has ${thisUser.followers_count - firstUser.followers_count} more followers than ${firstUsername}.`);
    } else if (thisUser.followers_count < firstUser.followers_count) {
        diffrences.push(`${thisUser.username} has ${firstUser.followers_count - thisUser.followers_count} fewer followers than ${firstUsername}.`);
    } else {
        diffrences.push(`${thisUser.username} has the same number of followers as ${firstUsername}.`);
    }

    if (thisUser.following_count > firstUser.following_count) {
        diffrences.push(`${thisUser.username} is following ${thisUser.following_count - firstUser.following_count} more people than ${firstUsername}.`);
    } else if (thisUser.following_count < firstUser.following_count) {
        diffrences.push(`${thisUser.username} is following ${firstUser.following_count - thisUser.following_count} fewer people than ${firstUsername}.`);
    } else {
        diffrences.push(`${thisUser.username} is following the same number of people as ${firstUsername}`);
    }

    if (thisUser.public_repos > firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${thisUser.public_repos - firstUser.public_repos} more public repositories than ${firstUsername}`);
    } else if (thisUser.public_repos < firstUser.public_repos) {
        diffrences.push(`${thisUser.username} has ${firstUser.public_repos - thisUser.public_repos} fewer public repositories than ${firstUsername}`);
    } else {
        diffrences.push(`${thisUser.username} has the same number of public repositories as ${firstUsername}`);
    }

    if (thisUser.total_commits > firstUser.total_commits) {
        diffrences.push(`${thisUser.username} has ${thisUser.total_commits - firstUser.total_commits} more commits than ${firstUsername}.`);
    } else if (thisUser.total_commits < firstUser.total_commits) {
        diffrences.push(`${thisUser.username} has ${firstUser.total_commits - thisUser.total_commits} fewer commits than ${firstUsername}.`);
    } else {
        diffrences.push(`${thisUser.username} and ${firstUsername} and the same number of commits.`);
    }

    return {
        diff: diffrences, 
        pfp: thisUser.avatar
    }
}