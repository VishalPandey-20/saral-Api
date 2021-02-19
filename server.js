const express = require("express");
const { stringify } = require("querystring");
var app = express();
app.use(express.json());


const file_router = require("./routes/router")
app.use("/",file_router);


app.listen(3500,()=>{
    console.log(`server is running on ${3500}`);
});