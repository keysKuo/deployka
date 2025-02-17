export const fetchRepos = async (accessToken: string | undefined) => {
    const reposResponse = await fetch("https://api.github.com/user/repos", {
        headers: {
            Authorization: `token ${accessToken}`,
        },
    })
    .then(response => response.json())
    .catch(err => console.log(err))

    return reposResponse;
}
