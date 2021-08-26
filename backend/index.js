require("dotenv").config()
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose")

const app = express();

app.use(cors())
app.use(express.text())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Mongoose DB Connection Established")
})

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
	console.log("Serving App on Port: ", PORT)
})

process.stdin.resume();//so the program will not close instantly

function exitHandler() {
	mongoose.disconnect();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit:true}));
process.on('SIGUSR2', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
