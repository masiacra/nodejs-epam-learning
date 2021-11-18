# nodejs-epam-learning

This repository is created to do homework at epam learning course
The main task to create CRUD server
Now we save users in memory

# Prerequisites

node >= 14.17.0 (need crypto.randomUUID())
git bash or another tool to test responses
postgres on your computer

# How to use

1. use lines from sql-tables.txt to create new tables which called "users" and "groups"
2. create .env file in which define DB_NAME, DB_HOST, DB_USER, DB_PASSWORD
3. npm run start
4. add user by send post request to http://localhost:4000/user
5. get, update, delete user by request GET, PUT, DELETE to http://localhost:4000/user
6. to see all list of users use GET request to http://localhost:4000/users
