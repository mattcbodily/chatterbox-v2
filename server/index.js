require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      socket = require('socket.io'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express()
      io = socket(app.listen(port, () => console.log(`Chatterbox at ${port}`)));

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

//sockets
io.on('connection', socket => {
    console.log('user connected')
    socket.on('join room', async data => {
        const {group} = data,
              db = app.get('db');
        
        console.log("Room joined", group);

        let room = await db.groups.get_active_group({id: group});
        let messages = await db.message.message_history({id: group});
        socket.join(room);
        io.to(room).emit('room joined', messages);
    });
    socket.on("message sent", async data => {
        const { group, sender, message } = data;
        const db = app.get("db");
        await db.message.create_message({ id: group, sender, message });
        let messages = await db.message.message_history({ id: group });
        socket.emit("message dispatched", messages);
      });
    
      socket.on("disconnect", () => {
        console.log("User Disconnected");
      });
});