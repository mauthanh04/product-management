const product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    const products = await product.find({
        deleted: false
    });
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
};