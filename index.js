const express = require("express");
const {userRouter} = require("./routes/user.routes")
const {connection} = require("./config/db");
const {taskRouter} = require("./routes/task.routes");

const app = express();
app.use(express.json());

app.use("/user",userRouter);
app.use("/task",taskRouter);

app.listen(process.env.PORT,async()=>{
    try{
        await connection;
        console.log("connected to db");
        console.log(`Server is running on port ${process.env.PORT}`);
    }
    catch(err){
        console.log(err);
    }
})