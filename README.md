# Frogmi Test Repository
# Francisco Escalante
This repository contains the code for the Frogmi Test, which is divided into two main parts:

- A backend application built with Ruby on Rails
- A frontend application built with React

The project also utilizes Docker for managing a PostgreSQL database and a container for the Rails app.



## Prerequisites

- Ruby (v3.3.0 or later)
- Ruby on Rails (v7.x or later)
- Node.js (v18.x or later)
- Docker (v24.0.6 or later)
- PostgreSQL (v14.x or later)
- NPM package manager

## Getting Started
```bash
git@github.com:fxev90/frogmi_test.git
cd frogmi_test
cd earthquake_api
rails db:migrate
rake rake earthquake_data:fetch_and_persist
rails server
```
The application will start running on [http://localhost:3000/]

### Clone the Repository

```bash

cd ../react_client

```bash
npm install
npm run dev
```

The application will start running on [http://localhost:5173/]



### Postgres config

is being set from init.sql file
