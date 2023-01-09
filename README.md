# Techwondoe Intern Assignment

[GitHub Link](https://github.com/VisheshVGR/techwondoe-intern-assignment) | [See live](https://techwondoe-intern-assignment.vercel.app/)

## Table of Contents 📕

- [Techwondoe Intern Assignment](#techwondoe-intern-assignment)
  - [Table of Contents 📕](#table-of-contents-)
  - [About the Challenge](#about-the-challenge)
  - [Tools and Technology](#tools-and-technology)
  - [Features](#features)
  - [Gallery](#gallery)
  - [Database Schema](#database-schema)

## About the Challenge

[Challenge Link](https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/Assignment.pdf)

- Functional requirement.
  - Develop a web application that pulls data from a user API and shows it in a table that looks like the above.
  - Any Mock User API can be used. Jsonplaceholder can be used.
  - The following functionalities are required-
    - Create User (A modal can be used for this and edit functionality).
    - List users with sorting and pagination.
    - Delete user.
    - Edit user - Can edit name and role.
  - Last login field will come as a String from API in [https://www.rfc-editor.org/rfc/rfc3339](https://www.rfc-editor.org/rfc/rfc3339) format.
  - The following UI components should be there-
    - Badge (For status).
    - Button component.
    - Pagination.
  - Ignore the checkbox in each row. It is not required.
- Non-Functional.
  - Must be completely typescript.
  - Follow google typescript linting guidelines and configure [https://github.com/google/gts](https://github.com/google/gts). Configure linter accordingly.
    - yarn lint command must check compliance.
  - Use React Query for API queries.
  - Add custom readme in the repo.
- Optionals.
  - Ability to download CSV.
  - Use Tailwind CSS for styling, but quite preferred.
  - Use of React table.
  - Confirmation modal on deleting user.
- [Design Template](https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/Challenge.png).

## Tools and Technology

- The Front-end is created in **React.js** and **TailWind CSS**.
- For creating Back-end, we used **Firebase**. For the database, we used Google Firestore. We created a very flexible and versatile foundation for our codebase, so that in the future its functionality could be easily extended and new agents could be easily added to it.
- For the hosting we used **Vercel** which is a cloud platform that enables developers to host websites and web services that deploy instantly, scale automatically, and require no supervision.
- All technologies-
  - [ReactJS + TypeScript](https://create-react-app.dev/docs/adding-typescript/).
  - [Google GTS (TypeScript ESLint + Prettier)](https://github.com/google/gts).
  - [React Tables](https://react-table-v7.tanstack.com/).
  - [React Query](https://react-query-v3.tanstack.com/).
  - [TailWind CSS](https://tailwindcss.com/).
  - [Tailwind Headless UI](https://headlessui.com/).
  - [Firebase Firestore Database](https://firebase.google.com/docs/firestore).
  - [Random User Generator](https://randomuser.me/).
  - [React Router Dom](https://reactrouter.com/en/main).

## Features

- All Data is live-fetched and updated improving user experience.
- This is a single-page website with no refresh on page change enhancing page load speed.
- When adding new user, random user data is fetched from [https://randomuser.me/api/](https://randomuser.me/).
- Data displayed using React Table with features like-
  - Sorting.
  - Search / Filter.
  - Pagination.
  - Jump to page.
- User details can be edited and users can be deleted.
- All data can be downloaded in CSV / Excel format.

## Gallery

|                                                                                                                                                                               |                                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|            <img width="1604" alt="Home Page" src="https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/HomePage.png"> Home Page             |  <img width="1604" alt="Add User Modal" src="https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/AddUserModal.png"> Add User Modal   |
| <img width="1604" alt="Delete User Modal" src="https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/DeleteUserModal.png"> Delete User Modal | <img width="1604" alt="Edit User Modal" src="https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/EditUserModal.png"> Edit User Modal |

## Database Schema

<img height="500px" alt="Database Schema" src="https://raw.githubusercontent.com/VisheshVGR/techwondoe-intern-assignment/main/Gallery/DbSchema.png">
