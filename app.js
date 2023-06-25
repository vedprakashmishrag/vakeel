
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo'; 
import cors from 'cors'
const app = express();

import connectDB from './db/connectdb.js';
const port = process.env.PORT || '3000';
//const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';
const DATABASE_URL = 'mongodburl' || 'mongodb://localhost:27017';
// connect to mongoDB
connectDB(DATABASE_URL);

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser())


app.use(cors())
//using middleware
app.use(express.urlencoded({ extended: true }));
//set view engine ejs
app.set('view engine', 'ejs');
// serve static files
app.use(express.static('public'));  

//mongodb session store
const sessionStorage = MongoStore.create({
    mongoUrl: DATABASE_URL,
    dbName: "vakeel",
    collectionName: "session",
    ttl: 1000 * 60 * 60 * 24,
    autoRemove: 'native'
});

// using session 
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({ 
    name: 'sess', 
    // It holds the secret key for session
    secret: 'mera_express_yrr',
    cookie: { maxAge: oneDay },
  
    // Forces the session to be saved
    // back to the session store
    resave: false,
  
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true,
    store: sessionStorage
}));



import User from "./models/User.js";  



//using routes
import index from './routes/index.js'; 
import dashboard from './routes/dashboard.js'; 

app.use('/', index);
app.use('/', dashboard);


app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
