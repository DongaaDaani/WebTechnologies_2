const User = require('../models/user');

exports.get_user = function (email) {
    return User.findOne({ email: email }, function (err, user) {
        if (err) return err;
        return user
    })
};

exports.add_user = function (req, res, next) {
    exports.get_user(req.body.email)
        .exec(function (err, existingUser) {
            if (existingUser && existingUser.email === req.body.email) {
                res.json(false)
                return next();
            } else {
                let user = new User(
                    {
                        email: req.body.email,
                        password: req.body.password,
                    }
                );
                user.save(function (err, object) {
                    if (err) {
                        return next(err);
                    }
                    res.json({ object })
                })
            }
        })

};