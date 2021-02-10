const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(express.json());

require('./routes/employee.route')(app);
app.listen(8080, () => {
    console.log("You are running on server 8080");
});