const Product = require('../models/car');

exports.car_create = function (req, res, next) {
    Product.findOne({ brand: req.body.brand }, function (err, p) {
        if (err) return err;
        return p
    }).exec(function (err, existingProduct) {
        if (existingProduct && existingProduct.brand === req.body.brand) {
            return next(err)
        } else {
            let product = new Product(
                {
                    brand: req.body.brand,
                    type: req.body.type,
                    consumption: req.body.consumption,
                    date: req.body.date,
                    price: req.body.price,
                    quantity: req.body.quantity,
                }
            );
            product.save(function (err, object) {
                if (err) {
                    return next(err);
                }
                res.json({ id: object.id })
            })
        }
    })

};

exports.car_get_all = function (req, res, next) {
    Product.find({}, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};

exports.car_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.json(product);
    })
};


exports.car_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, product) {
        if (err) return next(err);
        res.json('Product udpated.');
    });
};

exports.car_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json('Deleted successfully!');
    })
};