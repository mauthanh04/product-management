const express = require('express');
const mogoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/client/index.route');

mogoose.connect(process.env.MONGO_URL)

const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug') ;

app.use(express.static('public'));

//routes
routes(app);

app.listen(port, () => {
    console.log(`Đã chạy thành công vào cổng ${port}`);
})