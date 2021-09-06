
let express = require('express');
let app = express();
app.use(express.static("frontEnd"));
app.listen(3000)
