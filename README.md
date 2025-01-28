
# Qatium assessment - Child care app

This is a simple web aplication that allows child care management related to a child-care community:

User stories:

* As a User, I want to access the group of parents to see the list of child-care requests fulfilled with the following information:
    * Requester
    * Child Care Worker
    * Date and time of the request
    * Duration
    * Description / Notes
    * The list should be ordered by the last starting date.
* AsaUser,I want to add a new User to the app.
* As a User, I want to add a new child-care request.
    * A request is always completed and there is no need to be accepted. In fact, a request represents what already happened with its duration and details.
* As a User, I want to see the hours balance of the child-care user’s community.
* As a User, I want to calculate the minimum number of child-care requests that have to be fulfilled to net the time debts.

The project has been developed from a boilerplate created from Create Vite + React

Technologies/Stack:

* Vite - Create Vite (https://github.com/vitejs/vite/tree/main/packages/create-vite)
* React
* Typescript
* Javascript ES6+
* SCSS for styling
* ESLint for JS style enforcement
* Jest for testing


Folder structure:

* src/App.tsx - Main page app
* src/components - Reusable components (Typescript & SCSS )
* src/utils.tsx - Util functions
* src/assets - for all static assets


---
## Minimum requirements to run the project
* node
* yarn or npm

---
## Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:5173
npm run dev

# build for production
npm run build

# run all tests
npm run test

```


---
## Running the project

First of all, you need to install the required packages:

``` bash
npm install
```

Run the project with:

``` bash
npm run dev
```

---
## Expected recent versions of browsers where it will be tested:
* Google Chrome
* Mozilla Firefox
* Safari
* Microsoft Edge
