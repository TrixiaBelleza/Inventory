# (Node React) Inventory System
Node React Inventory System
============
```
A repository for the Questronix Online Exam
```
## Prerequisites
------------
```
* MySQL for Database
* `sudo apt install npm`
* `sudo npm install -g nodemon`
* `sudo npm install -g concurrently`
* `sudo npm install -g n`
* `sudo n stable` This part makes sure that our NodeJS version is the stable one.
* The command "sudo n latest" will download the latest version of Node.js and if the version is not the latest after running the command, run `sudo ln -sf /usr/local/n/versions/node/<VERSION OF NODE>/bin/node /usr/bin/node` 
```
## Command(s)
------------
```
* `git clone https://github.com/TrixiaBelleza/Inventory`
* `cd Inventory`

To obtain packages that the backend will be using..
* `npm install`

To obtain packages that the frontend will be using..
* `cd frontend`
* `npm install`

To add npm packages to package.json..
* `npm install --save <package>`
```

## To start the web server and React app
------------
```
(Server start)
* `cd backend`
* `nodejs server.js` 

(React app start)
* `cd frontend`
* `npm start` or `sudo npm start` 

then check http://localhost:3000 for the react application and http://localhost:3001 for the server
```
