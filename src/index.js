const express = require('express');
const morgan =require('morgan')
const bodyParser = require('body-parser');
const route = require('./logger/logger.js');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://AartiZare:aartizare@cluster0.l0uzu.mongodb.net/group36Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});