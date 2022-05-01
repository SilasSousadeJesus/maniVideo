const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());


const routes = require("./routes");
app.use('/', routes);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("connected to port 3000")
});