export async function getStats(username: string) {
    const userObj = {
        username: '',
        avatar: '',
        profile_url: '',
        following_url: '',
        followers_url: '',
        following_count: 0,
        followers_count: 0,
        public_repos: 0,
        bio: '',
        html_url: '',
        total_commits: -1
    };

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
        "method": "GET",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const userJSON = await userRes.json();
    userObj.username = userJSON["login"];
    userObj.avatar = userJSON["avatar_url"];
    userObj.profile_url = userJSON["html_url"];
    userObj.following_url = `https://github.com/${username}?tab=following`;
    userObj.followers_url = `https://github.com/${username}?tab=followers`;
    userObj.following_count = Number(userJSON["following"]);
    userObj.followers_count = Number(userJSON["followers"]);
    userObj.bio = userJSON["bio"];
    userObj.public_repos = Number(userJSON["public_repos"]);
    userObj.html_url = userJSON["html_url"];

    const commitRes = await fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        "method": "GET",
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    const commitJSON = await commitRes.json();
    userObj.total_commits = Number(commitJSON['total_count']);

    return userObj;
}