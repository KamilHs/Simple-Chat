# Simple Web Chat App

## Application logic

To join certain room you should enter its' ID if no room found for entered ID then new room is created
and the user becomes its Admin. Number of members is unlimited. Room is automatically closed when the admin of the room lefts and all the other members are redirected to the login page. Data of a room stored in the database until it is closed. When user joins to the existing room all the old messages are load for him. Usernames must be unique for a room.

---

## Technologies

* React.js
* Node.js
* Express
* Socket.IO
* MySQL
* Sequelize

---

## Configuration

Dependencies must be installed in both clientside and serverside.
Use '''npm i''' to download the dependecies.
In '''serverSide/.env''' file mysql data and client side origin must be entered.
In '''clientSide/src/config.js''' file server url must be entered.

---

## Demo

https://kamilhs-react-simple-chat.web.app/