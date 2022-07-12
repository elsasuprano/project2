# Project-2- Watch And Sell

You and your group will use everything you’ve learned over the past modules to create a real-world full-stack application that you’ll be able to showcase to potential employers.

<p align = "center">
<img alt="preview" src="./public/imgs/app.png">
</p>

## User Story

```md
AS a BUYER I want to: 

- View Available Watches on Sale

- Sign Up or Login to View all the Features from the App

- View previous Comments from different Users for each Watch

- Read Comments and Like the Watches Available

- Logout after being Done Searching

AS a SELLER I want to:

- Login to View all the Features from the App

- View My Watches posted for Sale

- View Comments and Likes for All Featured Watches

- Delete MY previous Watch Posts

- Logout after being Done

```

## Acceptance Criteria

```md
- Use Node.js and Express.js to create a RESTful API.

- Use Handlebars.js(Or another) as the template engine.

- Use MySQL and the Sequelize ORM for the database.

- Have both GET and POST routes for retrieving and adding new data.

- Use at least one new library, package, or technology that we haven’t discussed.

- Have a folder structure that meets the MVC paradigm.

- Include authentication IF APPLICABLE (express-session and cookies).

- Protect API keys and sensitive information with environment variables.

- Be deployed using Heroku (with data).

- Have a polished UI.

- Be responsive.

- Be interactive (i.e., accept and respond to user input).

- Meet good-quality coding standards (file structure, naming conventions, follows best practices for class/id naming conventions, indentation, quality comments, etc.).

- Have a professional README (with unique name, description, technologies used, screenshot, and link to deployed application).
```
## Project Deployed URL 

Deployed APP on Heroku: [Watch & Sell](https://watch-sell-app.herokuapp.com)
## Table of Contents

- [Project-2- Watch And Sell](#project-2--watch-and-sell)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Project Deployed URL](#project-deployed-url)
  - [Table of Contents](#table-of-contents)
  - [Resources](#resources)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Test](#test)
  - [License](#license)
  - [Questions](#questions)
    - [GitHub:](#github)
    - [Repo:](#repo)
    - [Deployed:](#deployed)

## Resources

* [Node](https://nodejs.org/)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [Express](https://expressjs.com)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Handlebars](https://handlebarsjs.com)
* [Insomnia](https://insomnia.rest)
* [Jest](https://jestjs.io)
* [LoDash](https://lodash.com)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Heroku](https://devcenter.heroku.com)

## Installation

<p align = "center">
<img alt="preview" src="./imgs/setup.gif">
</p>

* Git Clone the Repo into your system

* To install dependencies, run the following in your terminal:
  
`npm i`

`npm i mysql2`

`npm i sequelize`

`npm i dotenv`

* Edit `.env` file using your credentials
## Usage

* After installations are completed, run the app with: 

`mysql -u root -p`

Enter `password` when promted

`source db/schema.sql`

`quit`

`npm run seed`
  
`npm start`

## Test

`npm test` = ```jest```
## License

* Copyright 2022 Philip Hwang
* This repository is licensed under the [MIT license](./LICENSE)

## Questions

If you have any questions, please contact us at: 
### GitHub: 

* [Robert Routhier](https://github.com/robertrouthier)
* [John Seely](https://github.com/jokase97)
* [Elsa Soprano](https://github.com/elsasuprano)
* [Philip Hwang](https://github.com/phwang93)
### Repo: 

[Project-2- Watch And Sell](https://github.com/phwang93/Project-2-Watch-and-Sell)

### Deployed:

[Watch & Sell](https://watch-sell-app.herokuapp.com)