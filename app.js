// const mongoose = require("mongoose");
// const express = require("express");
// require("dotenv").config(); // Load environment variables from .env file
// const fs = require("fs");

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

// // my own asynchronous function
// function practo(){
//     console.log("inside practo");
//     return new Promise(function(resolve){
//         console.log("inside Promise");
//         fs.readFile("read.txt", "utf8", (err, data) => {
//           if (err) {
//             console.error("Error reading File", err);
//           }
//           console.log("before resolve");
//           resolve(data);
//         });
//     })
// }

// // callback function to call
// function onDone(data){
//     console.log(data);
// }

// var a = practo();
// a.then(onDone);

// function someTimeConsumingTask() {
//   // Simulating a time-consuming operation
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("HUHUHUHUHUHUH");
//       resolve(); // Indicate that the task is done
//     }, 10000); // Simulating a delay of 1 second
//   });
// }

// async function example() {
//   console.log("Start");

//   // This line is like telling the waiter to prepare your dish
//   await someTimeConsumingTask();

//   console.log("Task is done, now I can continue");
// }

// // When you call the function, it works asynchronously
// example();

// fs.appendFile("mynewfile1.txt", "Hello content 1 huhuhuhu!", function (err) {
//   if (err) throw err;
//   console.log("Saved!");
// });
// fs.open("mynewfile3.txt", "w", function (err, file) {
//   if (err) throw err;
//   console.log("Saved!");
// });
// // fs.writeFile("mynewfile3.txt", "Hello content luilui!", function (err) {
// //   if (err) throw err;
// //   console.log("Saved!");
// // });

// fs.unlink("mynewfile2.txt", function (err) {
//   if (err) throw err;
//   console.log("File deleted!");
// });

// Practicing Nodemailer
// var nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "princekumarsingh.mind2web@gmail.com",
//     pass: "vcmkpdpxhkkuklta",
//   },
// });

// var mailOptions = {
//   from: "princekumarsingh.mind2web@gmail.com", //not so important
//   to: "rahuldadwal1122@gmail.com",
//   subject: "Sending Email using Node.js",
//   html: "<h1>hey there...</h1><p>Get the Job done!</p>", //more priority than text
//   text: "That was easy! Trying to send mail with nodemailer...",
//   // This prioritization is based on the assumption that HTML provides more formatting options and allows for a richer presentation compared to plain text.
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });


// const ffmpeg = require("fluent-ffmpeg");
// const ffprobePath = require("ffprobe-static").path;

// // Set the ffprobe path
// ffmpeg.setFfprobePath(ffprobePath);

// const videoPath = "sample_video.mp4";

// ffmpeg.ffprobe(videoPath, (err, metadata) => {
//   if (err) {
//     console.error("Error reading video file:", err);
//   } else {
//     console.log("Video metadata:", metadata);
//   }
// });


const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;
const fs = require("fs");
const path = require("path");

// Set the ffprobe path
ffmpeg.setFfprobePath(ffprobePath);

// Set the ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

const videoPath = "sample_video2.mp4";
const outputDirectory = "assets/frames";

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory, { recursive: true });
} else {
  // Delete existing files in the output directory
  fs.readdirSync(outputDirectory).forEach((file) => {
    const filePath = path.join(outputDirectory, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  });
}

// Get video duration from metadata
ffmpeg.ffprobe(videoPath, (err, metadata) => {
  if (err) {
    console.error("Error reading video file:", err);
  } else {
    const duration = metadata.format.duration;
    const chunkDuration = duration / 6; // Divide the video into 10 equal parts

    // Split the video into 10 parts and extract one image from each chunk
    for (let i = 0; i < 6; i++) {
      const startTime = i * chunkDuration; // Start time for each chunk
      const outputFileName = `chunk_${i + 1}.mp4`; // Output file name for the chunk
      const imageFileName = `frame_${i + 1}.png`; // Output file name for the frame image

      // Use a closure to capture the current value of i
      (function (index) {
        // Extract one image from each chunk
        ffmpeg(videoPath)
          .setStartTime(startTime)
          .outputOptions("-vframes 1") // Extract only one frame
          .output(path.join(outputDirectory, imageFileName)) // Save the image in the root directory
          .on("end", function () {
            console.log(
              `Frame image ${index + 1} extracted from chunk ${index + 1}`
            );
          })
          .run();
      })(i);
    }
  }
});