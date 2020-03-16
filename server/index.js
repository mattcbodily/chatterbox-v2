require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected')
})

//auth
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.get('/api/logout', authCtrl.logout);

//groups
app.get('/api/groups/:id', mainCtrl.getGroups);
app.post('/api/groups', mainCtrl.createGroup);

app.listen(port, () => console.log(`Server running on ${port}`));