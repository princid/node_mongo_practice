// const mongoose = require("mongoose");
// const express = require("express");
// require("dotenv").config(); // Load environment variables from .env file
const fs = require("fs");

// const app = express();
// app.use(express.json());

// const mongo_uri = process.env.MONGO_SERVER_URI;
// const mongo_dbName = process.env.MONGO_DATABASE_NAME;

// fs.readFile('read.txt', 'utf8', (err, data)=>{
//     if(err){
//         console.error("Error reading File", err);
//     }
//     console.log('File Content : ', data);
// });

// console.log("hey there..................");

// // DB connection
// mongoose.connect(`${mongo_uri}/${mongo_dbName}`);

// // Define a Mongoose schema
// const personSchema = new mongoose.Schema({
//   name: String,
//   age: Number,
//   email: String,
// });

// // Create a Mongoose model based on the schema
// const Person = mongoose.model("users", personSchema);

// // Event handlers for Mongoose connection
// const db = mongoose.connection;
// db.on("error", (error) => {
//   console.error("MongoDB connection error:", error);
// });
// db.once("open", async () => {
//   console.log("DB connected successfully!");

//   try {
//     // Insert data into the collection using Promises
//     const newPerson = new Person({
//       name: "Adarsh",
//       age: 22,
//       email: "adarsh@example.com",
//     });

//     const savedPerson = await newPerson.save();
//     console.log("Person saved successfully:", savedPerson);
//   } catch (error) {
//     console.error("Error saving person:", error);
//   }
// });

// app.listen(3000, () => {
//   console.log("On PORT : 3000");
// });


// my own asynchronous function
function practo(){
    console.log("inside practo");
    return new Promise(function(resolve){
        console.log("inside Promise");
        fs.readFile("read.txt", "utf8", (err, data) => {
          if (err) {
            console.error("Error reading File", err);
          }
          console.log("before resolve");
          resolve(data);
        });
    })
}


// callback function to call
function onDone(data){
    console.log(data);
}

var a = practo();
a.then(onDone);