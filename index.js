const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

// mongoose.connect(keys.mongoURI);
// const MongoClient = require('mongodb').MongoClient;
mongoose.connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true }, error => {
    if(!error){
        console.log("Success");
    }
    else{
        console.log("Error connection failed");
        console.log(error);
    }
});
// mongoose
//     .connect(keys.mongoURI, { 
//         useNewUrlParser: true,
//         useCreateIndex: true
//       })
//     .then(() => console.log('MongoDB connected...'))
//     .catch(err => console.log(err));

// const connection = mongoose.connection;

// connection.once("open", function() {
//   console.log("MongoDB database connection established successfully");
// });
const app =express();
app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);


