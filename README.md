<h1 align="center">
  <img alt="Ecoleta" src="web/src/assets/logo.svg" height="100px">
</h1>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/maiquelp/Ecoleta?color=%2329A361">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/maiquelp/Ecoleta?color=%2329A361">
  <img alt="Project license" src="https://img.shields.io/github/license/maiquelp/Ecoleta?color=29A361">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/maiquelp/Ecoleta?color=29A361">
  <a href="https://github.com/maiquelp/Ecoleta/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/maiquelp/Ecoleta?color=%2329A361">
  <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-29A361?style=flat">
  </a>
  <!-- <img src="https://img.shields.io/badge/Ecoleta-NLW 2.0-29A361?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAALVBMVEVHcExxWsF0XMJzXMJxWcFsUsD///9jRrzY0u6Xh9Gsn9n39fyMecy0qd2bjNJWBT0WAAAABHRSTlMA2Do606wF2QAAAGlJREFUGJVdj1cWwCAIBLEsRU3uf9xobDH8+GZwUYi8i6ucJwrxKE+7D0G9Q4vlYqtmCSjndr4CgCgzlyFgfKfKCVO0LrPKjmiqMxGXkJwNnXskqWG+1oSM+BSwD8f29YLNjvx/OQrn+g99oQSoNmt3PgAAAABJRU5ErkJggg=="> -->
 <br>
  <a href="https://www.linkedin.com/in/maiquelp/">
      <img alt="LinkedIn link" src="https://img.shields.io/badge/-Maiquel Piovezan-0077B5?style=flat&amp;logo=Linkedin&amp;logoColor=white" height="25px">
  </a> 
  <!-- <a href="https://insomnia.rest/run/?label=Ecoleta&amp;uri=https%3A%2F%2Fraw.githubusercontent.com%2maiquelp%2FEcoleta%2Fmaster%2F.github%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a> -->
</p>
<strong>
<br>
<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README-pt.md">Portuguese</a>
</p>

<p align="center">
  <a href="#bookmark-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-tools">Tools</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#package-installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>
</strong>
<br>

<!-- <p align="center">
    <img alt="Screens" src=".github/screens.png" />
</p> -->

## :bookmark: About

The **Ecoleta** aims to bring together people looking for collection points for non-recyclable materials such as lamps, batteries, oil, etc, with institutions that accept to receive these materials. The backend consists of a Rest API running on a NodeJS server. The frontend was made with React and the mobile app with React Native. This project was implemented during the **Next Level Week #1** of **[Rocketseat](https://rocketseat.com.br/)**.

<br>

## :computer: Technologies

-  **[Typescript](https://www.typescriptlang.org/)**
-  **[Node.js](https://nodejs.org/)**
-  **[Express](https://expressjs.com/)**
-  **[Knex](http://knexjs.org/)**
-  **[SQLite](https://www.sqlite.org/)**
-  **[ReactJS](https://reactjs.org/)**
-  **[React Native](http://facebook.github.io/react-native/)**
-  **[Celebrate](https://github.com/arb/celebrate)**
-  **[Expo](https://expo.io/)**
-  **[Axios](https://github.com/axios/axios)**

<br>

## :wrench: Tools

- **[VisualStudio Code](https://code.visualstudio.com/)**
- **[Insomnia](https://insomnia.rest/)**
- **[Google Chrome](https://www.google.com/chrome/)**
- **[DBeaver](https://dbeaver.io/)**

<br>

## :package: Installation

### :heavy_check_mark: **Prerequisites**

The following software must be installed:
  
  - **[Node.js](https://nodejs.org/en/)**
  - **[Git](https://git-scm.com/)**
  - **[NPM](https://www.npmjs.com/)** or **[Yarn](https://yarnpkg.com/)**
  - **[Expo](https://expo.io/)** 
  - **[Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent)**

<br>
  
### :arrow_down: **Cloning the repository**

```sh
  $ git clone https://github.com/maiquelp/Ecoleta.git
```

<br>

### :arrow_forward:	**Running the applications**

- :package: API

```sh
  $ cd server
  # Dependencies install.
  $ yarn # or npm install
  # Data base creation.
  $ yarn knex:migrate # or npm run knex:migrate
  # API start
  $ yarn start # or npm start
```

- :computer: Web app

```sh
  $ cd web
  # Dependencies install.
  $ yarn # or npm install
  # Running web app
  $ yarn start # or npm start
```

- :iphone: Mobile app

```sh
  $ cd mobile
  # Dependencies install.
  $ yarn # or npm install
  # Running mobile app
  $ yarn start # or npm start
```

<br>

## :memo: License

This project is under the **MIT** license.

