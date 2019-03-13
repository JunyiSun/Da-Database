# Da’Database
Da’Database is a web-based textbook trading application.

## Getting Started
MongoDB note

https://www.mongodb.com/download-center/community

`cd mongodb-osx-x86_64-4.0.6/bin`

`sudo mkdir -p /data/db`

`ls -ld /data/db/`
drwxr-xr-x  2 root  wheel  64 12 Mar 23:33 /data/db/

`sudo chown $USER /data/db`

`ls -ld /data/db/`
drwxr-xr-x  20 junyisun  wheel  640 12 Mar 23:37 /data/db/

`./mongod`

NOW MONGODB IS RUNNING




Open another command window
`./mongo`
Start shell


`> db`
test

`> use test`
switched to db test

`> show dbs`
a5             0.000GB
admin          0.000GB
config         0.000GB
csc301project  0.000GB
local          0.000GB

`> use csc301project`
switched to db csc301project

`> show collections`
sessions
subjects
textbooks
traderequests
users
views

`> show tables`
sessions
subjects
textbooks
traderequests
users
views

`> use users`
switched to db users


Make sure MongoDB is running, then in the directory containing Da’Database, run the following commands:
```sh
$ npm install
$ node server.js
```
Then visit [http://localhost:3000/](http://localhost:3000/)

## Tests
To run the test suite, make sure both MongoDB and Da’Database are running, then in the directory containing Da’Database, run:
```sh
$ npm test
```
