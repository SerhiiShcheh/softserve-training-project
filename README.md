# SoftServe Training project template
> Use of [Node.js](https://nodejs.org) version 14.0 or greater is recommended

## Requirements

The goal of this project is to create a fully-working URLs shortener application. Besides shortening URLs, user can also upload a file and receive a short URL referencing that file. Application also has internationalization and all of its pages support English ([http://localhost:3000/en](http://localhost:3000/en)) and Russian ([http://localhost:3000/ru](http://localhost:3000/ru)) localization.

### Use Case 1 - URL shortening

On the [main application page](http://localhost:3000/) user can see the form where they can choose to either shorten a URL or upload a file. In this scenario, the URL shortening is performed.

User inputs an absolute URL (ex. https://www.youtube.com) to the form and clicks on the "Get short URL" button. After that they see the page or a popup window with the generated short URL in format: `http://localhost:3000/{shortURL}` (ex. http://localhost:3000/aBcdE). Generated short URL should be random set of alphanumeric characters and be no longer than 5 symbols.

A request from the user is sent to the server as POST request in "multipart/form-data" enctype. Server responds shortened URL to the user with HTTP status code "201 Created".

Shortened URLs could be stored in a PostgreSQL database or in application's memory depending on the preference of the software engineer. Besides storing shortened URL, application should also track the number of times a specific short URL was used.

Application should provide a page where user can see the list of all shortened URLs, their corresponding original URLs and a number of times a specific short URL was used.

When user opens a shortened URL, server should redirect them to the original URL. Redirection HTTP status code is "302 Moved Temporarily". Each visit of the shortened URL increases URL visit count by 1.

### Use Case 2 - File Upload

On the [main application page](http://localhost:3000/) user can see the form where they can choose to either shorten a URL or upload a file.

User chooses a file they want to upload and clicks on the "Get short URL" button. After that they see the page or a popup window with the generated short URL in format: `http://localhost:3000/{shortURL}` (ex. http://localhost:3000/aBcdE). Generated short URL should be random set of alphanumeric characters and be no longer than 5 symbols. Generated short URL must not contain file extension.

A request from the user is sent to the server as POST request in "multipart/form-data" enctype. Server responds shortened URL to the user with HTTP status code "201 Created".

Uploaded file should be stored in the server's file system, its filename must be random to make this file anonymous.

Application should provide a separate section on the page where user can see the list of all shortened URLs, their corresponding original URLs and a number of times a specific short URL was used. This separate section contains the same list of shortened URLs, but for the files.

When user opens a shortened URL, server should start sending original file back to the user. For user that looks like file download. Each visit of the shortened URL increases URL visit count by 1.

### Miscellaneous

This project is a creative task. So feel free to do any modifications and/or enhancements. And remember that this project shows your knowledge and experience, so it's great when you can add some bells and whistles.

## Project one-time setup

Install project dependencies by executing command:
```bash
npm install
```

See the [Q&A](#qa) section of this document to find out how to start the server.

## Q&A

### How to start development server?

This command will start the server, build front-end assets and start Nodemon process that watches file changes and updates assets or restarts the server automatically.

```bash
npm run dev
```

After the server start, you can open [http://localhost:3000](http://localhost:3000) to see the application.

### How to stop the server?

Press `Ctrl + C` in the terminal where the server process was started. Works both on Windows, MacOS and Linux.

### How to run production server?

It will build production-ready assets and start the server in production mode. Note that logs will be kept in `logs` directory of the server.

```bash
npm run production
```

### How to run linter (static code analysis) ?

> Linter is a program that checks the code for compliance with standards according to a certain set of rules.

To run linter against code in the project, run this command:

```bash
npm test
```
