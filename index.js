const express = require('express');

const routes = require('./routes/client/index.route');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug') ;

//routes
routes(app);

app.listen(port, () => {
    console.log(`Đã chạy thành công vào cổng ${port}`);
})