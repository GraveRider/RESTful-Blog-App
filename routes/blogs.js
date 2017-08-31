var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Blog = require("../models/blog");

router.get("/", function (req, res) {
    res.redirect("blogs");
});

router.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            res.send("<h1>Requested page couldn't be rendered</h1>")
        }
        else {
            res.render("index", {blogs: blogs});
        }
    });
});

router.get("/blogs/new", function (req, res) {
    res.render("new");
});

router.post("/blogs", middleware.validateForm, function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            req.flash("error", err.message);
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

router.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog: foundBlog});
        }
    });
});

router.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/blogs");
        }
        else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

router.put("/blogs/:id", middleware.validateForm, function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + updatedBlog._id);
        }
    });
});

router.delete("/blogs/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

module.exports = router;