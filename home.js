const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash'); // thư viện này giúp chúng ta có thể làm tính năng thông báo
const session = require('express-session'); // thư viện này giúp chúng ta có thể làm tính năng thông báo
const cookieParser = require('cookie-parser'); // thư viện này giúp chúng ta có thể làm tính năng thông báo
// nhúng thư viện dotenv để lấy các PORT= 9000 đã khai báo ở bên thư mục đó
require('dotenv').config();
const router = require('./router/client/index.router')
const routerAdmin = require('./router/admin/index')
const systemLocal = require('./config/system')
const app = express();
const database = require("./config/dataBase")
const port = process.env.PORT;
database.config();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use(cookieParser(process.env.KEY));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static("public"));

app.locals.variableAll = systemLocal.firstPath;

routerAdmin(app);
router(app);


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
    
})