var middleware = {};

 middleware.validateForm = function (req, res, next) {
    if (req.body.blog.title && req.body.blog.body) {
        return next();
    }
    req.flash("error", "Title and Blog Content can not be empty!");
    res.redirect("back");
};

 module.exports = middleware;