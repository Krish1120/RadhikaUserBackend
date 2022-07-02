require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const cookie = require('cookie-parser');
const multer = require('multer');
const cors = require('cors');
// const ejs=require('ejs');
const app = express();

//json data.
app.use(express.json());

//set cookie.
app.use(
	session({
		cookie: {
			maxAge: 60000,
		},
		secret: 'shokpix_shayantan321',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(cookie());

app.use(
	cors({
		origin: '*',
		method: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
		credentials: true,
	})
);

//urlencoded(buffer data)
app.use(
	express.urlencoded({
		extended: true,
	})
);

//set a static folder.
app.use(express.static(path.join(__dirname, 'public')));

//set admin auth.
// const adminAuth=require('./middlewares/admin/adminAuth');
// app.use(adminAuth.authJwt);

//set user auth.
const userAuth = require('./middlewares/user/userAuth');
app.use(userAuth.authJwt);
// const userAuth=require('./utils/token');
// app.use(userAuth.verifyJwtToken);

//set admin router connection.
// const adminRoute=require('./routes/admin/adminRoute')
// app.use('/admin',adminRoute);

// const adminProductRoute=require('./routes/admin/productRoute')
// app.use('/admin',adminProductRoute);

// const adminCartRoute=require('./routes/admin/cartRoute');
// app.use('/admin',adminCartRoute);

// const adminOrderRoute=require('./routes/admin/orderRoute');
// app.use('/admin',adminOrderRoute);

//set user router connection.
const userRoute = require('./routes/user/userRoute');
app.use('/', userRoute);

const userProductRoute = require('./routes/user/userProductRoute');
app.use('/', userProductRoute);

const userOrderRoute = require('./routes/user/userOrderRoute');
app.use('/', userOrderRoute);

const userMiscRoute = require('./routes/user/userMiscRoute');
app.use('/', userMiscRoute);

//connect mongoDB.
const dbDriver = process.env.MONGO_URI;

//connect ports.
const port = process.env.PORT || 50020;
mongoose
	.connect(dbDriver, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		app.listen(port, () => {
			console.log(`Connection Successful`);
			console.log(`Server running at http://localhost:${port}`);
		});
	});
