var express = require("express");
var app = express();
var flash = require("connect-flash");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var blogRoutes = require("./routes/blogs");
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");


//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(cookieParser("secret"));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    next();
});
//RESTFUL ROUTES
app.use(blogRoutes);

app.listen(3000, function () {
    console.log("Server is running");
});