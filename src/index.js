const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/routes.js");
const mongoose = require("mongoose");
const app = express();


app.use(bodyParser.json());

app.use('/', route);

mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
});