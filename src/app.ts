import express from "express"
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../src/.env" });
import mongoose from "mongoose";
const userRoute = require("./Routes/UserRoutes");
const courseRoute = require("./Routes/CourseRoutes");
const gradeRoute = require("./Routes/GradeRoutes")

const app = express();
app.use(express.json())
app.use("/user",userRoute)
app.use("/courses", courseRoute)
app.use('/grades', gradeRoute)




const connectionString = process.env.DATABASE_LINK!

mongoose.connect(connectionString).then((value) => {
  console.log("Database connected successfully");
});


app.listen(3001, function(){

    console.log("listening on port 3000");
    
})