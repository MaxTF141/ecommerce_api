const express = require('express'); //used to setup a server
const cors = require('cors'); //used to prevent errors when working locally

const app = express(); //initialize express as an app variable
const userRoute = require('./routes/userRoute');
app.set("port", process.env.PORT || 6969); //set the port
app.use(express.json()); //enable the server to handle json requests
app.use(cors()); //don't let local development give errors 

app.get("/", function(req, res){
    res.json({msg: 'Welcome'});
});

app.use('/users', userRoute);

//set up app listening for api calls 
app.listen(app.get('port'), function(){
    console.log(`Listening for calls on port ${app.get('port')}`);
    console.log("Press ctrl+c to exit server");
});