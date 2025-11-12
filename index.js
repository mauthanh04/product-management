const express = require('express');
const methodOverride = require('method-override');
require('dotenv').config();

const database = require('./config/database');

const systemConfig = require('./config/system');

const routes = require('./routes/client/index.route');
const routesAdmin = require('./routes/admin/index.route');

database.connect();

const app = express();
const port = process.env.PORT;

app.set('views', './views');
app.set('view engine', 'pug') ;

//app locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));

app.use(methodOverride('_method'));

//routes
routes(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`Đã chạy thành công vào cổng ${port}`);
})