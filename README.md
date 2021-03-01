# notes-app-vuex
Notes app - MongoDB Atlas, Express, Vue.js + Vuetify + Vuex, Node <br>
Application in which you can register account, login, write and save your notes. Note can also be edited and deleted.
# link to heroku
```
https://notes-app-vuex.herokuapp.com/
```
# Project setup
You will need to install dependencies both from root directory and client folder with command:
```
npm install
```
After that, you'll need to add new environment variable in form name:value:
```
notes_jwtPrivateKey:1234
```
You will need two terminals to run the application. 
In the first terminal, change directory to client folder and then run:
```
npm run serve
```
In the second terminal, change directory to server folder and then run:
```
node index.js
```
