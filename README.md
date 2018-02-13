![Last Commit](https://repo-activity.herokuapp.com/v1/kenjio/repo-activity-server)

## Background

When browsing through repositories on GitHub it is nice to be able to easily tell if a repository has been inactive without having to leave the repository home page.  One way to do this is to have a badge on the README that indicates when the last commit was made.  This application is a node.js server that will serve up badges that you can include on the README.md of your repository or anywhere else a svg graphic is supported.

## Usage
Clone the repository and install dependencies:
`git clone https://github.com/kenjiO/repo-activity-server.git`

`cd repo-activity-server`

`npm install`

Set the `PORT` environment variable port to the TCP port number that the server will listen on.  If `PORT` is not set it will listen on port **3000**.

Start the server:
`npm run start`

## Retrieving a badge
The format for the URL to retrieve a badge is
`http://hostname[:port]/v1/GithubUserName/RepoName`
where
**hostname** is the name or IP address of the server,
**port** is the port number (if not using port 80)
**GithubUserName** is the GitHub username for the repository
**RepoName** is the name of the repository

A pilot server for this repository is running at **http://repo-activity.herokuapp.com/**

So the badge for this repository on that server is at
 [http://repo-activity.herokuapp.com/v1/kenjio/repo-activity-server](http://repo-activity.herokuapp.com/v1/kenjio/repo-activity-server)


To add the badge to a README.md file use the following format
`![Last Commit](https://repo-activity.herokuapp.com/v1/kenjio/repo-activity-serve\)`

